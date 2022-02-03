# @ti-platform/aide

## Table of contents

### Functions

- [first](modules.md#first)
- [keepOnlyDefined](modules.md#keeponlydefined)

## Functions

### first

▸ **first**<`T`\>(`list`): `undefined` \| `T`

Retrieve the first element of a list.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | readonly `T`[] | The list to retrieve the first element for. |

#### Returns

`undefined` \| `T`

#### Defined in

arrays.ts:7

___

### keepOnlyDefined

▸ **keepOnlyDefined**<`T`\>(`list`): `NonNullable`<`T`\>[]

Given a list of items, remove null and undefined from the list.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | readonly `T`[] | The list of items to traverse and filter. |

#### Returns

`NonNullable`<`T`\>[]

#### Defined in

arrays.ts:17
