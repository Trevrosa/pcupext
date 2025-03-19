// this is a toilet because its filled with poop

/**
 * Cross-browser way to set the extension's local storage.
 * 
 * @param record the thing to be stored
 */
export async function setLocalStorage(record: Record<string, unknown>) {
    try {
        // @ts-expect-error chrome firefox very sad
        if (storage) {
            // @ts-expect-error chrome firefox very sad
            await storage.local.set(record);
        } else if (chrome.storage) {
            await chrome.storage.local.set(record);
        }
    } catch {
        try {
            await chrome.storage.local.set(record);
        } catch {
            console.error("storage set FAILd");
        }
    }
}

/**
 * Cross-browser way to get `key` from the extension's local storage.
 * 
 * @param key the thing to be gound
 */
export async function getLocalStorage(key: string): Promise<unknown> {
    try {
        // @ts-expect-error chrome firefox very sad
        if (storage) {
            // @ts-expect-error chrome firefox very sad
            return await storage.local.get(key)[key];
        } else if (chrome.storage) {
            return (await chrome.storage.local.get(key))[key];
        }
    } catch {
        try {
            return (await chrome.storage.local.get(key))[key];
        } catch {
            console.error("storage get FAILd");
        }
    }
}
