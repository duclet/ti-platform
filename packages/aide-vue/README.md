# @ti-platform/aide-vue

This package contains utility functions that can be used with Vue to enhance the development of Vue components.

# Contents

* [API Docs](#api-docs)
  * [Type Aliases](#type-aliases)
    * [ReactiveExecuteTasksRet\<T>](#reactiveexecutetasksrett)
    * [ValueTypes](#valuetypes)
  * [Functions](#functions)
    * [asComputed()](#ascomputed)
    * [injectRefs()](#injectrefs)
    * [isRequiredField()](#isrequiredfield)
    * [isRequiredFieldWhen()](#isrequiredfieldwhen)
    * [isUniqueField()](#isuniquefield)
    * [provideAndReturnRefs()](#provideandreturnrefs)
    * [reactiveExecuteTasks()](#reactiveexecutetasks)

# API Docs

## Type Aliases

### ReactiveExecuteTasksRet\<T>

> **ReactiveExecuteTasksRet**<`T`>: {`activeWorkers`: `Readonly`<`Ref`<`number`>>;`completedTasks`: `Readonly`<`Ref`<`number`>>;`isAllTasksCompleted`: `Readonly`<`Ref`<`boolean`>>;`results`: `Readonly`<`Ref`<`T`\[]>>;`totalTasks`: `Readonly`<`Ref`<`number`>>; }

The return value for the function [reactiveExecuteTasks](README.md#reactiveexecutetasks).

#### Type Parameters

| Type Parameter | Description             |
| -------------- | ----------------------- |
| `T`            | The type of the result. |

#### Type declaration

| Name                  | Type                         | Description                                                                                                                                                                                                             |
| --------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeWorkers`       | `Readonly`<`Ref`<`number`>>  | The current active number of workers.                                                                                                                                                                                   |
| `completedTasks`      | `Readonly`<`Ref`<`number`>>  | The current number of completed tasks.                                                                                                                                                                                  |
| `isAllTasksCompleted` | `Readonly`<`Ref`<`boolean`>> | True if all the tasks have completed running, false otherwise.                                                                                                                                                          |
| `results`             | `Readonly`<`Ref`<`T`\[]>>    | The array storing the results as it is returned. Note that this can be a sparsed array with missing indexes as it is filled with the results only when it is available. You should check for undefined before using it. |
| `totalTasks`          | `Readonly`<`Ref`<`number`>>  | The total number of tasks that was queued.                                                                                                                                                                              |

#### Defined in

queue.ts:10

***

### ValueTypes

> **ValueTypes**: `string` | `number` | `string`\[] | `number`\[]

#### Defined in

validators.ts:3

## Functions

### asComputed()

> **asComputed**<`T`>(`ref`): `ComputedRef`<`T`>

Shorthand method to simply convert a Ref to a ComputedRef.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type       | Description         |
| --------- | ---------- | ------------------- |
| `ref`     | `Ref`<`T`> | The Ref to convert. |

#### Returns

`ComputedRef`<`T`>

The ComputedRef that simply returns the value of the given Ref.

#### Defined in

reactivity.ts:10

***

### injectRefs()

> **injectRefs**<`T`>(`key`): `ToRefs`<`NonNullable`<`T`>>

Inject the data from the provided key (we are assuming the data exists) but return the results as refs.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type                | Description                             |
| --------- | ------------------- | --------------------------------------- |
| `key`     | `InjectionKey`<`T`> | The key to retrieve the data to inject. |

#### Returns

`ToRefs`<`NonNullable`<`T`>>

#### Defined in

reactivity.ts:20

***

### isRequiredField()

> **isRequiredField**(`invalidMessage`): (`value`) => `string` | `true`

Given a field, make sure it is not empty. If it is, return a proper error message. This validator is meant to be used
with QForm.

#### Parameters

| Parameter        | Type     | Default value                      | Description                                 |
| ---------------- | -------- | ---------------------------------- | ------------------------------------------- |
| `invalidMessage` | `string` | `DEFAULT_REQUIRED_INVALID_MESSAGE` | The message to show when validation failed. |

#### Returns

`Function`

##### Parameters

| Parameter | Type                                 |
| --------- | ------------------------------------ |
| `value`   | [`ValueTypes`](README.md#valuetypes) |

##### Returns

`string` | `true`

#### Defined in

validators.ts:14

***

### isRequiredFieldWhen()

> **isRequiredFieldWhen**(`when`, `invalidMessage`): (`value`) => `string` | `true`

Returns a function that before checking to see if a required field is filled out, validate against some other
condition.

#### Parameters

| Parameter        | Type            | Default value                      | Description                                                                                                                                  |
| ---------------- | --------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `when`           | () => `boolean` | `undefined`                        | Function to execute to see if the required validation field is necessary. It should return true when the field is required, false otherwise. |
| `invalidMessage` | `string`        | `DEFAULT_REQUIRED_INVALID_MESSAGE` | The message to show when validation failed.                                                                                                  |

#### Returns

`Function`

##### Parameters

| Parameter | Type                                 |
| --------- | ------------------------------------ |
| `value`   | [`ValueTypes`](README.md#valuetypes) |

##### Returns

`string` | `true`

#### Defined in

validators.ts:26

***

### isUniqueField()

> **isUniqueField**(`existingValues`, `invalidMessage`): (`value`) => `string` | `true`

Given a reference to a list of values, check when a value is given that it isn't in the list twice.

#### Parameters

| Parameter        | Type                             | Default value                    | Description                                                                                   |
| ---------------- | -------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| `existingValues` | `Ref`<(`string` \| `number`)\[]> | `undefined`                      | A reference to the list of existing values. The list should update when new values are added. |
| `invalidMessage` | `string`                         | `DEFAULT_UNIQUE_INVALID_MESSAGE` | The message to show when validation failed.                                                   |

#### Returns

`Function`

##### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `value`   | `string` \| `number` |

##### Returns

`string` | `true`

#### Defined in

validators.ts:38

***

### provideAndReturnRefs()

> **provideAndReturnRefs**<`T`>(`key`, `data`): `ToRefs`<`UnwrapNestedRefs`<`T`>>

Provide the given data to child components and return the data as refs.

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `T` *extends* `object` |

#### Parameters

| Parameter | Type                | Description                   |
| --------- | ------------------- | ----------------------------- |
| `key`     | `InjectionKey`<`T`> | The key to store the data as. |
| `data`    | `T`                 | The data to store.            |

#### Returns

`ToRefs`<`UnwrapNestedRefs`<`T`>>

#### Defined in

reactivity.ts:32

***

### reactiveExecuteTasks()

> **reactiveExecuteTasks**<`T`>(`tasks`, `maxNumOfWorkers`): [`ReactiveExecuteTasksRet`](README.md#reactiveexecutetasksrett)<`T`>

Reactive version of `@ti-platform/aide#xecuteTasks`.

#### Type Parameters

| Type Parameter | Description                          |
| -------------- | ------------------------------------ |
| `T`            | The type of the result of each task. |

#### Parameters

| Parameter         | Type                             | Default value | Description                                 |
| ----------------- | -------------------------------- | ------------- | ------------------------------------------- |
| `tasks`           | readonly () => `Promise`<`T`>\[] | `undefined`   | The tasks to run.                           |
| `maxNumOfWorkers` | `number`                         | `10`          | The maximum number of tasks ot run at once. |

#### Returns

[`ReactiveExecuteTasksRet`](README.md#reactiveexecutetasksrett)<`T`>

#### Defined in

queue.ts:45
