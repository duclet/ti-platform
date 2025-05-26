import { getOrDefault, MapPlus, toMapPlus } from '@src/map';
import { createOptional } from '@src/optional';
import { expect } from '@ti-platform/aide-test';
import { describe, test, vi } from 'vitest';

const it = test.extend<{
    objectMapItem1: { value: number };
    objectMap: MapPlus<string, { value: number }>;
    stringMap: MapPlus<string, string>;
}>({
    objectMapItem1: async ({ task }, use) => {
        await use({ value: 1 });
    },

    objectMap: async ({ task, objectMapItem1 }, use) => {
        const map = new MapPlus<string, { value: number }>([
            ['one', objectMapItem1],
            ['two', { value: 2 }],
        ]);

        await use(map);
    },

    stringMap: async ({ task }, use) => {
        const map = new MapPlus([
            ['one', 'ONE'],
            ['two', 'TWO'],
        ]);

        await use(map);
    },
});

describe('getOrDefault', () => {
    it('should return the value if it exists', ({ stringMap }) => {
        expect(getOrDefault(stringMap, 'one', 'FALLBACK')).toBe('ONE');
    });

    it('should return the fallback value when no value exists', ({ stringMap }) => {
        expect(getOrDefault(stringMap, 'non-existent-key', 'FALLBACK')).toBe('FALLBACK');
    });
});

describe('toMapPlus', () => {
    it('should just return the given value if it is already a MapPlus', ({ stringMap }) => {
        expect(toMapPlus(stringMap)).toBe(stringMap);
    });

    it('should create a new instance otherwise', () => {
        expect(toMapPlus({ three: 'THREE', four: 'FOUR' }))
            .toBeInstanceOf(MapPlus)
            .map((v) => v.toObject())
            .toEqual({ three: 'THREE', four: 'FOUR' });
    });
});

