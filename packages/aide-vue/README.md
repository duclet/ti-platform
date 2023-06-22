# @ti-platform/aide-vue

This package contains utility functions that can be used with Vue to enhance the development of Vue components.

## API Docs

### Type Aliases

- [ReactiveExecuteTasksRet](README.md#reactiveexecutetasksret)
- [ValueTypes](README.md#valuetypes)

### Functions

- [asComputed](README.md#ascomputed)
- [isRequiredField](README.md#isrequiredfield)
- [isRequiredFieldWhen](README.md#isrequiredfieldwhen)
- [isUniqueField](README.md#isuniquefield)
- [reactiveExecuteTasks](README.md#reactiveexecutetasks)

## Type Aliases

### ReactiveExecuteTasksRet

Ƭ **ReactiveExecuteTasksRet**<`T`\>: `Object`

The return value for the function [reactiveExecuteTasks](README.md#reactiveexecutetasks).

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the result. |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `activeWorkers` | `Readonly`<`Ref`<`number`\>\> | The current active number of workers. |
| `completedTasks` | `Readonly`<`Ref`<`number`\>\> | The current number of completed tasks. |
| `isAllTasksCompleted` | `Readonly`<`Ref`<`boolean`\>\> | True if all the tasks have completed running, false otherwise. |
| `results` | `Readonly`<`Ref`<`T`[]\>\> | The array storing the results as it is returned. Note that this can be a sparsed array with missing indexes as it is filled with the results only when it is available. You should check for undefined before using it. |
| `totalTasks` | `Readonly`<`Ref`<`number`\>\> | The total number of tasks that was queued. |

#### Defined in

queue.ts:9

___

### ValueTypes

Ƭ **ValueTypes**: `string` \| `number` \| `string`[] \| `number`[]

#### Defined in

validators.ts:3

## Functions

### asComputed

▸ **asComputed**<`T`\>(`ref`): `ComputedRef`<`T`\>

Shorthand method to simply convert a Ref to a ComputedRef.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ref` | `Ref`<`T`\> | The Ref to convert. |

#### Returns

`ComputedRef`<`T`\>

The ComputedRef that simply returns the value of the given Ref.

#### Defined in

reactivity.ts:11

___

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
| `when` | () => `boolean` | `undefined` | Function to execute to see if the required validation field is necessary. It should return true when the field is required, false otherwise. |
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

### reactiveExecuteTasks

▸ **reactiveExecuteTasks**<`T`\>(`tasks`, `maxNumOfWorkers?`): [`ReactiveExecuteTasksRet`](README.md#reactiveexecutetasksret)<`T`\>

Reactive version of [@ti-platform/aide#executeTasks](README.md).

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the result of each task. |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tasks` | readonly () => `Promise`<`T`\>[] | `undefined` | The tasks to run. |
| `maxNumOfWorkers` | `number` | `10` | The maximum number of tasks ot run at once. |

#### Returns

[`ReactiveExecuteTasksRet`](README.md#reactiveexecutetasksret)<`T`\>

#### Defined in

queue.ts:47
