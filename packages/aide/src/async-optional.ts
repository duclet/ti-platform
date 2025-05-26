import type {
    AwaitableConsumer,
    AwaitableMapper,
    AwaitablePredicate,
    AwaitableRunnable,
    AwaitableSupplier,
} from '@src/function';
import type { Optional } from '@src/optional';
import { AbsentOptional, PresentOptional } from '@src/optional';
import type { Awaitable } from '@src/types';

/**
 * Async version of Optional where handlers can be async functions.
 */
export interface AsyncOptional<T> {
    /**
     * If a value is present and the value matches the given predicate, return an AsyncOptional describing the value,
     * otherwise return an empty AsyncOptional.
     */
    filter(predicate: AwaitablePredicate<NonNullable<T>>): AsyncOptional<T>;

    /**
     * If a value is present, apply the provided AsyncOptional-bearing mapping function to it, return that result, otherwise
     * return an empty AsyncOptional.
     */
    flatMap<R>(mapper: AwaitableMapper<NonNullable<T>, AsyncOptional<R>>): AsyncOptional<R>;

    /**
     * If the value is present, returns the value, otherwise throws an Error.
     */
    getOrThrow(): Promise<NonNullable<T>>;

    /**
     * If the value is absent, invoke the specified handler, otherwise do nothing.
     */
    ifAbsent(handler: AwaitableRunnable): AsyncOptional<T>;

    /**
     * If a value is present, invoke the specified consumer with the value, otherwise do nothing.
     */
    ifPresent(consumer: AwaitableConsumer<NonNullable<T>>): AsyncOptional<T>;

    /**
     * If a value is absent (null or undefined), returns true, otherwise false.
     */
    isAbsent(): Promise<boolean>;

    /**
     * If a value is present, returns true, otherwise false.
     */
    isPresent(): Promise<boolean>;

    /**
     * If a value is present, apply the provided mapping function to it, and if the result is present, return an
     * AsyncOptional describing the result, otherwise, return an empty AsyncOptional.
     */
    map<R>(mapper: AwaitableMapper<NonNullable<T>, R>): AsyncOptional<R>;

    /**
     * If a value is present, returns an AsyncOptional describing the value, otherwise returns an AsyncOptional produced by the
     * supplying function.
     */
    or(other: () => Awaitable<AsyncOptional<T>>): AsyncOptional<T>;

    /**
     * If a value is present, returns the value, otherwise returns other.
     */
    orElse(other: T): Promise<T>;

    /**
     * If a value is present, returns the value, otherwise returns the result produced by the supplying function.
     */
    orElseGet(other: AwaitableSupplier<T>): Promise<T>;

    /**
     * If a value is present, returns the value, otherwise throws an exception to be created by the provided supplier.
     */
    orElseThrow<X>(other: AwaitableSupplier<X>): Promise<T>;

    /**
     * If a value is present, returns the value, otherwise return undefined.
     */
    orUndefined(): Promise<NonNullable<T> | undefined>;
}

class AsyncAbsentOptional<T> implements AsyncOptional<T> {
    filter(predicate: AwaitablePredicate<NonNullable<T>>): AsyncOptional<T> {
        return createAsyncOptional();
    }

    flatMap<R>(mapper: AwaitableMapper<NonNullable<T>, AsyncOptional<R>>): AsyncOptional<R> {
        return createAsyncOptional();
    }

    async getOrThrow(): Promise<NonNullable<T>> {
        throw await Promise.reject(new Error('AsyncOptional is empty'));
    }

    ifAbsent(handler: AwaitableRunnable): AsyncOptional<T> {
        return new AsyncPromiseOptional(
            Promise.resolve()
                .then(() => handler())
                .then(() => createAsyncOptional())
        );
    }

    ifPresent(consumer: AwaitableConsumer<NonNullable<T>>): AsyncOptional<T> {
        return createAsyncOptional();
    }

    isAbsent(): Promise<boolean> {
        return Promise.resolve(true);
    }

    isPresent(): Promise<boolean> {
        return Promise.resolve(false);
    }

    map<R>(mapper: AwaitableMapper<NonNullable<T>, R>): AsyncOptional<R> {
        return createAsyncOptional();
    }

    or(other: () => Awaitable<AsyncOptional<T>>): AsyncOptional<T> {
        return new AsyncPromiseOptional(Promise.resolve().then(() => other()));
    }

    orElse(other: T): Promise<T> {
        return Promise.resolve(other);
    }

    async orElseGet(other: AwaitableSupplier<T>): Promise<T> {
        return await Promise.resolve(other());
    }

    async orElseThrow<X>(other: AwaitableSupplier<X>): Promise<T> {
        throw await Promise.resolve(other());
    }

    orUndefined(): Promise<undefined> {
        return Promise.resolve(undefined);
    }
}

class AsyncPresentOptional<T> implements AsyncOptional<T> {
    private readonly valuePromise: Promise<NonNullable<T>>;

    public constructor(value: NonNullable<T> | Promise<NonNullable<T>>) {
        this.valuePromise = Promise.resolve(value);
    }

    filter(predicate: AwaitablePredicate<NonNullable<T>>): AsyncOptional<T> {
        return new AsyncPromiseOptional(
            this.valuePromise.then(async (value) => {
                return (await Promise.resolve(predicate(value))) ? createAsyncOptional(value) : createAsyncOptional();
            })
        );
    }

    flatMap<R>(mapper: AwaitableMapper<NonNullable<T>, AsyncOptional<R>>): AsyncOptional<R> {
        return new AsyncPromiseOptional(
            this.valuePromise.then(async (value) => {
                return await Promise.resolve(mapper(value));
            })
        );
    }

