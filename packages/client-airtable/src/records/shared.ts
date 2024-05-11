import { CellFormat, Timezone, UpdateType, UserLocale } from '@src/enums';
import type { NonEmptyObject } from 'type-fest';
import { boolean, date, nativeEnum, object, record, string, unknown } from 'zod';

/** @internal */
export const SCHEMA_RECORD_FIELDS = record(string(), unknown()).refine((val) => Object.keys(val).length > 0, {
    message: 'At least 1 field must be specified',
});

/**
 * The fields of a record.
 */
export type RecordFields = NonEmptyObject<Record<string, unknown>>;

/** @internal */
export const SCHEMA_COMMON_REQUEST_PARAMS = object({
    cellFormat: nativeEnum(CellFormat).default(CellFormat.JSON).optional(),
    returnFieldsByFieldId: boolean().default(false).optional(),
    timeZone: nativeEnum(Timezone).optional(),
    typecast: boolean().default(false).optional(),
    userLocale: nativeEnum(UserLocale).optional(),
});

/** @internal */
export type CommonRequestParams = {
    /**
     * The format that should be used for cell values. Defaults to {@link CellFormat.JSON}.
     */
    cellFormat?: CellFormat;

    /**
     * An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which
     * returns field objects where the key is the field name.
     */
    returnFieldsByFieldId?: boolean;

    /**
     * The time zone that should be used to format dates when using `string` as the `cellFormat`. This parameter is
     * required when using `string` as the `cellFormat`.
     */
    timeZone?: Timezone;

    /**
     * The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter
     * is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for
     * integrating with 3rd party data sources.
     */
    typecast?: boolean;

    /**
     * The user locale that should be used to format dates when using `string` as the `cellFormat`. This parameter
     * is required when using `string` as the `cellFormat`.
     */
    userLocale?: UserLocale;
};

/** @internal */
export const SCHEMA_REQUEST_METHOD = object({
    method: nativeEnum(UpdateType),
});

/** @internal */
export type RequestMethod = {
    /** Method to use when updating data. */
    method: UpdateType;
};

/** @internal */
export const SCHEMA_BASE_AND_TABLE_PATH_PARAMS = object({
    baseId: string(),
    tableIdOrName: string(),
});

/** @internal */
export type BaseAndTablePathParams = {
    /** Identifier for the base. */
    baseId: string;

    /** Identifier or name for the table. Preference is to use the ID which is unchanging. */
    tableIdOrName: string;
};

/** @internal */
export const SCHEMA_BASE_TABLE_AND_RECORD_PATH_PARAMS = SCHEMA_BASE_AND_TABLE_PATH_PARAMS.extend({
    recordId: string(),
});

/** @internal */
export type BaseTableAndRecordPathParams = BaseAndTablePathParams & {
    /** Identifier for the record. */
    recordId: string;
};

/** @internal */
export const SCHEMA_INDIVIDUAL_RECORD = object({
    id: string(),
    createdTime: date({ coerce: true }),
    fields: SCHEMA_RECORD_FIELDS,
});

/**
 * An individual record.
 *
 * @interface
 */
export type IndividualRecord<Fields extends RecordFields> = {
    /** Identifier for the record. */
    id: string;

    /** Date and time of when the record was created. */
    createdTime: Date;

    /** Fields of the records. */
    fields: Fields;
};

/** @internal */
export type UnionToTuple<U extends string, R extends Array<unknown> = []> = {
    [S in U]: Exclude<U, S> extends never ? [...R, S] : UnionToTuple<Exclude<U, S>, [...R, S]>;
}[U];
