import { Ref } from 'vue';

type ValueTypes = string | number | Array<string> | Array<number>;

const DEFAULT_REQUIRED_INVALID_MESSAGE = 'Requires non-empty value';
const DEFAULT_UNIQUE_INVALID_MESSAGE = 'Value already used';

/**
 * Given a field, make sure it is not empty. If it is, return a proper error message. This validator is meant to be used
 * with QForm.
 *
 * @param invalidMessage
 *  The message to show when validation failed.
 */
export function isRequiredField(invalidMessage = DEFAULT_REQUIRED_INVALID_MESSAGE) {
    return (value: ValueTypes) => ((Array.isArray(value) && value.length < 1) || !value ? invalidMessage : true);
}

/**
 * Returns a function that before checking to see if a required field is filled out, validate against some other
 * condition.
 *
 * @param when
 *  Function to execute to see if the required validation field is necessary. It should return true when the field is
 *  required, false otherwise.
 * @param invalidMessage
 *  The message to show when validation failed.
 */
export function isRequiredFieldWhen(when: () => boolean, invalidMessage = DEFAULT_REQUIRED_INVALID_MESSAGE) {
    const isRequiredFieldWithMessage = isRequiredField(invalidMessage);

    return (value: ValueTypes) => (when() ? isRequiredFieldWithMessage(value) : true);
}

/**
 * Given a reference to a list of values, check when a value is given that it isn't in the list twice.
 *
 * @param existingValues
 *  A reference to the list of existing values. The list should update when new values are added.
 * @param invalidMessage
 *  The message to show when validation failed.
 */
export function isUniqueField(
    existingValues: Ref<Array<string | number>>,
    invalidMessage = DEFAULT_UNIQUE_INVALID_MESSAGE
) {
    return (value: string | number) =>
        existingValues.value.filter((existingValue) => existingValue === value).length > 1 ? invalidMessage : true;
}