    async getOrThrow(): Promise<NonNullable<T>> {
        return this.valuePromise;
    }

    ifAbsent(handler: AwaitableRunnable): AsyncOptional<T> {
        return this;
    }

    ifPresent(consumer: AwaitableConsumer<NonNullable<T>>): AsyncOptional<T> {
        return new AsyncPromiseOptional(this.valuePromise.then((value) => consumer(value)).then(() => this));
    }

    isAbsent(): Promise<boolean> {
        return Promise.resolve(false);
    }

    isPresent(): Promise<boolean> {
        return Promise.resolve(true);
    }

    map<R>(mapper: AwaitableMapper<NonNullable<T>, R>): AsyncOptional<R> {
        return new AsyncPromiseOptional(
            this.valuePromise.then(async (value) => {
                const result = await Promise.resolve(mapper(value));
                return createAsyncOptional(result);
            })
        );
    }

    or(other: () => Awaitable<AsyncOptional<T>>): AsyncOptional<T> {
        return this;
    }

    async orElse(other: T): Promise<T> {
        return this.valuePromise;
    }

    async orElseGet(other: AwaitableSupplier<T>): Promise<T> {
        return this.valuePromise;
    }

    async orElseThrow<X>(other: AwaitableSupplier<X>): Promise<T> {
        return this.valuePromise;
    }

    async orUndefined(): Promise<NonNullable<T>> {
        return this.valuePromise;
    }
}

class AsyncPromiseOptional<T> implements AsyncOptional<T> {
    constructor(private readonly optionalPromise: Promise<AsyncOptional<T>>) {}

    filter(predicate: AwaitablePredicate<NonNullable<T>>): AsyncOptional<T> {
        return new AsyncPromiseOptional(this.optionalPromise.then((opt) => opt.filter(predicate)));
    }

    flatMap<R>(mapper: AwaitableMapper<NonNullable<T>, AsyncOptional<R>>): AsyncOptional<R> {
        return new AsyncPromiseOptional(this.optionalPromise.then((opt) => opt.flatMap(mapper)));
    }

    async getOrThrow(): Promise<NonNullable<T>> {
        const opt = await this.optionalPromise;
        return opt.getOrThrow();
    }

    ifAbsent(handler: AwaitableRunnable): AsyncOptional<T> {
        return new AsyncPromiseOptional(this.optionalPromise.then((opt) => opt.ifAbsent(handler)));
    }

    ifPresent(consumer: AwaitableConsumer<NonNullable<T>>): AsyncOptional<T> {
        return new AsyncPromiseOptional(this.optionalPromise.then((opt) => opt.ifPresent(consumer)));
    }

    async isAbsent(): Promise<boolean> {
        const opt = await this.optionalPromise;
        return opt.isAbsent();
    }

    async isPresent(): Promise<boolean> {
        const opt = await this.optionalPromise;
        return opt.isPresent();
    }

    map<R>(mapper: AwaitableMapper<NonNullable<T>, R>): AsyncOptional<R> {
        return new AsyncPromiseOptional(this.optionalPromise.then((opt) => opt.map(mapper)));
    }

    or(other: () => Awaitable<AsyncOptional<T>>): AsyncOptional<T> {
        return new AsyncPromiseOptional(this.optionalPromise.then((opt) => opt.or(other)));
    }

    async orElse(other: T): Promise<T> {
        const opt = await this.optionalPromise;
        return opt.orElse(other);
    }

    async orElseGet(other: AwaitableSupplier<T>): Promise<T> {
        const opt = await this.optionalPromise;
        return opt.orElseGet(other);
    }

    async orElseThrow<X>(other: AwaitableSupplier<X>): Promise<T> {
        const opt = await this.optionalPromise;
        return opt.orElseThrow(other);
    }

    async orUndefined(): Promise<NonNullable<T> | undefined> {
        const opt = await this.optionalPromise;
        return opt.orUndefined();
    }
}

const ASYNC_ABSENT_OPTIONAL = new AsyncAbsentOptional();

/**
 * Create an async optional from the provided value.
 */
export function createAsyncOptional<T>(value?: Awaitable<T | Optional<T> | null | undefined>): AsyncOptional<T> {
    if (value === undefined || value === null) {
        return ASYNC_ABSENT_OPTIONAL as AsyncAbsentOptional<T>;
    }

    if (value instanceof AbsentOptional) {
        return ASYNC_ABSENT_OPTIONAL as AsyncAbsentOptional<T>;
    }

    if (value instanceof PresentOptional) {
        return new AsyncPresentOptional(value.getOrThrow());
    }

    if (value instanceof Promise) {
        return new AsyncPromiseOptional(
            value.then((resolvedValue) => {
                if (resolvedValue === null || resolvedValue === undefined) {
                    return ASYNC_ABSENT_OPTIONAL as AsyncAbsentOptional<T>;
                }

                if (resolvedValue instanceof AbsentOptional) {
                    return ASYNC_ABSENT_OPTIONAL as AsyncAbsentOptional<T>;
                }

                if (resolvedValue instanceof PresentOptional) {
                    return new AsyncPresentOptional(resolvedValue.getOrThrow());
                }

                return new AsyncPresentOptional(resolvedValue as NonNullable<T>);
            })
        );
    }

    return new AsyncPresentOptional(value as NonNullable<T>);
}

/**
 * Check if the provided value is an AsyncOptional.
 */
export function isAsyncOptional<T>(value: unknown): value is AsyncOptional<T> {
    return (
        value instanceof AsyncAbsentOptional ||
        value instanceof AsyncPresentOptional ||
        value instanceof AsyncPromiseOptional
    );
}
