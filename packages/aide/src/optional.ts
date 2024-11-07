import type { ConsumerFn, MapperFn, PredicateFn, Runnable, SupplierFn } from '@src/types';

/**
 * Wrapper around values that are either present or absent (null or undefined).
 */
export interface Optional<T> {
    /**
     * If a value is present and the value matches the given predicate, return an Optional describing the value,
     * otherwise return an empty Optional.
     */
    filter(predicate: PredicateFn<NonNullable<T>>): Optional<T>;

    /**
     * If a value is present, apply the provided Optional-bearing mapping function to it, return that result, otherwise
     * return an empty Optional. This method is similar to {@link map}, but the provided mapper is one whose result is
     * already an Optional, and if invoked, flatMap does not wrap it with an additional Optional.
     */
    flatMap<R>(mapper: MapperFn<NonNullable<T>, Optional<R>>): Optional<R>;

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
    ifPresent(consumer: ConsumerFn<NonNullable<T>>): this;

    /**
     * If a value is absent (null or undefined), returns true, otherwise false.
     */
    isAbsent(): boolean;

    /**
     * If a value is present, returns true, otherwise false.
     */
    isPresent(): boolean;

    /**
     * If a value is present, apply the provided mapping function to it, and if the result is present, return an
     * Optional describing the result, otherwise, return an empty Optional.
     */
    map<R>(mapper: MapperFn<NonNullable<T>, R>): Optional<R>;

    /**
     * If a value is present, returns an Optional describing the value, otherwise returns an Optional produced by the
     * supplying function.
     */
    or(other: SupplierFn<Optional<T>>): Optional<T>;

    /**
     * If a value is present, returns the value, otherwise returns other.
     */
    orElse(other: T): T;

    /**
     * If a value is present, returns the value, otherwise returns the result produced by the supplying function.
     */
    orElseGet(other: SupplierFn<T>): T;

    /**
     * If a value is present, returns the value, otherwise throws an exception to be created by the provided supplier.
     */
    orElseThrow<X>(other: SupplierFn<X>): T;

    /**
     * If a value is present, returns the value, otherwise return undefined.
     */
    orUndefined(): NonNullable<T> | undefined;
}

class AbsentOptional<T> implements Optional<T> {
    filter(predicate: PredicateFn<NonNullable<T>>): Optional<T> {
        return this;
    }

    flatMap<R>(mapper: MapperFn<NonNullable<T>, Optional<R>>): Optional<R> {
        return createOptional();
    }

    getOrThrow(): NonNullable<T> {
        throw new Error('Optional is empty');
    }

    ifAbsent(handler: Runnable): this {
        handler();
        return this;
    }

    ifPresent(consumer: ConsumerFn<NonNullable<T>>): this {
        return this;
    }

    isAbsent(): boolean {
        return true;
    }

    isPresent(): boolean {
        return false;
    }

    map<R>(mapper: MapperFn<NonNullable<T>, R>): Optional<R> {
        return createOptional();
    }

    or(other: SupplierFn<Optional<T>>): Optional<T> {
        return other();
    }

    orElse(other: T): T {
        return other;
    }

    orElseGet(other: SupplierFn<T>): T {
        return other();
    }

    orElseThrow<X>(other: SupplierFn<X>): T {
        throw other();
    }

    orUndefined(): undefined {
        return undefined;
    }
}

class PresentOptional<T> implements Optional<T> {
    public constructor(private readonly value: NonNullable<T>) {}

    filter(predicate: PredicateFn<NonNullable<T>>): Optional<T> {
        return predicate(this.value) ? this : createOptional();
    }

    flatMap<R>(mapper: MapperFn<NonNullable<T>, Optional<R>>): Optional<R> {
        return mapper(this.value);
    }

    getOrThrow(): NonNullable<T> {
        return this.value;
    }

    ifAbsent(handler: Runnable): this {
        return this;
    }

    ifPresent(consumer: ConsumerFn<NonNullable<T>>): this {
        consumer(this.value);
        return this;
    }

    isAbsent(): boolean {
        return false;
    }

    isPresent(): boolean {
        return true;
    }

    map<R>(mapper: MapperFn<NonNullable<T>, R>): Optional<R> {
        return createOptional(mapper(this.value));
    }

    or(other: SupplierFn<Optional<T>>): Optional<T> {
        return this;
    }

    orElse(other: T): T {
        return this.value;
    }

    orElseGet(other: SupplierFn<T>): T {
        return this.value;
    }

    orElseThrow<X>(other: SupplierFn<X>): T {
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
