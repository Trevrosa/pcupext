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
 * @param key the thing to be found
 */
export async function getLocalStorage<T>(key: string): Promise<T | null> {
    if (typeof window === "undefined") {
        // we are in node, dont run.
        return null;
    }

    try {
        // @ts-expect-error chrome firefox very sad
        if (storage) {
            // @ts-expect-error chrome firefox very sad
            return (await storage.local.get(key)[key]) as T;
        } else if (chrome.storage) {
            return (await chrome.storage.local.get(key))[key] as T;
        }
    } catch {
        try {
            return (await chrome.storage.local.get(key))[key] as T;
        } catch {
            console.error("storage get FAILd");
        }
    }
    return null;
}

/**
 * Cross-browser way to remove `key` from the extension's local storage.
 *
 * @param key the thing to remove
 */
export async function removeLocalStorage(key: string) {
    try {
        // @ts-expect-error chrome firefox very sad
        if (storage) {
            // @ts-expect-error chrome firefox very sad
            return await storage.local.remove(key);
        } else if (chrome.storage) {
            return await chrome.storage.local.remove(key);
        }
    } catch {
        try {
            return await chrome.storage.local.remove(key);
        } catch {
            console.error("storage get FAILd");
        }
    }
    return null;
}
