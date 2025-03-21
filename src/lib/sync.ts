import type { Result } from "$lib";
import { API_URL } from "./api";

export interface UserData {
    app_usage: AppInfo[];
    debug: UserDebug[];
}

export interface UserDebug {
    stored: string;
}

export interface AppInfo {
    name: string;
    usage: number;
    limit: number;
}

export interface SyncSummary {
    data: UserData;
    failed: number;
}

export async function syncUserData(
    sessionId: string,
    data: UserData | null
): Promise<Result<SyncSummary>> {
    const request = new Request(`${API_URL}/sync/${sessionId}`, {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(data),
    });

    const response = await fetch(request);

    return await response.json();
}
