import type { AirtableClient } from '@src/client';
import type {
    BaseAndTablePathParams,
    CommonRequestParams,
    IndividualRecord,
    RecordFields,
    RequestMethod,
} from '@src/records/shared';
import {
    SCHEMA_BASE_AND_TABLE_PATH_PARAMS,
    SCHEMA_COMMON_REQUEST_PARAMS,
    SCHEMA_INDIVIDUAL_RECORD,
    SCHEMA_RECORD_FIELDS,
    SCHEMA_REQUEST_METHOD,
} from '@src/records/shared';
import type { NonEmptyArray } from '@ti-platform/aide';
import { array, object, string } from 'zod';

const SCHEMA_UPDATE_RECORDS_REQUEST_NON_UPSERT_BODY_PARAMS = object({
    records: array(
        object({
            id: string(),
            fields: SCHEMA_RECORD_FIELDS,
        })
    )
        .nonempty()
        .max(10),
    returnFieldsByFieldId: SCHEMA_COMMON_REQUEST_PARAMS.shape.returnFieldsByFieldId,
    typecast: SCHEMA_COMMON_REQUEST_PARAMS.shape.typecast,
});

// const SCHEMA_UPDATE_RECORDS_REQUEST_NON_UPSERT = SCHEMA_REQUEST_METHOD.merge(SCHEMA_BASE_AND_TABLE_PATH_PARAMS).merge(
//     SCHEMA_UPDATE_RECORDS_REQUEST_NON_UPSERT_BODY_PARAMS
// );

/**
 * Request data for updating records.
 *
 * @interface
 */
export type UpdateRecordsRequestNonUpsert<Fields extends RecordFields> = {
    /** List of records to update. Max of 10. */
    records: NonEmptyArray<{
        /** Identifier for the record to update. */
        id: string;
        /** Fields to update */
        fields: Fields;
    }>;
} & RequestMethod &
    BaseAndTablePathParams &
    Pick<CommonRequestParams, 'returnFieldsByFieldId' | 'typecast'>;

const SCHEMA_UPDATE_RECORDS_REQUEST_UPSERT_BODY_PARAMS = SCHEMA_UPDATE_RECORDS_REQUEST_NON_UPSERT_BODY_PARAMS.extend({
    records: array(
        object({
            fields: SCHEMA_RECORD_FIELDS,
        })
    )
        .nonempty()
        .max(10),
    performUpsert: object({
        fieldsToMergeOn: array(string()).nonempty(),
    }),
});

// const SCHEMA_UPDATE_RECORDS_REQUEST_UPSERT = SCHEMA_REQUEST_METHOD.merge(SCHEMA_BASE_AND_TABLE_PATH_PARAMS).merge(
//     SCHEMA_UPDATE_RECORDS_REQUEST_UPSERT_BODY_PARAMS
// );

/**
 * Request data for upserting records.
 *
 * @interface
 */
export type UpdateRecordsRequestUpsert<Fields extends RecordFields> = {
    /**
     * Enables upsert behavior when set.
     *
     * `fieldsToMergeOn` will be used as an external ID to match records for updates. For records where no match is
     * found, a new Airtable record will be created.
     */
    performUpsert: {
        /**
         * An array with at least one and at most three field names or IDs. IDs must uniquely identify a single
         * record. These cannot be computed fields (formulas, lookups, rollups), and must be one of the following
         * types: number, text, long text, single select, multiple select, date.
         */
        fieldsToMergeOn: Array<string>;
    };

    /** List of records to update. Max of 10. */
    records: NonEmptyArray<{
        /** Fields to update */
        fields: Fields;
    }>;
} & RequestMethod &
    BaseAndTablePathParams &
    Pick<CommonRequestParams, 'returnFieldsByFieldId' | 'typecast'>;

const SCHEMA_UPDATE_RECORDS_REQUEST_BODY_PARAMS = SCHEMA_UPDATE_RECORDS_REQUEST_NON_UPSERT_BODY_PARAMS.or(
    SCHEMA_UPDATE_RECORDS_REQUEST_UPSERT_BODY_PARAMS
);

/** @internal */
export type UpdateRecordsRequest<Fields extends RecordFields> =
    | UpdateRecordsRequestNonUpsert<Fields>
    | UpdateRecordsRequestUpsert<Fields>;

const SCHEMA_UPDATE_RECORDS_RESPONSE_NON_UPSERT = object({
    records: array(SCHEMA_INDIVIDUAL_RECORD),
});

/**
 * Response data for updating records.
 *
 * @interface
 */
export type UpdateRecordsResponseNonUpsert<Fields extends RecordFields> = {
    /** Refer to {@link IndividualRecord}. */
    records: Array<IndividualRecord<Fields>>;
};

const SCHEMA_UPDATE_RECORDS_RESPONSE_UPSERT = SCHEMA_UPDATE_RECORDS_RESPONSE_NON_UPSERT.extend({
    createdRecords: array(string()),
    updatedRecords: array(string()),
});

/**
 * Response data for upserting records.
 *
 * @interface
 */
export type UpdateRecordsResponseUpsert<Fields extends RecordFields> = {
    /** List of identifiers for records that were created. */
    createdRecords: Array<string>;

    /** List of identifiers for records that were updated. */
    updatedRecords: Array<string>;
} & UpdateRecordsResponseNonUpsert<Fields>;

const SCHEMA_UPDATE_RECORDS_RESPONSE = SCHEMA_UPDATE_RECORDS_RESPONSE_NON_UPSERT.or(
    SCHEMA_UPDATE_RECORDS_RESPONSE_UPSERT
);

/** @internal */
export type UpdateRecordsResponse<Fields extends RecordFields> =
    | UpdateRecordsResponseNonUpsert<Fields>
    | UpdateRecordsResponseUpsert<Fields>;

/** @internal */
// export function updateRecords<
//     RequestFields extends NonEmptyObject<RecordFields>,
//     ResponseFields extends NonEmptyObject<RecordFields> = RequestFields,
// >(
//     client: AirtableClient,
//     request: UpdateRecordsRequestNonUpsert<RequestFields>
// ): Promise<UpdateRecordsResponseNonUpsert<ResponseFields>>;
// /** @internal */
// export function updateRecords<
//     RequestFields extends NonEmptyObject<RecordFields>,
//     ResponseFields extends NonEmptyObject<RecordFields> = RequestFields,
// >(
//     client: AirtableClient,
//     request: UpdateRecordsRequestUpsert<RequestFields>
// ): Promise<UpdateRecordsResponseUpsert<ResponseFields>>;
/** @internal */
export function updateRecords<RequestFields extends RecordFields, ResponseFields extends RecordFields = RequestFields>(
    client: AirtableClient,
    request: UpdateRecordsRequest<RequestFields>
): Promise<UpdateRecordsResponse<ResponseFields>> {
    const { baseId, tableIdOrName } = SCHEMA_BASE_AND_TABLE_PATH_PARAMS.parse(request);

    return client.queueRequest(
        baseId,
        async ($fetch) =>
            SCHEMA_UPDATE_RECORDS_RESPONSE.parse(
                await $fetch(`/${baseId}/${tableIdOrName}`, {
                    method: SCHEMA_REQUEST_METHOD.parse(request).method,
                    body: SCHEMA_UPDATE_RECORDS_REQUEST_BODY_PARAMS.parse(request),
                })
            ) as UpdateRecordsResponse<ResponseFields>
    );
}