describe('MapPlus', () => {
    describe('asOptional', () => {
        it('should return an absent optional when the key does not exists', ({ stringMap }) => {
            expect(stringMap.asOptional('non-existing-key')).toSatisfy((v) => v.isAbsent());
        });

        it('should return an Optional containing the value of the key if it exists', ({ stringMap }) => {
            expect(stringMap.asOptional('one'))
                .toSatisfy((v) => v.isPresent())
                .toSatisfy((v) => v.getOrThrow() === 'ONE');
        });
    });

    describe('clearAndReturn', () => {
        it('should should clear the map and return itself', ({ stringMap }) => {
            expect(stringMap.clearAndReturn()).toBe(stringMap).toHaveSize(0);
        });
    });

    describe('compute', () => {
        it('should provide the key and undefined for a non-existent key', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['compute']>[1]>().mockReturnValue(createOptional());

            stringMap.compute('non-existent-key', handler);

            expect(handler)
                .toHaveBeenCalledOnce()
                .toHaveBeenCalledWith({ key: 'non-existent-key', value: undefined, map: stringMap });
        });

        it('should provide the key and the current value for an existent key', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['compute']>[1]>().mockReturnValue(createOptional());

            stringMap.compute('one', handler);

            expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap });
        });

        it('should delete the provided key when the mapper returns an absent optional', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['compute']>[1]>().mockReturnValue(createOptional());

            expect(stringMap.compute('one', handler)).toSatisfy((v) => v.isAbsent());
            expect(stringMap.has('one')).toBeFalse();
            expect(handler).toHaveBeenCalledOnce();
        });

        it('should set the new value to the provided key and return an optional with the value', ({ stringMap }) => {
            const handler = vi
                .fn<Parameters<(typeof stringMap)['compute']>[1]>()
                .mockReturnValue(createOptional('ONE_UPDATED'));

            expect(stringMap.compute('one', handler))
                .toSatisfy((v) => v.isPresent())
                .toSatisfy((v) => v.getOrThrow() === 'ONE_UPDATED');
            expect(stringMap.getOrThrow('one')).toBe('ONE_UPDATED');
            expect(handler).toHaveBeenCalledOnce();
        });
    });

    describe('computeIfAbsent', () => {
        it('should just return an optional with the stored value if the key exists', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['computeIfAbsent']>[1]>();

            expect(stringMap.computeIfAbsent('one', handler))
                .toSatisfy((v) => v.isPresent())
                .toSatisfy((v) => v.getOrThrow() === 'ONE');
            expect(handler).not.toHaveBeenCalled();
        });

        it('should provide proper data for handler and set the value if key does not exist', ({ stringMap }) => {
            const handler = vi
                .fn<Parameters<(typeof stringMap)['computeIfAbsent']>[1]>()
                .mockReturnValue(createOptional('VALUE'));

            expect(stringMap.computeIfAbsent('non-existent-key', handler))
                .toSatisfy((v) => v.isPresent())
                .toSatisfy((v) => v.getOrThrow() === 'VALUE');
            expect(stringMap.getOrThrow('non-existent-key')).toBe('VALUE');
            expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith({ key: 'non-existent-key', map: stringMap });
        });
    });

    describe('computeIfPresent', () => {
        it('should just return an absent optional if the key does not exists', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['computeIfPresent']>[1]>();

            expect(stringMap.computeIfPresent('non-existent-key', handler)).toSatisfy((v) => v.isAbsent());
            expect(handler).not.toHaveBeenCalled();
        });

        it('should provide proper data for handler and set the value when key exists', ({ stringMap }) => {
            const handler = vi
                .fn<Parameters<(typeof stringMap)['computeIfPresent']>[1]>()
                .mockReturnValue(createOptional('ONE_UPDATED'));

            expect(stringMap.computeIfPresent('one', handler))
                .toSatisfy((v) => v.isPresent())
                .toSatisfy((v) => v.getOrThrow() === 'ONE_UPDATED');
            expect(stringMap.getOrThrow('one')).toBe('ONE_UPDATED');
            expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap });
        });

        it('should leave the key alone if the remapper returns an absent optional', ({ stringMap }) => {
            const handler = vi
                .fn<Parameters<(typeof stringMap)['computeIfPresent']>[1]>()
                .mockReturnValue(createOptional());

            expect(stringMap.computeIfPresent('one', handler))
                .toSatisfy((v) => v.isPresent())
                .toSatisfy((v) => v.getOrThrow() === 'ONE');
            expect(stringMap.getOrThrow('one')).toBe('ONE');
            expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap });
        });
    });

    describe('contains', () => {
        it('should returns false if the provided value does not exists', ({ objectMap, stringMap }) => {
            expect(objectMap.contains({ value: 5 })).toBeFalse();
            expect(stringMap.contains('one')).toBeFalse();
        });

        it('should returns false true if the provided value does exists', ({
            objectMapItem1,
            objectMap,
            stringMap,
        }) => {
            expect(objectMap.contains(objectMapItem1)).toBeTrue();
            expect(stringMap.contains('ONE')).toBeTrue();
        });
    });

    describe('each', () => {
        it('should should loop and provide the right data for the handler then return itself', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['each']>[0]>();

            expect(stringMap.each(handler)).toBe(stringMap);
            expect(handler)
                .toHaveBeenCalledTimes(2)
                .toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap })
                .toHaveBeenCalledWith({ key: 'two', value: 'TWO', map: stringMap });
        });
    });

    describe('entriesAsArray', () => {
        it('should return the entries as an array', ({ stringMap }) => {
            expect(stringMap.entriesAsArray())
                .toBeInstanceOf(Array)
                .toEqual([
                    ['one', 'ONE'],
                    ['two', 'TWO'],
                ]);
        });
    });

    describe('every', () => {
        it('should return true when the map is empty', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['every']>[0]>();

            expect(stringMap.clearAndReturn().every(handler)).toBeTrue();
            expect(handler).not.toHaveBeenCalled();
        });

        it('should short-circuit and return false when predicate return false for an item', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['every']>[0]>().mockReturnValue(false);

            expect(stringMap.every(handler)).toBeFalse();
            expect(handler).toHaveBeenCalledOnce();
        });

        it('should return true if predicate returns true for all items', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['every']>[0]>().mockReturnValue(true);

            expect(stringMap.every(handler)).toBeTrue();
            expect(handler).toHaveBeenCalledTimes(2);
        });
    });

    describe('filter', () => {
        it('should runs the predicate for each item in the map', ({ stringMap }) => {
            const handler = vi
                .fn<Parameters<(typeof stringMap)['filter']>[0]>()
                .mockReturnValueOnce(true)
                .mockReturnValueOnce(false);

            expect(stringMap.filter(handler))
                .not.toBe(stringMap)
                .parent()
                .map((v) => v.entriesAsArray())
                .toEqual([['one', 'ONE']]);
            expect(handler)
                .toHaveBeenCalledTimes(2)
                .toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap })
                .toHaveBeenCalledWith({ key: 'two', value: 'TWO', map: stringMap });
        });
    });

    describe('find', () => {
        it('should loop thru and find the first item that matches given predicate', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['find']>[0]>().mockReturnValue(true);

            expect(stringMap.find(handler))
                .toSatisfy((v) => v.isPresent())
                .toSatisfy((v) => v.getOrThrow() === 'ONE');
            expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap });
        });

        it('should return an absent optional when it cannot find the item', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['find']>[0]>().mockReturnValue(false);

            expect(stringMap.find(handler)).toSatisfy((v) => v.isAbsent());
            expect(handler)
                .toHaveBeenCalledTimes(2)
                .toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap })
                .toHaveBeenCalledWith({ key: 'two', value: 'TWO', map: stringMap });
        });
    });

    describe('getOrDefault', () => {
        it('should return the value if the key exists', ({ stringMap }) => {
            expect(stringMap.getOrDefault('one', 'FALLBACK')).toBe('ONE');
        });

        it('should return the fallback value when the key does not exists', ({ stringMap }) => {
            expect(stringMap.getOrDefault('non-existent-key', 'FALLBACK')).toBe('FALLBACK');
        });
    });

    describe('getOrThrow', () => {
        it('should return the value if the key exists', ({ stringMap }) => {
            expect(stringMap.getOrThrow('one')).toBe('ONE');
        });

        it('should throw and error when the key does not exist', ({ stringMap }) => {
            expect(() => stringMap.getOrThrow('non-existent-key')).toThrowError('Key does not exists');
        });
    });

    describe('groupBy', () => {
        it('should group items by the key returned by the grouper function', ({ stringMap }) => {
            const result = stringMap.groupBy(({ value }) => value.length);
            expect(result).toBeInstanceOf(MapPlus);
            expect(result.get(3)).toEqual(
                new MapPlus([
                    ['one', 'ONE'],
                    ['two', 'TWO'],
                ])
            );
        });

        it('should return an empty MapPlus when the original map is empty', () => {
            const emptyMap = new MapPlus<string, string>();
            const result = emptyMap.groupBy(() => 'group');
            expect(result).toBeInstanceOf(MapPlus);
            expect(result.size).toBe(0);
        });

        it('should handle multiple groups', ({ stringMap }) => {
            stringMap.set('three', 'THREE');
            const result = stringMap.groupBy(({ value }) => value.length);
            expect(result.get(3)).toEqual(
                new MapPlus([
                    ['one', 'ONE'],
                    ['two', 'TWO'],
                ])
            );
            expect(result.get(5)).toEqual(new MapPlus([['three', 'THREE']]));
        });
    });

    describe('isEmpty', () => {
        it('should returns false when the map is not empty', ({ stringMap }) => {
            expect(stringMap.isEmpty()).toBeFalse();
        });

        it('should return true when the map is empty', () => {
            expect(new MapPlus<string, string>().isEmpty()).toBeTrue();
        });
    });

    describe('keysArray', () => {
        it('should returns an array of the keys', ({ stringMap }) => {
            expect(stringMap.keysArray()).toEqual(['one', 'two']);
        });
    });

    describe('mapKeys', () => {
        it('should create a new map with the keys mapped by the given mapper', ({ stringMap }) => {
            const handler = vi
                .fn<Parameters<(typeof stringMap)['mapKeys']>[0]>()
                .mockImplementation(({ key }) => `${key}_updated`);

            expect(stringMap.mapKeys(handler))
                .not.toBe(stringMap)
                .parent()
                .map((v) => v.entriesAsArray())
                .toEqual([
                    ['one_updated', 'ONE'],
                    ['two_updated', 'TWO'],
                ]);
            expect(handler)
                .toHaveBeenCalledTimes(2)
                .toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap })
                .toHaveBeenCalledWith({ key: 'two', value: 'TWO', map: stringMap });
        });
    });

    describe('mapValues', () => {
        it('should create a new map with the values mapped by the given mapper', ({ stringMap }) => {
            const handler = vi
                .fn<Parameters<(typeof stringMap)['mapValues']>[0]>()
                .mockImplementation(({ value }) => `${value}_UPDATED`);

            expect(stringMap.mapValues(handler))
                .not.toBe(stringMap)
                .parent()
                .map((v) => v.entriesAsArray())
                .toEqual([
                    ['one', 'ONE_UPDATED'],
                    ['two', 'TWO_UPDATED'],
                ]);
            expect(handler)
                .toHaveBeenCalledTimes(2)
                .toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap })
                .toHaveBeenCalledWith({ key: 'two', value: 'TWO', map: stringMap });
        });
    });

    describe('setAll', () => {
        it('should return itself', ({ stringMap }) => {
            expect(stringMap.setAll([])).toBe(stringMap);
        });

        it('should added the items when given as a map', ({ stringMap }) => {
            stringMap.setAll(stringMap.mapKeys(({ key }) => `${key}_extra`));

            expect(stringMap.toObject()).toEqual({ one: 'ONE', two: 'TWO', one_extra: 'ONE', two_extra: 'TWO' });
        });

        it('should added the items when given as an object', ({ stringMap }) => {
            stringMap.setAll({ three: 'THREE', four: 'FOUR' });

            expect(stringMap.toObject()).toEqual({ one: 'ONE', two: 'TWO', three: 'THREE', four: 'FOUR' });
        });

        it('should added the items when given as an array of entries', ({ stringMap }) => {
            stringMap.setAll([
                ['three', 'THREE'],
                ['four', 'FOUR'],
            ]);

            expect(stringMap.toObject()).toEqual({ one: 'ONE', two: 'TWO', three: 'THREE', four: 'FOUR' });
        });
    });

    describe('setIfAbsent', () => {
        it('should return the current value if the key already exists', ({ stringMap }) => {
            expect(stringMap.setIfAbsent('one', 'ONE_UPDATED')).toBe('ONE');
            expect(stringMap.getOrThrow('one')).toBe('ONE');
        });

        it('should set the value and return it if the key does not exists', ({ stringMap }) => {
            expect(stringMap.setIfAbsent('non-existent-key', 'NEW')).toBe('NEW');
            expect(stringMap.getOrThrow('non-existent-key')).toBe('NEW');
        });
    });

    describe('some', () => {
        it('should return false if the map was empty', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['some']>[0]>();

            expect(stringMap.clearAndReturn().some(handler)).toBeFalse();
            expect(handler).not.toHaveBeenCalled();
        });

        it('should short circuit and return true when the predicate returns true for an item', ({ stringMap }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['some']>[0]>().mockReturnValue(true);

            expect(stringMap.some(handler)).toBeTrue();
            expect(handler).toHaveBeenCalledOnce();
        });

        it('should run thru all the predicates and returns false when the predicate returns false for all items', ({
            stringMap,
        }) => {
            const handler = vi.fn<Parameters<(typeof stringMap)['some']>[0]>().mockReturnValue(false);

            expect(stringMap.some(handler)).toBeFalse();
            expect(handler).toHaveBeenCalledTimes(2);
        });

        it('should run thru all the predicates until it gets to one that returns true', ({ stringMap }) => {
            const handler = vi
                .fn<Parameters<(typeof stringMap)['some']>[0]>()
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(true);

            expect(stringMap.some(handler)).toBeTrue();
            expect(handler).toHaveBeenCalledTimes(2);
        });
    });

    describe('toObject', () => {
        it('should just return an object with the key and values if no mapper function were provided', ({
            stringMap,
        }) => {
            expect(stringMap.toObject()).toEqual({ one: 'ONE', two: 'TWO' });
        });

        it('should map the key before returning the object if given', ({ stringMap }) => {
            const handler = vi
                .fn<NonNullable<NonNullable<Parameters<(typeof stringMap)['toObject']>[0]>['keyMapper']>>()
                .mockImplementation(({ key }) => `${key}_updated`);

            expect(stringMap.toObject({ keyMapper: handler })).toEqual({ one_updated: 'ONE', two_updated: 'TWO' });
            expect(handler)
                .toHaveBeenCalledTimes(2)
                .toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap })
                .toHaveBeenCalledWith({ key: 'two', value: 'TWO', map: stringMap });
        });

        it('should map the value before returning the object if given', ({ stringMap }) => {
            const handler = vi
                .fn<NonNullable<NonNullable<Parameters<(typeof stringMap)['toObject']>[0]>['valueMapper']>>()
                .mockImplementation(({ value }) => `${value}_UPDATED`);

            expect(stringMap.toObject({ valueMapper: handler })).toEqual({ one: 'ONE_UPDATED', two: 'TWO_UPDATED' });
            expect(handler)
                .toHaveBeenCalledTimes(2)
                .toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap })
                .toHaveBeenCalledWith({ key: 'two', value: 'TWO', map: stringMap });
        });

        it('should map both the key and value before returning the object if given', ({ stringMap }) => {
            const keyMapper = vi
                .fn<NonNullable<NonNullable<Parameters<(typeof stringMap)['toObject']>[0]>['keyMapper']>>()
                .mockImplementation(({ key }) => `${key}_updated`);
            const valueMapper = vi
                .fn<NonNullable<NonNullable<Parameters<(typeof stringMap)['toObject']>[0]>['valueMapper']>>()
                .mockImplementation(({ value }) => `${value}_UPDATED`);

            expect(stringMap.toObject({ keyMapper, valueMapper })).toEqual({
                one_updated: 'ONE_UPDATED',
                two_updated: 'TWO_UPDATED',
            });
            [keyMapper, valueMapper].forEach((mapper) =>
                expect(mapper)
                    .toHaveBeenCalledTimes(2)
                    .toHaveBeenCalledWith({ key: 'one', value: 'ONE', map: stringMap })
                    .toHaveBeenCalledWith({ key: 'two', value: 'TWO', map: stringMap })
            );
        });
    });

    describe('valuesArray', () => {
        it('should return the values as an array', ({ stringMap }) => {
            expect(stringMap.valuesArray()).toBeInstanceOf(Array).toEqual(['ONE', 'TWO']);
        });
    });
});
