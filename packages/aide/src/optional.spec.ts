import type { Optional } from '@src/optional';
import { createOptional } from '@src/optional';
import { expect } from '@ti-platform/aide-test';
import { describe, test, vi } from 'vitest';

const it = test.extend<{
    absentOptional: Optional<string>;
    presentOptional: Optional<string>;
}>({
    absentOptional: async ({ task }, use) => {
        await use(createOptional());
    },

    presentOptional: async ({ task }, use) => {
        await use(createOptional('one'));
    },
});

describe('createOptional', () => {
    it('should create an absent optional when given is undefined or null', () => {
        expect(createOptional()).toSatisfy((v) => v.isAbsent());
        expect(createOptional(null)).toSatisfy((v) => v.isAbsent());
    });

    it('should only have one absent optional instance', () => {
        expect(createOptional()).toBe(createOptional(null));
    });

    it('should create a present optional when a defined value is given', () => {
        expect(createOptional('one')).toSatisfy((v) => v.isPresent());
    });

    describe('Absent Optional', () => {
        describe('filter', () => {
            it('should return itself without calling handler', ({ absentOptional }) => {
                const handler = vi.fn<Parameters<(typeof absentOptional)['filter']>[0]>();

                expect(absentOptional.filter(handler)).toBe(absentOptional);
                expect(handler).not.toHaveBeenCalled();
            });
        });

        describe('flatMap', () => {
            it('should return itself without calling handler', ({ absentOptional }) => {
                const handler = vi.fn<Parameters<(typeof absentOptional)['flatMap']>[0]>();

                expect(absentOptional.flatMap(handler)).toBe(absentOptional);
                expect(handler).not.toHaveBeenCalled();
            });
        });

        describe('getOrThrow', () => {
            it('should throw an exception', ({ absentOptional }) => {
                expect(() => absentOptional.getOrThrow()).toThrowError('Optional is empty');
            });
        });

        describe('ifAbsent', () => {
            it('should execute provided handler and return itself', ({ absentOptional }) => {
                const handler = vi.fn<Parameters<(typeof absentOptional)['ifAbsent']>[0]>();

                expect(absentOptional.ifAbsent(handler)).toBe(absentOptional);
                expect(handler).toHaveBeenCalledOnce();
            });
        });

        describe('ifPresent', () => {
            it('should return itself without calling handler', ({ absentOptional }) => {
                const handler = vi.fn<Parameters<(typeof absentOptional)['ifPresent']>[0]>();

                expect(absentOptional.ifPresent(handler)).toBe(absentOptional);
                expect(handler).not.toHaveBeenCalled();
            });
        });

        describe('isAbsent', () => {
            it('should return true', ({ absentOptional }) => {
                expect(absentOptional.isAbsent()).toBeTrue();
            });
        });

        describe('isPresent', () => {
            it('should return false', ({ absentOptional }) => {
                expect(absentOptional.isPresent()).toBeFalse();
            });
        });

        describe('map', () => {
            it('should return itself without calling the mapper', ({ absentOptional }) => {
                const handler = vi.fn<Parameters<(typeof absentOptional)['map']>[0]>();

                expect(absentOptional.map(handler)).toBe(absentOptional);
                expect(handler).not.toHaveBeenCalled();
            });
        });

        describe('or', () => {
            it('should call the handler and return its optional value', ({ absentOptional, presentOptional }) => {
                const handler = vi.fn<Parameters<(typeof absentOptional)['or']>[0]>().mockReturnValue(presentOptional);

                expect(absentOptional.or(handler)).toBe(presentOptional);
                expect(handler).toHaveBeenCalledOnce();
            });
        });

        describe('orElse', () => {
            it('should return the provided value', ({ absentOptional }) => {
                expect(absentOptional.orElse('one')).toBe('one');
            });
        });

        describe('orElseGet', () => {
            it('should call the handler and return its value', ({ absentOptional }) => {
                const handler = vi.fn<Parameters<(typeof absentOptional)['orElseGet']>[0]>().mockReturnValue('one');

                expect(absentOptional.orElseGet(handler)).toBe('one');
                expect(handler).toHaveBeenCalledOnce();
            });
        });

        describe('orElseThrow', () => {
            it('should throw the error returned by the handler', ({ absentOptional }) => {
                const handler = vi
                    .fn<Parameters<(typeof absentOptional)['orElseThrow']>[0]>()
                    .mockReturnValue(new Error('error'));

                expect(() => absentOptional.orElseThrow(handler)).toThrowError('error');
                expect(handler).toHaveBeenCalledOnce();
            });
        });

        describe('orUndefined', () => {
            it('should return undefined', ({ absentOptional }) => {
                expect(absentOptional.orUndefined()).toBeUndefined();
            });
        });
    });

    describe('Present Optional', () => {
        describe('filter', () => {
            it('should return an absent optional if the handler returns false', ({
                absentOptional,
                presentOptional,
            }) => {
                const handler = vi.fn<Parameters<(typeof presentOptional)['filter']>[0]>().mockReturnValue(false);

                expect(presentOptional.filter(handler)).toBe(absentOptional);
                expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith('one');
            });

            it('should return itself if the handler returns true', ({ presentOptional }) => {
                const handler = vi.fn<Parameters<(typeof presentOptional)['filter']>[0]>().mockReturnValue(true);

                expect(presentOptional.filter(handler)).toBe(presentOptional);
                expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith('one');
            });
        });

        describe('flatMap', () => {
            it('should return the optional returned by given handler', ({ presentOptional }) => {
                const otherOptional = createOptional('two');
                const handler = vi
                    .fn<Parameters<(typeof presentOptional)['flatMap']>[0]>()
                    .mockReturnValue(otherOptional);

                expect(presentOptional.flatMap(handler)).toBe(otherOptional);
                expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith('one');
            });
        });

        describe('getOrThrow', () => {
            it('should return the value', ({ presentOptional }) => {
                expect(presentOptional.getOrThrow()).toBe('one');
            });
        });

        describe('ifAbsent', () => {
            it('should return itself without calling handler', ({ presentOptional }) => {
                const handler = vi.fn<Parameters<(typeof presentOptional)['ifAbsent']>[0]>();

                expect(presentOptional.ifAbsent(handler)).toBe(presentOptional);
                expect(handler).not.toHaveBeenCalled();
            });
        });

        describe('ifPresent', () => {
            it('should call the handler and return itself', ({ presentOptional }) => {
                const handler = vi.fn<Parameters<(typeof presentOptional)['ifPresent']>[0]>();

                expect(presentOptional.ifPresent(handler)).toBe(presentOptional);
                expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith('one');
            });
        });

        describe('isAbsent', () => {
            it('should return false', ({ presentOptional }) => {
                expect(presentOptional.isAbsent()).toBeFalse();
            });
        });

        describe('isPresent', () => {
            it('should return true', ({ presentOptional }) => {
                expect(presentOptional.isPresent()).toBeTrue();
            });
        });

        describe('map', () => {
            it('should create a new optional with the mapped value', ({ presentOptional }) => {
                const handler = vi.fn<Parameters<(typeof presentOptional)['map']>[0]>().mockReturnValue('two');

                expect(presentOptional.map(handler))
                    .toSatisfy((v) => v.getOrThrow() === 'two')
                    .not.toBe(presentOptional);
                expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith('one');
            });
        });

        describe('or', () => {
            it('should return itself without calling handler', ({ presentOptional }) => {
                const handler = vi.fn<Parameters<(typeof presentOptional)['or']>[0]>();

                expect(presentOptional.or(handler)).toBe(presentOptional);
                expect(handler).not.toHaveBeenCalled();
            });
        });

        describe('orElse', () => {
            it('should return its value', ({ presentOptional }) => {
                expect(presentOptional.orElse('two')).toBe('one');
            });
        });

        describe('orElseGet', () => {
            it('should return its value without calling handler', ({ presentOptional }) => {
                const handler = vi.fn<Parameters<(typeof presentOptional)['orElseGet']>[0]>();

                expect(presentOptional.orElseGet(handler)).toBe('one');
                expect(handler).not.toHaveBeenCalled();
            });
        });

        describe('orElseThrow', () => {
            it('should return its value without calling handler or throwing anything', ({ presentOptional }) => {
                const handler = vi.fn<Parameters<(typeof presentOptional)['orElseThrow']>[0]>();

                expect(() => presentOptional.orElseThrow(handler))
                    .not.toThrowError()
                    .parent()
                    .map((fn) => fn())
                    .toBe('one');
                expect(handler).not.toHaveBeenCalled();
            });
        });

        describe('orUndefined', () => {
            it('should return its value', ({ presentOptional }) => {
                expect(presentOptional.orUndefined()).toBe('one');
            });
        });
    });
});
