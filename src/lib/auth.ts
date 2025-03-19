import type { Result } from "$lib";

const API_URL = "https://pcup.trevrosa.dev";

export interface UserSession {
    id: string;
    userId: number;
}

export async function authenticate(
    username: string,
    password: string
): Promise<Result<UserSession>> {
    const requestPayload = { username: username, password: password };
    const request = new Request(`${API_URL}/auth`, {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(requestPayload),
    });

    const response = await fetch(request);

    const responseJson = await response.json();
    return responseJson;
}

export async function validateSession(sessionId: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/auth/validate_session/${sessionId}`);

    const responseText = await response.text();
    if (responseText == "true") {
        return true;
    } else {
        return false;
    }
}
