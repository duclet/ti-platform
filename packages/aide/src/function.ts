/**
 * Represents an operation that accepts two input arguments and returns no result.
 */
export type BiConsumer<T, U> = (t: T, u: U) => void;

/**
 * Represents a function that accepts two arguments and produces a result.
 */
export type BiMapper<T, U, R> = (t: T, u: U) => R;

/**
 * Represents an operation upon two operands of the same type, producing a result of the same type as the operands.
 */
export type BinaryOperator<T> = (left: T, right: T) => T;

/**
 * Represents a predicate (boolean-valued function) of two arguments.
 */
export type BiPredicate<T, U> = (t: T, u: U) => boolean;

/**
 * Represents an operation that accepts a single input argument and returns no result.
 */
export type Consumer<T> = (t: T) => void;

/**
 * Represents a function that accepts one argument and produces a result.
 */
export type Mapper<T, R> = (t: T) => R;

/**
 * Represents a runnable task that takes no arguments and returns no result.
 */
export type Runnable = () => void;

/**
 * Represents a predicate (boolean-valued function) of one argument.
 */
export type Predicate<T> = (t: T) => boolean;

/**
 * Represents a supplier of results.
 */
export type Supplier<T> = () => T;

/**
 * Represents an operation upon three operands of the same type, producing a result of the same type as the operands.
 */
export type TernaryOperator<T> = (first: T, second: T, third: T) => T;

/**
 * Represents an operation that accepts three input arguments and returns no result.
 */
export type TriConsumer<T, U, V> = (t: T, u: U, v: V) => void;

/**
 * Represents a function that accepts three arguments and produces a result.
 */
export type TriMapper<T, U, V, R> = (t: T, u: U, v: V) => R;

/**
 * Represents a predicate (boolean-valued function) of three arguments.
 */
export type TriPredicate<T, U, V> = (t: T, u: U, v: V) => boolean;

/**
 * Represents an operation on a single operand that produces a result of the same type as its operand.
 */
export type UnaryOperator<T> = (t: T) => T;
