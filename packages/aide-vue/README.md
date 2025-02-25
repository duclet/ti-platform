# @ti-platform/aide-vue

This package contains utility functions that can be used with Vue to enhance the development of Vue components.

# Contents

* [API Docs](#api-docs)
  * [Type Aliases](#type-aliases)
    * [ReactiveExecuteTasksRet\<T>](#reactiveexecutetasksrett)
    * [ValueTypes](#valuetypes)
  * [Functions](#functions)
    * [asComputed()](#ascomputed)
    * [asRef()](#asref)
    * [injectRefs()](#injectrefs)
    * [isRequiredField()](#isrequiredfield)
    * [isRequiredFieldWhen()](#isrequiredfieldwhen)
    * [isUniqueField()](#isuniquefield)
    * [provideAndReturnRefs()](#provideandreturnrefs)
    * [reactiveExecuteTasks()](#reactiveexecutetasks)

# API Docs

## Type Aliases

### ReactiveExecuteTasksRet\<T>

> **ReactiveExecuteTasksRet**<`T`>: {`activeWorkers`: `ComputedRef`<`number`>;`completedTasks`: `ComputedRef`<`number`>;`isAllTasksCompleted`: `ComputedRef`<`boolean`>;`results`: `ComputedRef`<`T`\[]>;`totalTasks`: `ComputedRef`<`number`>; }

The return value for the function [reactiveExecuteTasks](README.md#reactiveexecutetasks).

#### Type Parameters

| Type Parameter | Description             |
| -------------- | ----------------------- |
| `T`            | The type of the result. |

#### Type declaration

| Name                  | Type                     | Description                                                                                                                                                                                                             |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeWorkers`       | `ComputedRef`<`number`>  | The current active number of workers.                                                                                                                                                                                   |
| `completedTasks`      | `ComputedRef`<`number`>  | The current number of completed tasks.                                                                                                                                                                                  |
| `isAllTasksCompleted` | `ComputedRef`<`boolean`> | True if all the tasks have completed running, false otherwise.                                                                                                                                                          |
| `results`             | `ComputedRef`<`T`\[]>    | The array storing the results as it is returned. Note that this can be a sparsed array with missing indexes as it is filled with the results only when it is available. You should check for undefined before using it. |
| `totalTasks`          | `ComputedRef`<`number`>  | The total number of tasks that was queued.                                                                                                                                                                              |

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

| Parameter | Type            | Description         |
| --------- | --------------- | ------------------- |
| `ref`     | `Ref`<`T`, `T`> | The Ref to convert. |

#### Returns

`ComputedRef`<`T`>

The ComputedRef that simply returns the value of the given Ref.

#### Defined in

reactivity.ts:9

***

### asRef()

> **asRef**<`T`>(`value`): `Ref`<`T`>

Basically remove the "UnwrapSimpleRef" from the inner type so things work better with arrays and objects.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type | Description            |
| --------- | ---- | ---------------------- |
| `value`   | `T`  | The value for the ref. |

#### Returns

`Ref`<`T`>

The ref.

#### Defined in

reactivity.ts:19

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

reactivity.ts:29

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

| Parameter        | Type                                                        | Default value                    | Description                                                                                   |
| ---------------- | ----------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| `existingValues` | `Ref`<(`string` \| `number`)\[], (`string` \| `number`)\[]> | `undefined`                      | A reference to the list of existing values. The list should update when new values are added. |
| `invalidMessage` | `string`                                                    | `DEFAULT_UNIQUE_INVALID_MESSAGE` | The message to show when validation failed.                                                   |

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

> **provideAndReturnRefs**<`T`>(`key`, `data`): `ToRefs`<`Reactive`<`T`>>

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

`ToRefs`<`Reactive`<`T`>>

#### Defined in

reactivity.ts:41

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
