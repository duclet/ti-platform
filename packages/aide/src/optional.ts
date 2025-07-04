import type { Consumer, Mapper, Predicate, Runnable, Supplier } from '@src/function';

/**
 * Wrapper around values that are either present or absent (null or undefined).
 */
export interface Optional<T> {
    /**
     * If a value is present and the value matches the given predicate, return an Optional describing the value,
     * otherwise return an empty Optional.
     */
    filter(predicate: Predicate<NonNullable<T>>): Optional<T>;

    /**
     * If a value is present, apply the provided Optional-bearing mapping function to it, return that result, otherwise
     * return an empty Optional. This method is similar to {@link map}, but the provided mapper is one whose result is
     * already an Optional, and if invoked, flatMap does not wrap it with an additional Optional.
     */
    flatMap<R>(mapper: Mapper<NonNullable<T>, Optional<R>>): Optional<R>;

    /**
     * If the value is present, returns the value, otherwise throws an Error.
     */
    getOrThrow(): NonNullable<T>;

    /**
     * If the value is absent, invoke the specified handler, otherwise do nothing.
     */
    ifAbsent(handler: Runnable): this;

    /**
     * If a value is present, invoke the specified consumer with the value, otherwise do nothing.
     */
    ifPresent(consumer: Consumer<NonNullable<T>>): this;

    /**
     * If a value is absent (null or undefined), returns true, otherwise false.
     */
    isAbsent(): this is AbsentOptional<T>;

    /**
     * If a value is present, returns true, otherwise false.
     */
    isPresent(): this is PresentOptional<T>;

    /**
     * If a value is present, apply the provided mapping function to it, and if the result is present, return an
     * Optional describing the result, otherwise, return an empty Optional.
     */
    map<R>(mapper: Mapper<NonNullable<T>, R>): Optional<R>;

    /**
     * If a value is present, returns an Optional describing the value, otherwise returns an Optional produced by the
     * supplying function.
     */
    or(other: Supplier<Optional<T>>): Optional<T>;

    /**
     * If a value is present, returns the value, otherwise returns other.
     */
    orElse(other: T): T;

    /**
     * If a value is present, returns the value, otherwise returns the result produced by the supplying function.
     */
    orElseGet(other: Supplier<T>): T;

    /**
     * If a value is present, returns the value, otherwise throws an exception to be created by the provided supplier.
     */
    orElseThrow<X>(other: Supplier<X>): T;

    /**
     * If a value is present, returns the value, otherwise return undefined.
     */
    orUndefined(): NonNullable<T> | undefined;
}

export class AbsentOptional<T> implements Optional<T> {
    filter(predicate: Predicate<NonNullable<T>>): Optional<T> {
        return createOptional();
    }

    flatMap<R>(mapper: Mapper<NonNullable<T>, Optional<R>>): Optional<R> {
        return createOptional();
    }

    getOrThrow(): NonNullable<T> {
        throw new Error('Optional is empty');
    }

    ifAbsent(handler: Runnable): this {
        handler();
        return this;
    }

    ifPresent(consumer: Consumer<NonNullable<T>>): this {
        return this;
    }

    isAbsent(): this is AbsentOptional<T> {
        return true;
    }

    isPresent(): this is PresentOptional<T> {
        return false;
    }

    map<R>(mapper: Mapper<NonNullable<T>, R>): Optional<R> {
        return createOptional();
    }

    or(other: Supplier<Optional<T>>): Optional<T> {
        return other();
    }

    orElse(other: T): T {
        return other;
    }

    orElseGet(other: Supplier<T>): T {
        return other();
    }

    orElseThrow<X>(other: Supplier<X>): T {
        throw other();
    }

    orUndefined(): undefined {
        return undefined;
    }
}

export class PresentOptional<T> implements Optional<T> {
    public constructor(private readonly value: NonNullable<T>) {}

    filter(predicate: Predicate<NonNullable<T>>): Optional<T> {
        return predicate(this.value) ? this : createOptional();
    }

    flatMap<R>(mapper: Mapper<NonNullable<T>, Optional<R>>): Optional<R> {
        return mapper(this.value);
    }

    getOrThrow(): NonNullable<T> {
        return this.value;
    }

    ifAbsent(handler: Runnable): this {
        return this;
    }

    ifPresent(consumer: Consumer<NonNullable<T>>): this {
        consumer(this.value);
        return this;
    }

    isAbsent(): this is AbsentOptional<T> {
        return false;
    }

    isPresent(): this is PresentOptional<T> {
        return true;
    }

    map<R>(mapper: Mapper<NonNullable<T>, R>): Optional<R> {
        return createOptional(mapper(this.value));
    }

    or(other: Supplier<Optional<T>>): Optional<T> {
        return this;
    }

    orElse(other: T): T {
        return this.value;
    }

    orElseGet(other: Supplier<T>): T {
        return this.value;
    }

    orElseThrow<X>(other: Supplier<X>): T {
        return this.value;
    }

    orUndefined(): NonNullable<T> {
        return this.value;
    }
}

const ABSENT_OPTIONAL = new AbsentOptional();

/**
 * Create an optional from the provided value.
 */
export function createOptional<T>(value: T | null | undefined = undefined): Optional<T> {
    if (value === null || value === undefined) {
        return ABSENT_OPTIONAL as AbsentOptional<T>;
    } else {
        return new PresentOptional(value);
    }
}
