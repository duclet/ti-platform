import type { AirtableClient } from '@src/client';
import type { BaseAndTablePathParams, CommonRequestParams, IndividualRecord, RecordFields } from '@src/records/shared';
import {
    SCHEMA_BASE_AND_TABLE_PATH_PARAMS,
    SCHEMA_COMMON_REQUEST_PARAMS,
    SCHEMA_INDIVIDUAL_RECORD,
    SCHEMA_RECORD_FIELDS,
} from '@src/records/shared';
import type { NonEmptyArray } from '@ti-platform/aide';
import type { Simplify } from 'type-fest';
import { array, object } from 'zod';

const SCHEMA_CREATE_RECORDS_BODY_PARAMS = object({
    records: array(object({ fields: SCHEMA_RECORD_FIELDS }))
        .nonempty()
        .max(10),
    returnFieldsByFieldId: SCHEMA_COMMON_REQUEST_PARAMS.shape.returnFieldsByFieldId,
    typecast: SCHEMA_COMMON_REQUEST_PARAMS.shape.typecast,
});

// const SCHEMA_CREATE_RECORDS_REQUEST = SCHEMA_BASE_AND_TABLE_PATH_PARAMS.merge(SCHEMA_CREATE_RECORDS_BODY_PARAMS);

/**
 * Request data for creating records.
 *
 * @interface
 */
export type CreateRecordsRequest<Fields extends RecordFields> = {
    /** Records to create. Maximum of 10. */
    records: NonEmptyArray<Fields>;
} & BaseAndTablePathParams &
    Pick<CommonRequestParams, 'returnFieldsByFieldId' | 'typecast'>;

const SCHEMA_CREATE_RECORDS_RESPONSE = object({
    records: array(SCHEMA_INDIVIDUAL_RECORD),
});

/**
 * Response for endpoint that create records.
 *
 * @interface
 */
export type CreateRecordsResponse<Fields extends RecordFields> = {
    /** The records that were created. Refer to {@link IndividualRecord}. */
    records: Array<Simplify<IndividualRecord<Fields>>>;
};

/** @internal */
export function createRecords<RequestFields extends RecordFields, ResponseFields extends RecordFields = RequestFields>(
    client: AirtableClient,
    request: CreateRecordsRequest<RequestFields>
): Promise<CreateRecordsResponse<ResponseFields>> {
    const { baseId, tableIdOrName } = SCHEMA_BASE_AND_TABLE_PATH_PARAMS.parse(request);
    return client.queueRequest(
        baseId,
        async ($fetch) =>
            SCHEMA_CREATE_RECORDS_RESPONSE.parse(
                await $fetch(`/${baseId}/${tableIdOrName}`, {
                    method: 'POST',
                    body: SCHEMA_CREATE_RECORDS_BODY_PARAMS.parse(request),
                })
            ) as CreateRecordsResponse<ResponseFields>
    );
}
