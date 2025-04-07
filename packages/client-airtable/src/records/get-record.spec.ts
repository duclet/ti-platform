import { AirtableClient } from '@src/client';
import { CellFormat, Timezone, UserLocale } from '@src/enums';
import type { GetRecordRequest } from '@src/records/get-record';
import { getRecord } from '@src/records/get-record';
import { expect } from '@ti-platform/aide-test';
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

describe('getRecord', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should make a GET request with the correct parameters', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            id: 'rec123',
            createdTime: '2023-01-01T00:00:00.000Z',
            fields: { name: 'Test Record' },
        });

        const request: GetRecordRequest = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            recordId: 'rec123',
        };

        const result = await getRecord(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1/rec123', {
            method: 'GET',
            query: {},
        });

        expect(result).toEqual({
            id: 'rec123',
            createdTime: new Date('2023-01-01T00:00:00.000Z'),
            fields: { name: 'Test Record' },
        });
    });

    it('should include optional parameters when provided', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            id: 'rec123',
            createdTime: '2023-01-01T00:00:00.000Z',
            fields: { name: 'Test Record' },
        });

        const request: GetRecordRequest = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            recordId: 'rec123',
            returnFieldsByFieldId: true,
            cellFormat: CellFormat.STRING,
            timeZone: Timezone.AMERICA_LOS_ANGELES,
            userLocale: UserLocale.ENGLISH,
        };

        await getRecord(client, request);

        expect(mockFetch).toHaveBeenCalledWith('/app123/table1/rec123', {
            method: 'GET',
            query: {
                returnFieldsByFieldId: true,
                cellFormat: 'string',
                timeZone: 'America/Los_Angeles',
                userLocale: 'en-us',
            },
        });
    });

    it('should handle different field types', async ({ client, mockFetch }) => {
        mockFetch.mockResolvedValue({
            id: 'rec123',
            createdTime: '2023-01-01T00:00:00.000Z',
            fields: {
                name: 'Test Record',
                isActive: true,
                count: 42,
                tags: ['tag1', 'tag2'],
            },
        });

        const request: GetRecordRequest = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            recordId: 'rec123',
        };

        const result = await getRecord<{
            name: string;
            isActive: boolean;
            count: number;
            tags: Array<string>;
        }>(client, request);

        expect(result).toEqual({
            id: 'rec123',
            createdTime: new Date('2023-01-01T00:00:00.000Z'),
            fields: {
                name: 'Test Record',
                isActive: true,
                count: 42,
                tags: ['tag1', 'tag2'],
            },
        });
    });

    it('should throw an error if validation fails', ({ client }) => {
        const invalidRequest = {
            baseId: 'app123',
            tableIdOrName: 'table1',
            // Missing recordId
        } as unknown as GetRecordRequest;

        expect(() => getRecord(client, invalidRequest)).toThrowError();
    });
});
