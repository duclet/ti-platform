import type { Consumer, Mapper, Predicate } from '@src/function';
import type { Optional } from '@src/optional';
import { createOptional } from '@src/optional';
import type { Simplify, SimplifyOmit } from '@src/types';

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
 * Type for a data used by various handlers of {@link MapPlus} which contains a value that can be null.
 */
type MapPlusData<K extends MapPlusKey, V> = { key: K; value: V | undefined; map: MapPlus<K, V> };

/**
 * Type for a data used by various handlers of {@link MapPlus} which contains a non-nullable value.
 */
type MapPlusPresentData<K extends MapPlusKey, V> = { key: K; value: NonNullable<V>; map: MapPlus<K, V> };

/**
 * Ensure the given is a {@link MapPlus}.
 */
export function toMapPlus<K extends MapPlusKey, V>(from: Map<K, V> | Record<K, V> | Array<[K, V]>): MapPlus<K, V> {
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
    public compute(key: K, remapper: Mapper<Simplify<MapPlusData<K, V>>, Optional<V>>): Optional<V> {
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
    public computeIfAbsent(
        key: K,
        mapper: Mapper<SimplifyOmit<MapPlusPresentData<K, V>, 'value'>, Optional<V>>
    ): Optional<V> {
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
    public computeIfPresent(key: K, remapper: Mapper<Simplify<MapPlusPresentData<K, V>>, Optional<V>>): Optional<V> {
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
    public each(consumer: Consumer<Simplify<MapPlusPresentData<K, V>>>): this {
        this.forEach((value, key) => consumer({ key, value: value as NonNullable<V>, map: this }));
        return this;
    }

    /**
     * Get the entries as an array.
     */
    public entriesAsArray(): Array<[K, V]> {
        return Array.from(this.entries());
    }

    /**
     * Returns true if every entry in this map satisfies the given predicate.
     */
    public every(predicate: Predicate<Simplify<MapPlusPresentData<K, V>>>): boolean {
        return this.entriesAsArray().every(([key, value]) =>
            predicate({ key, value: value as NonNullable<V>, map: this })
        );
    }

    /**
     * Create a new map by only keeping the entries that satisfies the provided predicate.
     */
    public filter(predicate: Predicate<Simplify<MapPlusPresentData<K, V>>>): MapPlus<K, V> {
        return new MapPlus<K, V>(
            this.entriesAsArray().filter(([key, value]) =>
                predicate({ key, value: value as NonNullable<V>, map: this })
            )
        );
    }

    /**
     * Get an optional for the first value that matches the given predicate.
     */
    public find(predicate: Predicate<Simplify<MapPlusPresentData<K, V>>>): Optional<V> {
        return createOptional(
            this.entriesAsArray().find(([key, value]) => predicate({ key, value: value as NonNullable<V>, map: this }))
        ).map(([key, value]) => value);
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
    public getOrThrow(key: K): NonNullable<V> {
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
    public mapKeys<R extends MapPlusKey>(mapper: Mapper<Simplify<MapPlusPresentData<K, V>>, R>): MapPlus<R, V> {
        return new MapPlus<R, V>(
            this.entriesAsArray().map(([key, value]) => [
                mapper({ key, value: value as NonNullable<V>, map: this }),
                value,
            ])
        );
    }

    /**
     * Create a new version of this map with the values mapped to a different value with the provided mapper.
     */
    public mapValues<R>(mapper: Mapper<Simplify<MapPlusPresentData<K, V>>, R>): MapPlus<K, R> {
        return new MapPlus<K, R>(
            this.entriesAsArray().map(([key, value]) => [
                key,
                mapper({ key, value: value as NonNullable<V>, map: this }),
            ])
        );
    }

    /**
     * Set all key/value pair in the given map to this map.
     */
    public setAll(map: Map<K, V> | Record<K, V> | Array<[K, V]>): this {
        const asEntries = Array.isArray(map)
            ? map
            : map instanceof Map
              ? Array.from(map.entries())
              : (Object.entries(map) as Array<[K, V]>);

        asEntries.forEach(([key, value]) => this.set(key, value));

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
    public some(predicate: Predicate<Simplify<MapPlusPresentData<K, V>>>): boolean {
        return this.entriesAsArray().some(([key, value]) =>
            predicate({ key, value: value as NonNullable<V>, map: this })
        );
    }

    /**
     * Convert this to an object of key/value pair with possibility of mapping the key and value.
     */
    public toObject<K2 extends MapPlusKey, V2>({
        keyMapper,
        valueMapper,
    }: {
        keyMapper?: Mapper<Simplify<MapPlusPresentData<K, V>>, K2>;
        valueMapper?: Mapper<Simplify<MapPlusPresentData<K, V>>, V2>;
    } = {}): Record<K2, V2> {
        const realKeyMapper = keyMapper ?? (({ key }: { key: K }) => key as unknown as K2);
        const realValueMapper = valueMapper ?? (({ value }: { value: V }) => value as unknown as V2);

        return Object.fromEntries(
            this.entriesAsArray().map(([key, value]) => [
                realKeyMapper({ key, value: value as NonNullable<V>, map: this }),
                realValueMapper({ key, value: value as NonNullable<V>, map: this }),
            ])
        ) as Record<K2, V2>;
    }

    /**
     * Retrieves all values as an array.
     */
    public valuesArray(): Array<V> {
        return Array.from(this.values());
    }
}
