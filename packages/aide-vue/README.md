# @ti-platform/aide-vue

This package contains utility functions that can be used with Vue to enhance the development of Vue components.

## API Docs

### Type Aliases

- [ElementOrComponentWithEl](README.md#elementorcomponentwithel)
- [HeightCalcResult](README.md#heightcalcresult)
- [RecomputableRef](README.md#recomputableref)
- [ValueTypes](README.md#valuetypes)

### Functions

- [isRequiredField](README.md#isrequiredfield)
- [isRequiredFieldWhen](README.md#isrequiredfieldwhen)
- [isUniqueField](README.md#isuniquefield)
- [useHeightCalc](README.md#useheightcalc)

## Type Aliases

### ElementOrComponentWithEl

Ƭ **ElementOrComponentWithEl**: `HTMLElement` \| { `$el`: `HTMLElement`  }

#### Defined in

dom.ts:3

___

### HeightCalcResult

Ƭ **HeightCalcResult**: [`RecomputableRef`](README.md#recomputableref)<`string`\>

#### Defined in

dom.ts:5

___

### RecomputableRef

Ƭ **RecomputableRef**<`T`\>: `ComputedRef`<`T`\> & { `recompute`: () => `void`  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

dom.ts:4

___

### ValueTypes

Ƭ **ValueTypes**: `string` \| `number` \| `string`[] \| `number`[]

#### Defined in

validators.ts:3

## Functions

### isRequiredField

▸ **isRequiredField**(`invalidMessage?`): (`value`: [`ValueTypes`](README.md#valuetypes)) => `string` \| ``true``

Given a field, make sure it is not empty. If it is, return a proper error message. This validator is meant to be used
with QForm.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `invalidMessage` | `string` | `DEFAULT_REQUIRED_INVALID_MESSAGE` | The message to show when validation failed. |

#### Returns

`fn`

▸ (`value`): `string` \| ``true``

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ValueTypes`](README.md#valuetypes) |

##### Returns

`string` \| ``true``

#### Defined in

validators.ts:15

___

### isRequiredFieldWhen

▸ **isRequiredFieldWhen**(`when`, `invalidMessage?`): (`value`: [`ValueTypes`](README.md#valuetypes)) => `string` \| ``true``

Returns a function that before checking to see if a required field is filled out, validate against some other
condition.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `when` | () => `boolean` | `undefined` | Function to execute to see if the required validation field is necessary. It should return true when the field is  required, false otherwise. |
| `invalidMessage` | `string` | `DEFAULT_REQUIRED_INVALID_MESSAGE` | The message to show when validation failed. |

#### Returns

`fn`

▸ (`value`): `string` \| ``true``

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ValueTypes`](README.md#valuetypes) |

##### Returns

`string` \| ``true``

#### Defined in

validators.ts:29

___

### isUniqueField

▸ **isUniqueField**(`existingValues`, `invalidMessage?`): (`value`: `string` \| `number`) => `string` \| ``true``

Given a reference to a list of values, check when a value is given that it isn't in the list twice.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `existingValues` | `Ref`<(`string` \| `number`)[]\> | `undefined` | A reference to the list of existing values. The list should update when new values are added. |
| `invalidMessage` | `string` | `DEFAULT_UNIQUE_INVALID_MESSAGE` | The message to show when validation failed. |

#### Returns

`fn`

▸ (`value`): `string` \| ``true``

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |

##### Returns

`string` \| ``true``

#### Defined in

validators.ts:43

___

### useHeightCalc

▸ **useHeightCalc**(`baseHeight`, `elements`): [`HeightCalcResult`](README.md#heightcalcresult)

In cases where we have an element where any of the height CSS styles is using the "calc" function, we may want to
subtract from a base height the current height of some elements, this function allows for that.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseHeight` | `string` | The base height to essentially subtract from. Ex: 90vh, 800px, 100% |
| `elements` | `Ref`<[`ElementOrComponentWithEl`](README.md#elementorcomponentwithel)\>[] | The list of elements or components with a singular root element whose height we will subtract from. |

#### Returns

[`HeightCalcResult`](README.md#heightcalcresult)

#### Defined in

dom.ts:16
