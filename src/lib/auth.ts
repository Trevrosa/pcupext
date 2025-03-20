import type { Result } from "$lib";
import { API_URL } from "./api";

export interface UserSession {
    id: string;
    userId: number;
}

/**
 * send an authentication request
 *
 * @param username the username
 * @param password the password
 *
 * @returns the user session, either Ok, or Err.
 */
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

    return await response.json();
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
