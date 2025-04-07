import { useHeightCalc } from '@src/dom';
import { expect } from '@ti-platform/aide-test';
import { beforeEach, describe, it, vi } from 'vitest';
import { ref } from 'vue';

describe('dom', () => {
    describe('useHeightCalc', () => {
        let mockElement: HTMLElement;
        let mockComponent: { $el: HTMLElement };

        beforeEach(() => {
            mockElement = document.createElement('div');
            Object.defineProperty(mockElement, 'offsetHeight', {
                configurable: true,
                get: vi.fn().mockReturnValue(100),
            });

            mockComponent = {
                $el: document.createElement('div'),
            };
            Object.defineProperty(mockComponent.$el, 'offsetHeight', {
                configurable: true,
                get: vi.fn().mockReturnValue(50),
            });
        });

        it('should return a calc expression with baseHeight only when no elements provided', () => {
            const baseHeight = '100vh';
            const result = useHeightCalc(baseHeight, []);

            expect(result.value).toBe('calc(100vh)');
        });

        it('should subtract HTMLElement heights from baseHeight', () => {
            const baseHeight = '100vh';
            const element = ref(mockElement);
            const result = useHeightCalc(baseHeight, [element]);

            expect(result.value).toBe('calc(100vh - 100px)');
        });

        it('should subtract component $el heights from baseHeight', () => {
            const baseHeight = '100vh';
            const component = ref(mockComponent);
            const result = useHeightCalc(baseHeight, [component]);

            expect(result.value).toBe('calc(100vh - 50px)');
        });

        it('should handle multiple elements', () => {
            const baseHeight = '100vh';
            const element1 = ref(mockElement);
            const element2 = ref(mockComponent);
            const result = useHeightCalc(baseHeight, [element1, element2]);

            expect(result.value).toBe('calc(100vh - 100px - 50px)');
        });

        it('should ignore elements with no value', () => {
            const baseHeight = '100vh';
            const element1 = ref(mockElement);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const element2 = ref<any>(null);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const result = useHeightCalc(baseHeight, [element1, element2]);

            expect(result.value).toBe('calc(100vh - 100px)');
        });

        it('should ignore elements with zero offsetHeight', () => {
            const baseHeight = '100vh';
            const element = ref(mockElement);

            vi.spyOn(mockElement, 'offsetHeight', 'get').mockReturnValue(0);

            const result = useHeightCalc(baseHeight, [element]);

            expect(result.value).toBe('calc(100vh)');
        });

        it('should work with percentage baseHeight', () => {
            const baseHeight = '100%';
            const element = ref(mockElement);
            const result = useHeightCalc(baseHeight, [element]);

            expect(result.value).toBe('calc(100% - 100px)');
        });

        it('should work with pixel baseHeight', () => {
            const baseHeight = '800px';
            const element = ref(mockElement);
            const result = useHeightCalc(baseHeight, [element]);

            expect(result.value).toBe('calc(800px - 100px)');
        });

        it('should handle dynamic changes to element heights', () => {
            const baseHeight = '100vh';
            const element = ref(mockElement);
            const result = useHeightCalc(baseHeight, [element]);

            expect(result.value).toBe('calc(100vh - 100px)');

            vi.spyOn(mockElement, 'offsetHeight', 'get').mockReturnValue(200);

            result.trigger();

            expect(result.value).toBe('calc(100vh - 200px)');
        });
    });
});
