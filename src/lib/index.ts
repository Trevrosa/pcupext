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
