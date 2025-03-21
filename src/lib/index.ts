import type { UserSession } from "./auth";
import { getLocalStorage } from "./toilet";

/**
 * This is a representation of serde-json's serialized Result.
 *
 * If `.Ok` is `null`, then `.Err` is not `null`, and vice versa.
 *
 * `.Err` should be the error in the form of an object.
 */
export interface Result<T> {
    Ok?: T;
    Err?: unknown;
}

export async function getSession(): Promise<UserSession | null> {
    return getLocalStorage("session");
}
