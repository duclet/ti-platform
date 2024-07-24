import type { AirtableClient } from '@src/client';
import type {
    BaseTableAndRecordPathParams,
    CommonRequestParams,
    IndividualRecord,
    RecordFields,
} from '@src/records/shared';
import {
    SCHEMA_BASE_TABLE_AND_RECORD_PATH_PARAMS,
    SCHEMA_COMMON_REQUEST_PARAMS,
    SCHEMA_INDIVIDUAL_RECORD,
} from '@src/records/shared';

const SCHEMA_GET_RECORD_REQUEST_QUERYSTRING_PARAMS = SCHEMA_COMMON_REQUEST_PARAMS.pick({
    cellFormat: true,
    returnFieldsByFieldId: true,
    timeZone: true,
    userLocale: true,
});

/**
 * Request data for getting the details of a single record.
 *
 * @interface
 */
export type GetRecordRequest = BaseTableAndRecordPathParams &
    Pick<CommonRequestParams, 'cellFormat' | 'returnFieldsByFieldId' | 'timeZone' | 'userLocale'>;

/** @internal */
export function getRecord<Fields extends RecordFields>(
    client: AirtableClient,
    request: GetRecordRequest
): Promise<IndividualRecord<Fields>> {
    const { baseId, tableIdOrName, recordId } = SCHEMA_BASE_TABLE_AND_RECORD_PATH_PARAMS.parse(request);

    return client.queueRequest(
        baseId,
        async ($fetch) =>
            SCHEMA_INDIVIDUAL_RECORD.parse(
                await $fetch(`/${baseId}/${tableIdOrName}/${recordId}`, {
                    method: 'GET',
                    query: SCHEMA_GET_RECORD_REQUEST_QUERYSTRING_PARAMS.parse(request),
                })
            ) as IndividualRecord<Fields>
    );
}
