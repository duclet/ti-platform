import type { AirtableClient } from '@src/client';
import { Direction } from '@src/enums';
import type {
    BaseAndTablePathParams,
    CommonRequestParams,
    IndividualRecord,
    RecordFields,
    UnionToTuple,
} from '@src/records/shared';
import {
    SCHEMA_BASE_AND_TABLE_PATH_PARAMS,
    SCHEMA_COMMON_REQUEST_PARAMS,
    SCHEMA_INDIVIDUAL_RECORD,
    SCHEMA_RECORD_FIELDS,
} from '@src/records/shared';
import type { StringKeyOf } from 'type-fest';
import { array, literal, nativeEnum, number, object, string } from 'zod';

const SCHEMA_LIST_RECORDS_REQUEST_QUERYSTRING_PARAMS = object({
    cellFormat: SCHEMA_COMMON_REQUEST_PARAMS.shape.cellFormat,
    fields: array(SCHEMA_RECORD_FIELDS.innerType().keySchema).optional(),
    filterByFormula: string().optional(),
    maxRecords: number().positive().optional(),
    offset: string().optional(),
    pageSize: number().min(1).max(100).default(100).optional(),
    recordMetadata: array(literal('commentCount')).optional(),
    returnFieldsByFieldId: SCHEMA_COMMON_REQUEST_PARAMS.shape.returnFieldsByFieldId,
    sort: array(
        object({
            field: string(),
            direction: nativeEnum(Direction).default(Direction.ASC),
        })
    ).optional(),
    timeZone: SCHEMA_COMMON_REQUEST_PARAMS.shape.timeZone,
    userLocale: SCHEMA_COMMON_REQUEST_PARAMS.shape.userLocale,
    view: string().optional(),
});

/**
 * Data for fetching the list of records.
 *
 * @interface
 * @typeParam Fields Name of fields to include in resulting data.
 */
export type ListRecordsRequest<Fields extends string> = {
    /**
     * Only data for fields whose names or IDs are in this list will be included in the result. If you don't need
     * every field, you can use this parameter to reduce the amount of data transferred.
     *
     * Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may
     * cause your requests to exceed this limit.
     */
    fields?: UnionToTuple<Fields>;

    /**
     * A formula used to filter records. The formula will be evaluated for each record, and if the result is not
     * `0`, `false`, ``, `NaN`, `[]`, or `#Error!` the record will be included in the response. We recommend testing
     * your formula in the Formula field UI before using it in your API request.
     *
     * If combined with the `view` parameter, only records in that view which satisfy the formula will be returned.
     *
     * Formulas can use field names, or field id's inside of the formula.
     *
     * Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may
     * cause your requests to exceed this limit.
     */
    filterByFormula?: string;

    /**
     * The maximum total number of records that will be returned in your requests. If this value is larger than
     * `pageSize` (which is 100 by default), you may have to load multiple pages to reach this total.
     */
    maxRecords?: number;

    /**
     * To fetch the next page of records, include offset from the previous request in the next request's parameters.
     */
    offset?: string;

    /**
     * The number of records returned in each request. Must be less than or equal to 100. Default is 100.
     */
    pageSize?: number;

    /**
     * An optional field that, if specified, includes commentCount on each record returned.
     */
    recordMetadata?: Array<'commentCount'>;

    /**
     * A list of sort objects that specifies how the records will be ordered. Each sort object must have a field key
     * specifying the name of the field to sort on, and an optional direction key that is either `asc` or `desc`.
     * The default direction is `asc`.
     *
     * The sort parameter overrides the sorting of the view specified in the view parameter. If neither the sort nor
     * the view parameter is included, the order of records is arbitrary.
     */
    sort?: Array<{
        field: string;
        direction?: Direction;
    }>;

    /**
     * The name or ID of a view in the table. If set, only the records in that view will be returned. The records
     * will be sorted according to the order of the view unless the `sort` parameter is included, which overrides
     * that order. Fields hidden in this view will be returned in the results. To only return a subset of fields,
     * use the `fields` parameter.
     */
    view?: string;
} & BaseAndTablePathParams &
    Pick<CommonRequestParams, 'cellFormat' | 'returnFieldsByFieldId' | 'timeZone' | 'typecast' | 'userLocale'>;

const SCHEMA_LIST_RECORDS_RESPONSE = object({
    offset: string().optional(),
    records: array(
        SCHEMA_INDIVIDUAL_RECORD.extend({
            commentCount: number().optional(),
        })
    ),
});

/**
 * Response data for the records that were requested.
 *
 * @interface
 * @typeParam Fields Mapping of fields to return to their type.
 */
export type ListRecordsResponse<Fields extends RecordFields> = {
    /**
     * If there are more records, the response will contain an offset. Pass this offset into the next request to fetch
     * the next page of records.
     */
    offset?: string;

    /** Refer to {@link IndividualRecord}. */
    records: Array<
        IndividualRecord<Fields> & {
            /**
             * The number of comments (if there are any) on the record.
             *
             * The recordMetadata query parameter must include "commentCount" in order to receive this.
             */
            commentCount?: number;
        }
    >;
};

/** @internal */
export function listRecords<Fields extends RecordFields>(
    client: AirtableClient,
    request: ListRecordsRequest<StringKeyOf<Fields>>
): Promise<ListRecordsResponse<Fields>> {
    const { baseId, tableIdOrName } = SCHEMA_BASE_AND_TABLE_PATH_PARAMS.parse(request);
    return client.queueRequest(
        baseId,
        async ($fetch) =>
            SCHEMA_LIST_RECORDS_RESPONSE.parse(
                await $fetch(`/${baseId}/${tableIdOrName}`, {
                    method: 'GET',
                    query: SCHEMA_LIST_RECORDS_REQUEST_QUERYSTRING_PARAMS.parse(request),
                })
            ) as ListRecordsResponse<Fields>
    );
}
