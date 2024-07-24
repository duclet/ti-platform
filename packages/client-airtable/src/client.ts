import { REQUESTS_PER_SECOND_PER_ACCESS_TOKEN, REQUESTS_PER_SECOND_PER_BASE } from '@src/constants';
import type { CreateRecordsRequest, CreateRecordsResponse } from '@src/records/create-records';
import { createRecords } from '@src/records/create-records';
import type { DeleteRecordsRequest, DeleteRecordsResponse } from '@src/records/delete-records';
import { deleteRecords } from '@src/records/delete-records';
import type { GetRecordRequest } from '@src/records/get-record';
import { getRecord } from '@src/records/get-record';
import type { ListRecordsRequest, ListRecordsResponse } from '@src/records/list-records';
import { listRecords } from '@src/records/list-records';
import type { IndividualRecord, RecordFields } from '@src/records/shared';
import type {
    UpdateRecordsRequest,
    UpdateRecordsRequestNonUpsert,
    UpdateRecordsRequestUpsert,
    UpdateRecordsResponse,
    UpdateRecordsResponseNonUpsert,
    UpdateRecordsResponseUpsert,
} from '@src/records/update-records';
import { updateRecords } from '@src/records/update-records';
import { Queue } from '@ti-platform/aide';
import defu from 'defu';
import type { $Fetch } from 'ofetch';
import { FetchOptions, ofetch } from 'ofetch';
import type { Simplify, StringKeyOf } from 'type-fest';

/**
 * Client for interacting with Airtable.
 *
 * This client will handle and throttle requests to ensure that users will not overstep the rate limits set by Airtable.
 */
export class AirtableClient {
    /**
     * The actual underlying client to talk with Airtable.
     */
    private readonly client: $Fetch;

    /**
     * Queue for all requests to ensure proper rate limiting are taken into consideration.
     */
    private readonly queueOverall: Queue<unknown>;

    /**
     * Queue for each base to ensure proper rate limiting per base are taken into consideration.
     */
    private readonly queuePerBase: Map<string, Queue<unknown>>;

    /**
     * Create a new instance.
     *
     * @param apiToken Token to use to interact with Airtable.
     * @param requestOptions Allows user to override configurations of the underlying `fetch` function.
     */
    public constructor(apiToken: string, requestOptions: Simplify<FetchOptions> = {}) {
        this.client = ofetch.create(
            defu(
                {
                    headers: {
                        'Authorization': `Bearer ${apiToken}`,
                        'Content-Type': 'application/json',
                    },
                },
                requestOptions,
                {
                    baseURL: 'https://api.airtable.com/v0/',
                }
            )
        );

        this.queueOverall = new Queue({
            maxConcurrent: REQUESTS_PER_SECOND_PER_ACCESS_TOKEN,
            maxPerInterval: REQUESTS_PER_SECOND_PER_ACCESS_TOKEN,
            intervalMs: 1000,
        });
        this.queuePerBase = new Map();
    }

    /**
     * Create new records.
     *
     * @typeParam RequestFields The fields to set when creating the records.
     * @typeParam ResponseFields The fields returned after creation, usually should just match the `RequestFields`.
     * @returns Refer to {@link CreateRecordsResponse}.
     */
    public createRecords<RequestFields extends RecordFields, ResponseFields extends RecordFields = RequestFields>(
        /** Refer to {@link CreateRecordsRequest}. */
        request: Simplify<CreateRecordsRequest<RequestFields>>
    ): Promise<Simplify<CreateRecordsResponse<ResponseFields>>> {
        return createRecords(this, request);
    }

    /**
     * Delete records.
     *
     * @returns Refer to {@link DeleteRecordsResponse}.
     */
    public deleteRecords(
        /** Refer to {@link DeleteRecordsRequest}. */
        request: Simplify<DeleteRecordsRequest>
    ): Promise<Simplify<DeleteRecordsResponse>> {
        return deleteRecords(this, request);
    }

    /**
     * Get a record.
     *
     * @returns Refer to {@link IndividualRecord}.
     */
    public getRecord<Fields extends RecordFields>(
        /** Refer to {@link GetRecordRequest}. */
        request: Simplify<GetRecordRequest>
    ): Promise<IndividualRecord<Fields>> {
        return getRecord(this, request);
    }

    /**
     * Search for records based on given criterias.
     *
     * @returns Refer to {@link ListRecordsResponse}.
     */
    public listRecords<Fields extends RecordFields>(
        /** Refer to {@link ListRecordsRequest}. */
        request: Simplify<ListRecordsRequest<StringKeyOf<Fields>>>
    ): Promise<Simplify<ListRecordsResponse<Fields>>> {
        return listRecords(this, request);
    }

    /**
     * Update records using provided data.
     *
     * @returns Refer to {@link UpdateRecordsResponseNonUpsert}.
     */
    public updateRecords<RequestFields extends RecordFields, ResponseFields extends RecordFields = RequestFields>(
        /** Refer to {@link UpdateRecordsRequestNonUpsert}. */
        request: Simplify<UpdateRecordsRequestNonUpsert<RequestFields>>
    ): Promise<Simplify<UpdateRecordsResponseNonUpsert<ResponseFields>>>;
    /**
     * Upsert records using provided data.
     *
     * @returns Refer to {@link UpdateRecordsResponseUpsert}.
     */
    public updateRecords<RequestFields extends RecordFields, ResponseFields extends RecordFields = RequestFields>(
        /** Refer to {@link UpdateRecordsRequestUpsert}. */
        request: Simplify<UpdateRecordsRequestUpsert<RequestFields>>
    ): Promise<Simplify<UpdateRecordsResponseUpsert<ResponseFields>>>;
    /** @internal */
    public updateRecords<RequestFields extends RecordFields, ResponseFields extends RecordFields = RequestFields>(
        request: UpdateRecordsRequest<RequestFields>
    ): Promise<UpdateRecordsResponse<ResponseFields>> {
        return updateRecords(this, request);
    }

    /**
     * Queue the handler to ensure proper rate limiting of both the global limits and the per base limits.
     *
     * @internal
     * @param baseId Identifier for the base.
     * @param handler Handler to make the request.
     */
    public queueRequest<R>(baseId: string, handler: ($fetch: $Fetch) => Promise<R>): Promise<R> {
        return this.queueOverall.add(() => this.getQueueForBase(baseId).add(() => handler(this.client)).onEnd)
            .onEnd as Promise<R>;
    }

    private getQueueForBase(baseId: string): Queue<unknown> {
        let queue = this.queuePerBase.get(baseId);
        if (queue === undefined) {
            queue = new Queue({
                maxConcurrent: REQUESTS_PER_SECOND_PER_BASE,
                maxPerInterval: REQUESTS_PER_SECOND_PER_BASE,
                intervalMs: 1000,
            });

            this.queuePerBase.set(baseId, queue);
        }

        return queue;
    }
}
