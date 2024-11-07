import { createOptional, Optional } from '@src/optional';
import type { ConsumerFn, MapperFn, PredicateFn } from '@src/types';

/**
 * @typeParam K The type of the key in the map.
 * @typeParam V The type of the value in the map.
 * @param map The map to get the data from.
 * @param key The key to get the data for.
 * @param defaultValue The default value to return if the key does not exist.
 * @returns The value in the map with the given key or if the key does not exist, the provided default value.
 */
export function getOrDefault<K, V>(map: Map<K, V>, key: K, defaultValue: V): V {
    return map.get(key) ?? defaultValue;
}

/**
 * The possible type for a key.
 */
export type MapPlusKey = string | number | symbol;

/**
 * Predicate used by {@link MapPlus}.
 */
export type MapPlusPredicate<K extends MapPlusKey, V> = PredicateFn<{ key: K; value: V; map: MapPlus<K, V> }>;

/**
 * Ensure the given is a {@link MapPlus}.
 */
export function toMapPlus<K extends MapPlusKey, V>(from: Map<K, V> | Array<[K, V]>): MapPlus<K, V> {
    if (from instanceof MapPlus) {
        return from as MapPlus<K, V>;
    }

    const map = new MapPlus<K, V>();
    map.setAll(from);

    return map;
}

/**
 * Extension to a Map with some new methods.
 */
export class MapPlus<K extends MapPlusKey, V> extends Map<K, V> {
    /**
     * Retrieve the value for the provided key as an {@link Optional}.
     */
    public asOptional(key: K): Optional<V> {
        return createOptional(this.get(key));
    }

    /**
     * Same as Map#clear but returns this instance after clearing.
     */
    public clearAndReturn(): this {
        this.clear();
        return this;
    }

    /**
     * Attempts to compute a mapping for the specified key and its current mapped value, or undefined if there is no
     * current mapping. If the remapping function returns undefined or null, the mapping is removed (or remains absent
     * if initially absent).
     *
     * @returns An optional containing the value associated with the provided key.
     */
    public compute(
        key: K,
        remapper: MapperFn<{ key: K; value: V | undefined; map: MapPlus<K, V> }, Optional<V>>
    ): Optional<V> {
        remapper({ key, value: this.get(key), map: this })
            .ifPresent((v) => this.set(key, v))
            .ifAbsent(() => this.delete(key));

        return this.asOptional(key);
    }

    /**
     * If the value for the specified key is absent, attempts to compute its value using the given mapping function and
     * enters it into this map unless undefined or null.
     *
     * @returns An optional containing the value associated with the provided key.
     */
    public computeIfAbsent(key: K, mapper: MapperFn<{ key: K; map: MapPlus<K, V> }, Optional<V>>): Optional<V> {
        if (!this.has(key)) {
            mapper({ key, map: this }).ifPresent((v) => this.set(key, v));
        }

        return this.asOptional(key);
    }

    /**
     * If the value for the specified key is present, attempts to compute a new mapping given the key and its current
     * mapped value. If the remapping function returns undefined or null, the mapping is removed.
     *
     * @returns An optional containing the value associated with the provided key.
     */
    public computeIfPresent(
        key: K,
        remapper: MapperFn<{ key: K; value: V; map: MapPlus<K, V> }, Optional<V>>
    ): Optional<V> {
        if (this.has(key)) {
            remapper({ key, value: this.getOrThrow(key), map: this }).ifPresent((v) => this.set(key, v));
        }

        return this.asOptional(key);
    }

    /**
     * Returns true if this map maps one or more keys to the specified value.
     */
    public contains(item: V): boolean {
        return this.some(({ value }) => value === item);
    }

    /**
     * Similar to Map#forEach except return this at the end and the consumer retrieves the data differently.
     */
    public each(consumer: ConsumerFn<{ key: K; value: V; map: MapPlus<K, V> }>): this {
        this.forEach((value, key) => consumer({ key, value, map: this }));
        return this;
    }

    /**
     * Returns true if every entry in this map satisfies the given predicate.
     */
    public every(predicate: MapPlusPredicate<K, V>): boolean {
        return Array.from(this.entries()).every(([key, value]) => predicate({ key, value, map: this }));
    }

    /**
     * Create a new map by only keeping the entries that satisfies the provided predicate.
     */
    public filter(predicate: MapPlusPredicate<K, V>): MapPlus<K, V> {
        return new MapPlus<K, V>(
            Array.from(this.entries()).filter(([key, value]) => predicate({ key, value, map: this }))
        );
    }

    /**
     * If this map has the provided key, return the value associated with that key, otherwise return the provided
     * default value.
     */
    public getOrDefault(key: K, defaultValue: V): V {
        return this.has(key) ? this.getOrThrow(key) : defaultValue;
    }

    /**
     * Similar to Map#get but will throw an Error if the key does not exist.
     */
    public getOrThrow(key: K): V {
        if (!this.has(key)) {
            throw new Error('Key does not exists');
        }

        return this.get(key)!;
    }

    /**
     * Returns true if this map contains no key-value mappings.
     */
    public isEmpty(): boolean {
        return this.size < 1;
    }

    /**
     * Retrieve the keys as an array.
     */
    public keysArray(): Array<K> {
        return Array.from(this.keys());
    }

    /**
     * Create a new version of this map with the keys mapped to a different value with the provided mapper. Please note
     * that no consideration will be made in validate the keys are not duplicated meaning if the mapper function
     * generates the same key multiple times, the later will override the previous value.
     */
    public mapKeys<R extends MapPlusKey>(mapper: MapperFn<{ key: K; value: V; map: MapPlus<K, V> }, R>): MapPlus<R, V> {
        return new MapPlus<R, V>(
            Array.from(this.entries()).map(([key, value]) => [mapper({ key, value, map: this }), value])
        );
    }

    /**
     * Create a new version of this map with the values mapped to a different value with the provided mapper.
     */
    public mapValues<R>(mapper: MapperFn<{ key: K; value: V; map: MapPlus<K, V> }, R>): MapPlus<K, R> {
        return new MapPlus<K, R>(
            Array.from(this.entries()).map(([key, value]) => [key, mapper({ key, value, map: this })])
        );
    }

    /**
     * Set all key/value pair in the given map to this map.
     */
    public setAll(map: Map<K, V> | Array<[K, V]>): this {
        if (map instanceof Map) {
            map.forEach((value, key) => this.set(key, value));
        } else if (Array.isArray(map)) {
            map.forEach(([key, value]) => this.set(key, value));
        }

        return this;
    }

    /**
     * Set the provided value to the provided key if it doesn't exists, returning the new current value.
     */
    public setIfAbsent(key: K, value: V): V {
        if (this.has(key)) {
            return this.getOrThrow(key);
        }

        this.set(key, value);
        return value;
    }

    /**
     * Returns true if at least one entry in this map satisfies the provided predicate.
     */
    public some(predicate: MapPlusPredicate<K, V>): boolean {
        return Array.from(this.entries()).some(([key, value]) => predicate({ key, value, map: this }));
    }

    /**
     * Convert this to an object of key/value pair.
     */
    public toObject(): Record<K, V> {
        return Object.fromEntries(this.entries()) as Record<K, V>;
    }

    /**
     * Retrieves all values as an array.
     */
    public valuesArray(): Array<V> {
        return Array.from(this.values());
    }
}
