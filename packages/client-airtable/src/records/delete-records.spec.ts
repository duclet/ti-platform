import { AirtableClient } from '@src/client';
import type { DeleteRecordsRequest } from '@src/records/delete-records';
import { deleteRecords } from '@src/records/delete-records';
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

describe('deleteRecords', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should make a DELETE request with the correct parameters', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            records: [
                { id: 'rec123', deleted: true },
                { id: 'rec456', deleted: true },
            ],
        });

        const request: DeleteRecordsRequest = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            records: ['rec123', 'rec456'],
        };

        const result = await deleteRecords(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
            method: 'DELETE',
            query: {
                records: ['rec123', 'rec456'],
            },
        });

        expect(result).toEqual({
            records: [
                { id: 'rec123', deleted: true },
                { id: 'rec456', deleted: true },
            ],
        });
    });

    it('should handle a single record', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            records: [{ id: 'rec123', deleted: true }],
        });

        const request: DeleteRecordsRequest = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            records: ['rec123'],
        };

        const result = await deleteRecords(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
            method: 'DELETE',
            query: {
                records: ['rec123'],
            },
        });

        expect(result).toEqual({
            records: [{ id: 'rec123', deleted: true }],
        });
    });

    it('should handle maximum number of records (10)', async ({ client, mockFetch }) => {
        const recordIds = Array.from({ length: 10 }, (_, i) => `rec${i + 1}`);
        const responseRecords = recordIds.map((id) => ({ id, deleted: true }));

        mockFetch.mockResolvedValue({
            records: responseRecords,
        });

        const request: DeleteRecordsRequest = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            records: recordIds,
        };

        const result = await deleteRecords(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
            method: 'DELETE',
            query: {
                records: recordIds,
            },
        });

        expect(result).toEqual({
            records: responseRecords,
        });
    });

    it('should throw an error if validation fails', ({ client }) => {
        const invalidRequest = {
            baseId: 'app123',
            records: [],
        } as unknown as DeleteRecordsRequest;

        expect(() => deleteRecords(client, invalidRequest)).toThrowError();
    });

    it('should throw an error if too many records are provided', async ({ client }) => {
        const tooManyRecords = Array.from({ length: 11 }, (_, i) => `rec${i + 1}`);

        const invalidRequest: DeleteRecordsRequest = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            records: tooManyRecords,
        };

        await deleteRecords(client, invalidRequest)
            .then(() => {
                expectToFail('Expected an error to be thrown');
            })
            .catch((error: Error) => {
                expect(error.message).toContain('Array must contain at most 10 element(s)');
            });
    });
});
