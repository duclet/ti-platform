# @ti-platform/aide-vue

This package contains utility functions that can be used with Vue to enhance the development of Vue components.

# Contents

* [API Docs](#api-docs)
  * [Type Aliases](#type-aliases)
    * [ReactiveExecuteTasksRet\<T>](#reactiveexecutetasksrett)
    * [ValueTypes](#valuetypes)
  * [Functions](#functions)
    * [asComputed()](#ascomputed)
    * [isRequiredField()](#isrequiredfield)
    * [isRequiredFieldWhen()](#isrequiredfieldwhen)
    * [isUniqueField()](#isuniquefield)
    * [reactiveExecuteTasks()](#reactiveexecutetasks)

# API Docs

## Type Aliases

### ReactiveExecuteTasksRet\<T>

> **ReactiveExecuteTasksRet**<`T`>: `Object`

The return value for the function [reactiveExecuteTasks](README.md#reactiveexecutetasks).

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `T` | The type of the result. |

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `activeWorkers` | `Readonly`<`Ref`<`number`>> | The current active number of workers. |
| `completedTasks` | `Readonly`<`Ref`<`number`>> | The current number of completed tasks. |
| `isAllTasksCompleted` | `Readonly`<`Ref`<`boolean`>> | True if all the tasks have completed running, false otherwise. |
| `results` | `Readonly`<`Ref`<`T`\[]>> | The array storing the results as it is returned. Note that this can be a sparsed array with missing indexes as it<br />is filled with the results only when it is available. You should check for undefined before using it. |
| `totalTasks` | `Readonly`<`Ref`<`number`>> | The total number of tasks that was queued. |

#### Source

queue.ts:10

***

### ValueTypes

> **ValueTypes**: `string` | `number` | `string`\[] | `number`\[]

#### Source

validators.ts:3

## Functions

### asComputed()

> **asComputed**<`T`>(`ref`): `ComputedRef`<`T`>

Shorthand method to simply convert a Ref to a ComputedRef.

#### Type parameters

| Type parameter |
| :------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `ref` | `Ref`<`T`> | The Ref to convert. |

#### Returns

`ComputedRef`<`T`>

The ComputedRef that simply returns the value of the given Ref.

#### Source

reactivity.ts:10

***

### isRequiredField()

> **isRequiredField**(`invalidMessage`): (`value`) => `string` | `true`

Given a field, make sure it is not empty. If it is, return a proper error message. This validator is meant to be used
with QForm.

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `invalidMessage` | `string` | `DEFAULT_REQUIRED_INVALID_MESSAGE` | The message to show when validation failed. |

#### Returns

`Function`

> ##### Parameters
>
> | Parameter | Type |
> | :------ | :------ |
> | `value` | [`ValueTypes`](README.md#valuetypes) |
>
> ##### Returns
>
> `string` | `true`

#### Source

validators.ts:14

***

### isRequiredFieldWhen()

> **isRequiredFieldWhen**(`when`, `invalidMessage`): (`value`) => `string` | `true`

Returns a function that before checking to see if a required field is filled out, validate against some other
condition.

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `when` | () => `boolean` | `undefined` | Function to execute to see if the required validation field is necessary. It should return true when the<br /> field is required, false otherwise. |
| `invalidMessage` | `string` | `DEFAULT_REQUIRED_INVALID_MESSAGE` | The message to show when validation failed. |

#### Returns

`Function`

> ##### Parameters
>
> | Parameter | Type |
> | :------ | :------ |
> | `value` | [`ValueTypes`](README.md#valuetypes) |
>
> ##### Returns
>
> `string` | `true`

#### Source

validators.ts:26

***

### isUniqueField()

> **isUniqueField**(`existingValues`, `invalidMessage`): (`value`) => `string` | `true`

Given a reference to a list of values, check when a value is given that it isn't in the list twice.

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `existingValues` | `Ref`<(`string` | `number`)\[]> | `undefined` | A reference to the list of existing values. The list should update when new values are added. |
| `invalidMessage` | `string` | `DEFAULT_UNIQUE_INVALID_MESSAGE` | The message to show when validation failed. |

#### Returns

`Function`

> ##### Parameters
>
> | Parameter | Type |
> | :------ | :------ |
> | `value` | `string` | `number` |
>
> ##### Returns
>
> `string` | `true`

#### Source

validators.ts:38

***

### reactiveExecuteTasks()

> **reactiveExecuteTasks**<`T`>(`tasks`, `maxNumOfWorkers`): [`ReactiveExecuteTasksRet`](README.md#reactiveexecutetasksrett)<`T`>

Reactive version of @ti-platform/aide#executeTasks.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `T` | The type of the result of each task. |

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tasks` | readonly () => `Promise`<`T`>\[] | `undefined` | The tasks to run. |
| `maxNumOfWorkers` | `number` | `10` | The maximum number of tasks ot run at once. |

#### Returns

[`ReactiveExecuteTasksRet`](README.md#reactiveexecutetasksrett)<`T`>

#### Source

queue.ts:45
