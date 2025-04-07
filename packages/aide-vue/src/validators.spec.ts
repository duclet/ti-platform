import { isRequiredField, isRequiredFieldWhen, isUniqueField } from '@src/validators';
import { expect } from '@ti-platform/aide-test';
import { describe, it, vi } from 'vitest';
import { ref } from 'vue';

describe('validators', () => {
    describe('isRequiredField', () => {
        it('should return true for non-empty string values', () => {
            const validator = isRequiredField();
            expect(validator('test')).toBe(true);
        });

        it('should return true for non-zero number values', () => {
            const validator = isRequiredField();
            expect(validator(42)).toBe(true);
        });

        it('should return true for non-empty arrays', () => {
            const validator = isRequiredField();
            expect(validator(['test'])).toBe(true);
            expect(validator([42])).toBe(true);
        });

        it('should return error message for empty string', () => {
            const validator = isRequiredField();
            expect(validator('')).toBe('Requires non-empty value');
        });

        it('should return error message for zero', () => {
            const validator = isRequiredField();
            expect(validator(0)).toBe('Requires non-empty value');
        });

        it('should return error message for empty arrays', () => {
            const validator = isRequiredField();
            expect(validator([])).toBe('Requires non-empty value');
        });

        it('should return custom error message when provided', () => {
            const customMessage = 'This field is required';
            const validator = isRequiredField(customMessage);
            expect(validator('')).toBe(customMessage);
        });
    });

    describe('isRequiredFieldWhen', () => {
        it('should validate when condition is true', () => {
            const condition = vi.fn().mockReturnValue(true);
            const validator = isRequiredFieldWhen(condition);

            expect(validator('')).toBe('Requires non-empty value');
            expect(validator('test')).toBe(true);
            expect(condition).toHaveBeenCalledTimes(2);
        });

        it('should skip validation when condition is false', () => {
            const condition = vi.fn().mockReturnValue(false);
            const validator = isRequiredFieldWhen(condition);

            expect(validator('')).toBe(true);
            expect(validator('test')).toBe(true);
            expect(condition).toHaveBeenCalledTimes(2);
        });

        it('should use custom error message when provided', () => {
            const customMessage = 'This field is required';
            const condition = () => true;
            const validator = isRequiredFieldWhen(condition, customMessage);

            expect(validator('')).toBe(customMessage);
        });
    });

    describe('isUniqueField', () => {
        it('should return true when value is unique', () => {
            const values = ref(['one', 'two', 'three']);
            const validator = isUniqueField(values);

            expect(validator('four')).toBe(true);
        });

        it('should return true when value appears only once', () => {
            const values = ref(['one', 'two', 'three']);
            const validator = isUniqueField(values);

            expect(validator('one')).toBe(true);
        });

        it('should return error message when value appears multiple times', () => {
            const values = ref(['one', 'two', 'one', 'three']);
            const validator = isUniqueField(values);

            expect(validator('one')).toBe('Value already used');
        });

        it('should return custom error message when provided', () => {
            const customMessage = 'This value is not unique';
            const values = ref(['one', 'two', 'one', 'three']);
            const validator = isUniqueField(values, customMessage);

            expect(validator('one')).toBe(customMessage);
        });

        it('should work with number values', () => {
            const values = ref([1, 2, 3, 1]);
            const validator = isUniqueField(values);

            expect(validator(1)).toBe('Value already used');
            expect(validator(4)).toBe(true);
        });
    });
});
