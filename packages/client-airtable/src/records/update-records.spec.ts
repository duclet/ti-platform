import { AirtableClient } from '@src/client';
import { UpdateType } from '@src/enums';
import type {
    UpdateRecordsRequest,
    UpdateRecordsRequestNonUpsert,
    UpdateRecordsRequestUpsert,
} from '@src/records/update-records';
import { updateRecords } from '@src/records/update-records';
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

describe('updateRecords', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('non-upsert mode', () => {
        it('should make a PATCH request with the correct parameters', async ({ client, mockFetch }) => {
            mockFetch.mockResolvedValue({
                records: [
                    { id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Updated Record' } },
                ],
            });

            const request: UpdateRecordsRequestNonUpsert<{ name: string }> = {
                method: UpdateType.PARTIAL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([{ id: 'rec123', fields: { name: 'Updated Record' } }]),
            };

            const result = await updateRecords(client, request);

            expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
                method: 'PATCH',
                body: {
                    records: [{ id: 'rec123', fields: { name: 'Updated Record' } }],
                },
            });

            expect(result).toEqual({
                records: [
                    {
                        id: 'rec123',
                        createdTime: new Date('2023-01-01T00:00:00.000Z'),
                        fields: { name: 'Updated Record' },
                    },
                ],
            });
        });

        it('should make a PUT request with the correct parameters', async ({ client, mockFetch }) => {
            mockFetch.mockResolvedValue({
                records: [
                    { id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Replaced Record' } },
                ],
            });

            const request: UpdateRecordsRequestNonUpsert<{ name: string }> = {
                method: UpdateType.FULL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([{ id: 'rec123', fields: { name: 'Replaced Record' } }]),
            };

            const result = await updateRecords(client, request);

            expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
                method: 'PUT',
                body: {
                    records: [{ id: 'rec123', fields: { name: 'Replaced Record' } }],
                },
            });

            expect(result).toEqual({
                records: [
                    {
                        id: 'rec123',
                        createdTime: new Date('2023-01-01T00:00:00.000Z'),
                        fields: { name: 'Replaced Record' },
                    },
                ],
            });
        });

        it('should include optional parameters when provided', async ({ client, mockFetch }) => {
            mockFetch.mockResolvedValue({
                records: [
                    { id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Updated Record' } },
                ],
            });

            const request: UpdateRecordsRequestNonUpsert<{ name: string }> = {
                method: UpdateType.PARTIAL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([{ id: 'rec123', fields: { name: 'Updated Record' } }]),
                returnFieldsByFieldId: true,
                typecast: true,
            };

            await updateRecords(client, request);

            expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
                method: 'PATCH',
                body: {
                    records: [{ id: 'rec123', fields: { name: 'Updated Record' } }],
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

            const request: UpdateRecordsRequestNonUpsert<{ name: string }> = {
                method: UpdateType.PARTIAL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([
                    { id: 'rec123', fields: { name: 'Record 1' } },
                    { id: 'rec456', fields: { name: 'Record 2' } },
                ]),
            };

            const result = await updateRecords(client, request);

            expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
                method: 'PATCH',
                body: {
                    records: [
                        { id: 'rec123', fields: { name: 'Record 1' } },
                        { id: 'rec456', fields: { name: 'Record 2' } },
                    ],
                },
            });

            expect(result).toEqual({
                records: [
                    { id: 'rec123', createdTime: new Date('2023-01-01T00:00:00.000Z'), fields: { name: 'Record 1' } },
                    { id: 'rec456', createdTime: new Date('2023-01-01T00:00:00.000Z'), fields: { name: 'Record 2' } },
                ],
            });
        });

        it('should throw an error if too many records are provided', async ({ client }) => {
            const tooManyRecords = asNonEmptyArray(
                Array.from({ length: 11 }, (_, i) => ({ id: `rec${i + 1}`, fields: { name: `Record ${i + 1}` } }))
            );

            const invalidRequest: UpdateRecordsRequestNonUpsert<{ name: string }> = {
                method: UpdateType.PARTIAL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: tooManyRecords,
            };

            await updateRecords(client, invalidRequest)
                .then(() => {
                    expectToFail('Expected an error to be thrown');
                })
                .catch((error: Error) => {
                    expect(error.message).toContain('Array must contain at most 10 element(s)');
                });
        });
    });

    describe('upsert mode', () => {
        it('should make a PATCH request with upsert parameters', async ({ client, mockFetch }) => {
            mockFetch.mockResolvedValue({
                records: [
                    { id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Upserted Record' } },
                ],
                createdRecords: ['rec123'],
                updatedRecords: [],
            });

            const request: UpdateRecordsRequestUpsert<{ name: string }> = {
                method: UpdateType.PARTIAL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([{ fields: { name: 'Upserted Record' } }]),
                performUpsert: {
                    fieldsToMergeOn: ['name'],
                },
            };

            const result = await updateRecords(client, request);

            expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
                method: 'PATCH',
                body: {
                    records: [{ fields: { name: 'Upserted Record' } }],
                    performUpsert: {
                        fieldsToMergeOn: ['name'],
                    },
                },
            });

            expect(result).toEqual({
                records: [
                    {
                        id: 'rec123',
                        createdTime: new Date('2023-01-01T00:00:00.000Z'),
                        fields: { name: 'Upserted Record' },
                    },
                ],
                createdRecords: ['rec123'],
                updatedRecords: [],
            });
        });

        it('should make a PUT request with upsert parameters', async ({ client, mockFetch }) => {
            mockFetch.mockResolvedValue({
                records: [
                    { id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Created Record' } },
                    { id: 'rec456', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Updated Record' } },
                ],
                createdRecords: ['rec123'],
                updatedRecords: ['rec456'],
            });

            const request: UpdateRecordsRequestUpsert<{ name: string }> = {
                method: UpdateType.FULL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([
                    { fields: { name: 'Created Record' } },
                    { fields: { name: 'Updated Record' } },
                ]),
                performUpsert: {
                    fieldsToMergeOn: ['name'],
                },
            };

            const result = await updateRecords(client, request);

            expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
                method: 'PUT',
                body: {
                    records: [{ fields: { name: 'Created Record' } }, { fields: { name: 'Updated Record' } }],
                    performUpsert: {
                        fieldsToMergeOn: ['name'],
                    },
                },
            });

            expect(result).toEqual({
                records: [
                    {
                        id: 'rec123',
                        createdTime: new Date('2023-01-01T00:00:00.000Z'),
                        fields: { name: 'Created Record' },
                    },
                    {
                        id: 'rec456',
                        createdTime: new Date('2023-01-01T00:00:00.000Z'),
                        fields: { name: 'Updated Record' },
                    },
                ],
                createdRecords: ['rec123'],
                updatedRecords: ['rec456'],
            });
        });

        it('should include optional parameters when provided', async ({ client, mockFetch }) => {
            mockFetch.mockResolvedValue({
                records: [
                    { id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Upserted Record' } },
                ],
                createdRecords: ['rec123'],
                updatedRecords: [],
            });

            const request: UpdateRecordsRequestUpsert<{ name: string }> = {
                method: UpdateType.PARTIAL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([{ fields: { name: 'Upserted Record' } }]),
                performUpsert: {
                    fieldsToMergeOn: ['name'],
                },
                returnFieldsByFieldId: true,
                typecast: true,
            };

            await updateRecords(client, request);

            expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
                method: 'PATCH',
                body: {
                    records: [{ fields: { name: 'Upserted Record' } }],
                    performUpsert: {
                        fieldsToMergeOn: ['name'],
                    },
                    returnFieldsByFieldId: true,
                    typecast: true,
                },
            });
        });

        it('should handle multiple fields to merge on', async ({ client, mockFetch }) => {
            mockFetch.mockResolvedValue({
                records: [
                    { id: 'rec123', createdTime: '2023-01-01T00:00:00.000Z', fields: { name: 'Test', code: 'ABC' } },
                ],
                createdRecords: ['rec123'],
                updatedRecords: [],
            });

            const request: UpdateRecordsRequestUpsert<{ name: string; code: string }> = {
                method: UpdateType.PARTIAL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([{ fields: { name: 'Test', code: 'ABC' } }]),
                performUpsert: {
                    fieldsToMergeOn: ['name', 'code'],
                },
            };

            await updateRecords(client, request);

            expect(mockFetch).toHaveBeenCalledWith('/app123/table1', {
                method: 'PATCH',
                body: {
                    records: [{ fields: { name: 'Test', code: 'ABC' } }],
                    performUpsert: {
                        fieldsToMergeOn: ['name', 'code'],
                    },
                },
            });
        });

        it('should throw an error if too many records are provided', async ({ client }) => {
            const tooManyRecords = asNonEmptyArray(
                Array.from({ length: 11 }, (_, i) => ({ fields: { name: `Record ${i + 1}` } }))
            );

            const invalidRequest: UpdateRecordsRequestUpsert<{ name: string }> = {
                method: UpdateType.PARTIAL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: tooManyRecords,
                performUpsert: {
                    fieldsToMergeOn: ['name'],
                },
            };

            await updateRecords(client, invalidRequest)
                .then(() => {
                    expectToFail('Expected an error to be thrown');
                })
                .catch((error: Error) => {
                    expect(error.message).toContain('Array must contain at most 10 element(s)');
                });
        });

        it('should throw an error if fieldsToMergeOn is empty', async ({ client }) => {
            const invalidRequest = {
                method: UpdateType.PARTIAL,
                baseId: 'app123',
                tableIdOrName: 'table1',
                records: asNonEmptyArray([{ fields: { name: 'Test' } }]),
                performUpsert: {
                    fieldsToMergeOn: [],
                },
            } as unknown as UpdateRecordsRequestUpsert<{ name: string }>;

            await updateRecords(client, invalidRequest)
                .then(() => {
                    expectToFail('Expected an error to be thrown');
                })
                .catch((error: Error) => {
                    expect(error.message).toContain('Array must contain at least 1 element(s)');
                });
        });
    });

    it('should throw an error if validation fails', ({ client }) => {
        const invalidRequest = {
            baseId: 'app123',
            // Missing tableIdOrName and method
            records: [],
        } as unknown as UpdateRecordsRequest<{ name: string }>;

        expect(() => updateRecords(client, invalidRequest)).toThrowError();
    });
});
