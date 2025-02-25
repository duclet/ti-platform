import type { Awaitable } from '@src/types';

/**
 * Returns a promise which will resolve after the provided time.
 */
export function waitFor(timeMs: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, timeMs));
}

/**
 * Extracting out a `Promise`'s `resolve` and `reject` method to allow one to more easily pass around those methods.
 *
 * @typeParam T The type to resolve with.
 */
export class Deferred<T = void> {
    /**
     * Resolves the internal promise.
     */
    // @ts-expect-error Will definitely be set in the constructor.
    public resolve: (value: Awaitable<T>) => void;

    /**
     * Reject the internal promise.
     */
    // @ts-expect-error Will definitely be set in constructor.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public reject: (reason?: any) => void;

    /**
     * The underlying promise.
     */
    public readonly promise: Promise<T>;

    /**
     * Create a new instance.
     */
    public constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
