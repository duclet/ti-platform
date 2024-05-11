import type { AirtableClient } from '@src/client';
import type { BaseAndTablePathParams } from '@src/records/shared';
import { SCHEMA_BASE_AND_TABLE_PATH_PARAMS, SCHEMA_INDIVIDUAL_RECORD } from '@src/records/shared';
import { array, boolean, object } from 'zod';

const SCHEMA_DELETE_RECORDS_QUERYSTRING_PARAMS = object({
    records: array(SCHEMA_INDIVIDUAL_RECORD.shape.id).nonempty().max(10),
});

// const SCHEMA_DELETE_RECORDS_REQUEST = SCHEMA_BASE_AND_TABLE_PATH_PARAMS.merge(SCHEMA_DELETE_RECORDS_QUERYSTRING_PARAMS);

/**
 * Request data for deleting records.
 *
 * @interface
 */
export type DeleteRecordsRequest = {
    /** List of record IDs to delete. Maximum of 10. */
    records: Array<string>;
} & BaseAndTablePathParams;

const SCHEMA_DELETE_RECORDS_RESPONSE = object({
    records: array(
        object({
            id: SCHEMA_INDIVIDUAL_RECORD.shape.id,
            deleted: boolean(),
        })
    ),
});

/**
 * Response data after deleting records.
 *
 * @interface
 */
export type DeleteRecordsResponse = {
    /** List of records that has been deleted. */
    records: Array<{
        /** Identifier of record that was deleted. */
        id: string;
        /** True if record was deleted. */
        deleted: boolean;
    }>;
};

/** @internal */
export function deleteRecords(client: AirtableClient, request: DeleteRecordsRequest): Promise<DeleteRecordsResponse> {
    const { baseId, tableIdOrName } = SCHEMA_BASE_AND_TABLE_PATH_PARAMS.parse(request);
    return client.queueRequest(baseId, async ($fetch) =>
        SCHEMA_DELETE_RECORDS_RESPONSE.parse(
            await $fetch(`/${baseId}/${tableIdOrName}`, {
                method: 'DELETE',
                query: SCHEMA_DELETE_RECORDS_QUERYSTRING_PARAMS.parse(request),
            })
        )
    );
}
