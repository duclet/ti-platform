import { AirtableClient } from '@src/client';
import { UpdateType } from '@src/enums';
import { createRecords } from '@src/records/create-records';
import { deleteRecords } from '@src/records/delete-records';
import { getRecord } from '@src/records/get-record';
import type { ListRecordsRequest } from '@src/records/list-records';
import { listRecords } from '@src/records/list-records';
import { updateRecords } from '@src/records/update-records';
import { asNonEmptyArray } from '@ti-platform/aide';
import { expect, matchAny } from '@ti-platform/aide-test';
import type { StringKeyOf } from 'type-fest';
import { afterEach, describe, test, vi } from 'vitest';

vi.mock('@src/records/create-records', { spy: true });
vi.mock('@src/records/delete-records', { spy: true });
vi.mock('@src/records/get-record', { spy: true });
vi.mock('@src/records/list-records', { spy: true });
vi.mock('@src/records/update-records', { spy: true });

const it = test.extend<{ client: AirtableClient }>({
    client: async ({ task }, use) => {
        const client = new AirtableClient('test-api-token');
        await use(client);
    },
});

describe('AirtableClient', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('createRecords', () => {
        it('should call the createRecords function with correct parameters and return expected result', async ({
            client,
        }) => {
            const mockResponse = { records: [{ id: 'rec123', createdTime: new Date(), fields: { name: 'Test' } }] };
            vi.mocked(createRecords).mockResolvedValue(mockResponse);

            const request = {
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([{ fields: { name: 'Test' } }]),
            };

            const result = await client.createRecords(request);

            expect(createRecords).toHaveBeenCalledWith(client, request);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('deleteRecords', () => {
        it('should call the deleteRecords function with correct parameters and return expected result', async ({
            client,
        }) => {
            const mockResponse = { records: [{ id: 'rec123', deleted: true }] };
            vi.mocked(deleteRecords).mockResolvedValue(mockResponse);

            const request = {
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: ['rec123', 'rec456'],
            };

            const result = await client.deleteRecords(request);

            expect(deleteRecords).toHaveBeenCalledWith(client, request);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getRecord', () => {
        it('should call the getRecord function with correct parameters and return expected result', async ({
            client,
        }) => {
            const mockResponse = { id: 'rec123', createdTime: new Date(), fields: { name: 'Test' } };
            vi.mocked(getRecord).mockResolvedValue(mockResponse);

            const request = {
                baseId: 'app123',
                tableIdOrName: 'table1',
                recordId: 'rec123',
            };

            const result = await client.getRecord(request);

            expect(getRecord).toHaveBeenCalledWith(client, request);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('listRecords', () => {
        it('should call the listRecords function with correct parameters and return expected result', async ({
            client,
        }) => {
            const mockResponse = {
                records: [{ id: 'rec123', createdTime: new Date(), fields: { Field1: true, Field2: 'value' } }],
            };
            vi.mocked(listRecords).mockResolvedValue(mockResponse);

            const request: ListRecordsRequest<StringKeyOf<{ Field1: boolean; Field2: string }>> = {
                baseId: 'app123',
                tableIdOrName: 'table1',
                fields: ['Field1', 'Field2'],
                maxRecords: 10,
            };

            const result = await client.listRecords<{ Field1: boolean; Field2: string }>(request);

            expect(listRecords).toHaveBeenCalledWith(client, request);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('updateRecords', () => {
        it('should call the updateRecords function with correct parameters and return expected result', async ({
            client,
        }) => {
            const mockResponse = { records: [{ id: 'rec123', createdTime: new Date(), fields: { name: 'Test' } }] };
            vi.mocked(updateRecords).mockResolvedValue(mockResponse);

            const request = {
                method: UpdateType.FULL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([{ id: 'rec123', fields: { name: 'Test' } }]),
            };

            const result = await client.updateRecords(request);

            expect(updateRecords).toHaveBeenCalledWith(client, request);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('queueRequest', () => {
        it('should queue the request and return the result', async ({ client }) => {
            const mockResponse = { data: 'test' };
            const mockHandler = vi.fn().mockResolvedValue(mockResponse);

            const result = await client.queueRequest('app123', mockHandler);

            expect(mockHandler).toHaveBeenCalledWith(matchAny(Function));
            expect(result).toEqual(mockResponse);
        });
    });
});
