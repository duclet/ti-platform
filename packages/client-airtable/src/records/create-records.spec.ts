import { AirtableClient } from '@src/client';
import type { CreateRecordsRequest } from '@src/records/create-records';
import { createRecords } from '@src/records/create-records';
import { asNonEmptyArray } from '@ti-platform/aide';
import { expect, expectToFail } from '@ti-platform/aide-test';
import type { $Fetch } from 'ofetch';
import type { Mock } from 'vitest';
import { afterEach, describe, test, vi } from 'vitest';

const it = test.extend<{
    mockFetch: Mock<$Fetch>;
    client: AirtableClient;
}>({
    mockFetch: async ({ task }, use: (arg: Mock<$Fetch>) => Promise<void>) => {
        const mockFetch = vi.fn();
        await use(mockFetch);
    },
    client: async ({ mockFetch }, use) => {
        const client = new AirtableClient('test-api-key');

        vi.spyOn(client, 'queueRequest').mockImplementation((_baseId, callback) =>
            callback(mockFetch as unknown as $Fetch)
        );

        await use(client);
    },
});

describe('createRecords', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should make a POST request with the correct parameters', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            records: [{ id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Test Record' } }],
        });

        const request: CreateRecordsRequest<{ name: string }> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            records: asNonEmptyArray([{ fields: { name: 'Test Record' } }]),
        };

        const result = await createRecords(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
            method: 'POST',
            body: {
                records: [{ fields: { name: 'Test Record' } }],
            },
        });

        expect(result).toEqual({
            records: [
                { id: 'rec123', createdTime: new Date('2023-01-01T00:00:00.000Z'), fields: { name: 'Test Record' } },
            ],
        });
    });

    it('should include optional parameters when provided', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            records: [{ id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Test Record' } }],
        });

        const request: CreateRecordsRequest<{ name: string }> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            records: asNonEmptyArray([{ fields: { name: 'Test Record' } }]),
            returnFieldsByFieldId: true,
            typecast: true,
        };

        await createRecords(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
            method: 'POST',
            body: {
                records: [{ fields: { name: 'Test Record' } }],
                returnFieldsByFieldId: true,
                typecast: true,
            },
        });
    });

    it('should handle multiple records', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            records: [
                { id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Record 1' } },
                { id: 'rec456', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Record 2' } },
            ],
        });

        const request: CreateRecordsRequest<{ name: string }> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            records: asNonEmptyArray([{ fields: { name: 'Record 1' } }, { fields: { name: 'Record 2' } }]),
        };

        const result = await createRecords(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
            method: 'POST',
            body: {
                records: [{ fields: { name: 'Record 1' } }, { fields: { name: 'Record 2' } }],
            },
        });

        expect(result).toEqual({
            records: [
                { id: 'rec123', createdTime: new Date('2023-01-01T00:00:00.000Z'), fields: { name: 'Record 1' } },
                { id: 'rec456', createdTime: new Date('2023-01-01T00:00:00.000Z'), fields: { name: 'Record 2' } },
            ],
        });
    });

    it('should throw an error if validation fails', ({ client }) => {
        const invalidRequest = {
            baseId: 'app123',
            records: [],
        } as unknown as CreateRecordsRequest<{ name: string }>;

        expect(() => createRecords(client, invalidRequest)).toThrowError();
    });

    it('should throw an error if too many records are provided', async ({ client }) => {
        const tooManyRecords = asNonEmptyArray(
            Array.from({ length: 11 }, (_, i) => ({ fields: { name: `Record ${i + 1}` } }))
        );

        const invalidRequest: CreateRecordsRequest<{ name: string }> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            records: tooManyRecords,
        };

        await createRecords(client, invalidRequest)
            .then(() => {
                expectToFail('Expected an error to be thrown');
            })
            .catch((error: Error) => {
                expect(error.message).toContain('Array must contain at most 10 element(s)');
            });
    });
});
