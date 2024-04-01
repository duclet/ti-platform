import type { Awaitable } from '@src/types';

/**
 * Extracting out a `Promise`'s `resolve` and `reject` method to allow one to more easily pass around those methods.
 *
 * @typeParam T The type to resolve with.
 */
export class Deferred<T = void> {
    /**
     * Resolves the internal promise.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    public resolve: (value: Awaitable<T>) => void;

    /**
     * Reject the internal promise.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
