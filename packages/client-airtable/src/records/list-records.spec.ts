import { AirtableClient } from '@src/client';
import { CellFormat, Direction, Timezone, UserLocale } from '@src/enums';
import type { ListRecordsRequest } from '@src/records/list-records';
import { listRecords } from '@src/records/list-records';
import { expect, expectToFail } from '@ti-platform/aide-test';
import type { $Fetch } from 'ofetch';
import type { StringKeyOf } from 'type-fest';
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

describe('listRecords', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should make a GET request with the correct parameters', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            records: [{ id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Test Record' } }],
        });

        const request: ListRecordsRequest<StringKeyOf<{ name: string }>> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
        };

        const result = await listRecords<{ name: string }>(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
            method: 'GET',
            query: {},
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

        const request: ListRecordsRequest<StringKeyOf<{ name: string; status: string }>> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            fields: ['name', 'status'],
            filterByFormula: "AND({status}='Active')",
            maxRecords: 50,
            pageSize: 20,
            returnFieldsByFieldId: true,
            cellFormat: CellFormat.STRING,
            timeZone: Timezone.AMERICA_LOS_ANGELES,
            userLocale: UserLocale.ENGLISH,
            view: 'Grid view',
        };

        await listRecords<{ name: string; status: string }>(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
            method: 'GET',
            query: {
                fields: ['name', 'status'],
                filterByFormula: "AND({status}='Active')",
                maxRecords: 50,
                pageSize: 20,
                returnFieldsByFieldId: true,
                cellFormat: 'string',
                timeZone: 'America/Los_Angeles',
                userLocale: 'en-us',
                view: 'Grid view',
            },
        });
    });

    it('should handle sorting parameters', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            records: [
                { id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'A Record' } },
                { id: 'rec456', createdTime: '2023-01-02T00:00:00.000Z', fields: { name: 'B Record' } },
            ],
        });

        const request: ListRecordsRequest<StringKeyOf<{ name: string }>> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            sort: [
                { field: 'name', direction: Direction.ASC },
                { field: 'createdTime', direction: Direction.DESC },
            ],
        };

        await listRecords<{ name: string }>(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
            method: 'GET',
            query: {
                sort: [
                    { field: 'name', direction: 'asc' },
                    { field: 'createdTime', direction: 'desc' },
                ],
            },
        });
    });

    it('should handle pagination with offset', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValueOnce({
            records: [{ id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Record 1' } }],
            offset: 'offset123',
        });

        mockFetch.mockResolvedValueOnce({
            records: [{ id: 'rec456', createdTime: '2023-01-02T00:00:00.000Z', fields: { name: 'Record 2' } }],
        });

        // First request
        const request1: ListRecordsRequest<StringKeyOf<{ name: string }>> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            pageSize: 1,
        };

        const result1 = await listRecords<{ name: string }>(client, request1);

        expect(result1.offset).toBe('offset123');
        expect(result1.records).toHaveLength(1);

        // Second request with offset
        const request2: ListRecordsRequest<StringKeyOf<{ name: string }>> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            pageSize: 1,
            offset: result1.offset,
        };

        const result2 = await listRecords<{ name: string }>(client, request2);

        expect(mockFetch).toHaveBeenNthCalledWith(2, '/app123/table1', {
            method: 'GET',
            query: {
                pageSize: 1,
                offset: 'offset123',
            },
        });

        expect(result2.offset).toBeUndefined();
        expect(result2.records).toHaveLength(1);
    });

    it('should handle record metadata', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            records: [
                {
                    id: 'rec123',
                    createdTime: '2023-01-01T00:00:00.000Z',
                    fields: { name: 'Test Record' },
                    commentCount: 5,
                },
            ],
        });

        const request: ListRecordsRequest<StringKeyOf<{ name: string }>> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            recordMetadata: ['commentCount'],
        };

        const result = await listRecords<{ name: string }>(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
            method: 'GET',
            query: {
                recordMetadata: ['commentCount'],
            },
        });

        expect(result.records[0].commentCount).toBe(5);
    });

    it('should throw an error if validation fails', ({ client }) => {
        const invalidRequest = {
            baseId: 'app123',
            // Missing tableIdOrName
        } as unknown as ListRecordsRequest<StringKeyOf<{ name: string }>>;

        expect(() => listRecords<{ name: string }>(client, invalidRequest)).toThrowError();
    });

    it('should throw an error if pageSize is out of range', async ({ client }) => {
        const invalidRequest: ListRecordsRequest<StringKeyOf<{ name: string }>> = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            pageSize: 101, // Max is 100
        };

        await listRecords<{ name: string }>(client, invalidRequest)
            .then(() => {
                expectToFail('Expected an error to be thrown');
            })
            .catch((error: Error) => {
                expect(error.message).toContain('Number must be less than or equal to 100');
            });
    });
});
