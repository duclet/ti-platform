/**
 * The maximum number of records that can be updated per batch request.
 *
 * @see https://airtable.com/developers/web/api/update-multiple-records
 * @see https://airtable.com/developers/web/api/create-records
 * @see https://airtable.com/developers/web/api/delete-multiple-records
 */
export const MAXIMUM_RECORDS_PER_BATCH = 10;

/**
 * The maximum number of requests per second per base.
 *
 * @see https://airtable.com/developers/web/api/rate-limits
 */
export const REQUESTS_PER_SECOND_PER_BASE = 5;

/**
 * The maximum number of requests per second per access token.
 *
 * @see https://airtable.com/developers/web/api/rate-limits
 */
export const REQUESTS_PER_SECOND_PER_ACCESS_TOKEN = 50;
