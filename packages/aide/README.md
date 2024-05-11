# @ti-platform/aide

This package exposes some types and functions as utilities that can be used by other packages. Refer to the below API
Docs for more information.

# Contents

* [API Docs](#api-docs)
  * [Classes](#classes)
    * [Deferred\<T>](#deferredt)
    * [Queue\<T>](#queuet)
  * [Interfaces](#interfaces)
    * [QueueConstructorOptions](#queueconstructoroptions)
  * [Type Aliases](#type-aliases)
    * [AnyArray\<V>](#anyarrayv)
    * [Awaitable\<T>](#awaitablet)
    * [MarkReadonly\<T, K>](#markreadonlyt-k)
    * [NonEmptyArray\<T>](#nonemptyarrayt)
    * [QueueItem()\<T>](#queueitemt)
    * [Simplify\<T>](#simplifyt)
    * [UndefinedFallback\<T, Fallback>](#undefinedfallbackt-fallback)
  * [Functions](#functions)
    * [ensureType()](#ensuretype)
    * [executeTasks()](#executetasks)
    * [first()](#first)
    * [firstDefined()](#firstdefined)
    * [getOrDefault()](#getordefault)
    * [keepOnlyDefined()](#keeponlydefined)
    * [toMap()](#tomap)

# API Docs

## Classes

### Deferred\<T>

Extracting out a `Promise`'s `resolve` and `reject` method to allow one to more easily pass around those methods.

#### Type parameters

| Type parameter | Value | Description |
| :------ | :------ | :------ |
| `T` | `void` | The type to resolve with. |

#### Constructors

##### new Deferred()

> **new Deferred**<`T`>(): [`Deferred`](README.md#deferredt)<`T`>

Create a new instance.

###### Returns

[`Deferred`](README.md#deferredt)<`T`>

###### Source

promises.ts:30

#### Properties

| Property | Modifier | Type | Description |
| :------ | :------ | :------ | :------ |
| `promise` | `readonly` | `Promise`<`T`> | The underlying promise. |
| `reject` | `public` | (`reason`?: `any`) => `void` | Reject the internal promise. |
| `resolve` | `public` | (`value`: [`Awaitable`](README.md#awaitablet)<`T`>) => `void` | Resolves the internal promise. |

***

### Queue\<T>

Queue that execute handlers as per the configured concurrency limit. It also has the ability to rate limit how much
execution happens within an interval.

#### Type parameters

| Type parameter | Value | Description |
| :------ | :------ | :------ |
| `T` | `void` | The type of the item that the promise resolves with for the handlers. Defaults to void. |

#### Constructors

##### new Queue(\_\_namedParameters)

> **new Queue**<`T`>(`__namedParameters`): [`Queue`](README.md#queuet)<`T`>

Create a new instance.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.intervalMs`? | `number` | If given in addition with `maxPerInterval`, used to limit how many items can execute within an interval. This is<br />simply the time, in milliseconds, for when to reset the execution counts per interval. |
| `__namedParameters.maxConcurrent` | `number` | Maximum number of concurrent executions. |
| `__namedParameters.maxPerInterval`? | `number` | If given in addition with `intervalMs`, used to limit how many items can execute within an interval. This is<br />simply the maximum number of executions within the interval. |

###### Returns

[`Queue`](README.md#queuet)<`T`>

###### Source

queue.ts:146

#### Properties

| Property | Modifier | Type | Description |
| :------ | :------ | :------ | :------ |
| `intervalMs` | `readonly` | `number` | If given in addition with `maxPerInterval`, used to limit how many items can execute within an interval. This is<br />simply the time, in milliseconds, for when to reset the execution counts per interval. |
| `maxConcurrent` | `readonly` | `number` | Maximum number of concurrent executions. |
| `maxPerInterval` | `readonly` | `number` | If given in addition with `intervalMs`, used to limit how many items can execute within an interval. This is<br />simply the maximum number of executions within the interval. |

#### Methods

##### add()

> **add**(`item`): {`onAfterStart`: `Promise`<`void`>;`onBeforeStart`: `Promise`<`void`>;`onEnd`: `Promise`<`T`>;  }

Add a new item to the queue for execution.

###### Parameters

| Parameter | Type |
| :------ | :------ |
| `item` | [`QueueItem`](README.md#queueitemt)<`T`> |

###### Returns

{`onAfterStart`: `Promise`<`void`>;`onBeforeStart`: `Promise`<`void`>;`onEnd`: `Promise`<`T`>;  }

| Member | Type | Description |
| :------ | :------ | :------ |
| `onAfterStart` | `Promise`<`void`> | Promised that is resolved right after the handler is executed but not necessarily after it has finished execution. |
| `onBeforeStart` | `Promise`<`void`> | Promised that is resolved right before the handler is executed. |
| `onEnd` | `Promise`<`T`> | Promised that is resolved after the handler finished executing. |

###### Throws

Error if items can no longer be added.

###### Source

queue.ts:157

##### lockQueue()

> **lockQueue**(): `Promise`<`void`>

Lock the queue and return a promise that will resolve when all the handlers finished execution.

###### Returns

`Promise`<`void`>

###### Source

queue.ts:181

## Interfaces

### QueueConstructorOptions

Arguments for constructing a [Queue](README.md#queuet).

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `intervalMs?` | `number` | If given in addition with `maxPerInterval`, used to limit how many items can execute within an interval. This is<br />simply the time, in milliseconds, for when to reset the execution counts per interval. |
| `maxConcurrent` | `number` | Maximum number of concurrent executions. |
| `maxPerInterval?` | `number` | If given in addition with `intervalMs`, used to limit how many items can execute within an interval. This is<br />simply the maximum number of executions within the interval. |

## Type Aliases

### AnyArray\<V>

> **AnyArray**<`V`>: `V`\[] | `ReadonlyArray`<`V`>

Type matching against both a writable array and a readonly array.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `V` | The type of each item in the array. |

#### Source

types.ts:11

***

### Awaitable\<T>

> **Awaitable**<`T`>: `T` | `Promise`<`T`>

The type is simply `T` or a promise which, when resolved, is given `T`.

#### Type parameters

| Type parameter |
| :------ |
| `T` |

#### Source

types.ts:4

***

### MarkReadonly\<T, K>

> **MarkReadonly**<`T`, `K`>: `Omit`<`T`, `K`> & `Readonly`<`Pick`<`T`, `K`>>

For a given object, T, mark the keys given as being readonly.

#### Type parameters

| Type parameter |
| :------ |
| `T` |
| `K` extends keyof `T` |

#### Source

types.ts:16

***

### NonEmptyArray\<T>

> **NonEmptyArray**<`T`>: \[`T`, `...T[]`]

For a non-empty array.

#### Type parameters

| Type parameter |
| :------ |
| `T` |

#### Source

types.ts:21

***

### QueueItem()\<T>

> **QueueItem**<`T`>: () => [`Awaitable`](README.md#awaitablet)<`T`>

An item in the queue.

#### Type parameters

| Type parameter | Value | Description |
| :------ | :------ | :------ |
| `T` | `void` | The type of the item that the promise resolves with. Defaults to void. |

#### Returns

[`Awaitable`](README.md#awaitablet)<`T`>

#### Source

queue.ts:28

***

### Simplify\<T>

> **Simplify**<`T`>: `{ [KeyType in keyof T]: T[KeyType] }` & `NonNullable`<`unknown`>

Refer to <https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts>.

#### Type parameters

| Type parameter |
| :------ |
| `T` |

#### Source

types.ts:26

***

### UndefinedFallback\<T, Fallback>

> **UndefinedFallback**<`T`, `Fallback`>: \[`T`] extends \[`undefined`] ? `Fallback` : `T`

If the given type, `T` is undefined, return `Fallback`, otherwise just return \`T.

#### Type parameters

| Type parameter |
| :------ |
| `T` |
| `Fallback` |

#### Source

types.ts:31

## Functions

### ensureType()

> **ensureType**<`V`>(): <`T`>(`list`) => readonly `T`\[]

This function is primarily here to help with stricter typing. When Typescript allows for partial inference of
arguments to functions, this function would likely not be needed anymore.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `V` | The type of each item in the array. |

#### Returns

`Function`

An identity function that accepts a list and simply returns it.

> ##### Type parameters
>
> | Type parameter |
> | :------ |
> | `T` |
>
> ##### Parameters
>
> | Parameter | Type |
> | :------ | :------ |
> | `list` | readonly `T`\[] |
>
> ##### Returns
>
> readonly `T`\[]

#### Example

```ts
type MyItem = { name: string, displayName: string };
 const list = ensureType<MyItem>()([
     { name: 'one', displayName: 'ONE' },    // <- You get proper linting and hinting support here
     { name: 'two', displayName: 'TWO' },
 ] as const); // <- The "as const" allows for better type restrictions as below

 type Name = typeof list[number]['name'];    // == "one" | "two" vs string if not using this
```

#### Source

arrays.ts:19

***

### executeTasks()

> **executeTasks**<`T`>(`tasks`, `maxNumOfWorkers`): `Promise`<`T`\[]>

Given a list of tasks to execute, execute them, ensuring there is a maximum number of tasks actively running at the
same time. The returning array of responses should match the order of the task that was given.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `T` | The type of the result of each task. |

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tasks` | readonly () => `Promise`<`T`>\[] | `undefined` | The tasks to run. |
| `maxNumOfWorkers` | `number` | `10` | The maximum number of tasks to run at once. |

#### Returns

`Promise`<`T`\[]>

A promise that will resolve when all the tasks are completed.

#### Source

queue.ts:13

***

### first()

> **first**<`V`>(`list`): `undefined` | `V`

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `V` | The type of each item in the array. |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `list` | [`AnyArray`](README.md#anyarrayv)<`V`> | The list to retrieve the first element for. |

#### Returns

`undefined` | `V`

The first item in the list or undefined if the list is empty.

#### Source

arrays.ts:30

***

### firstDefined()

> **firstDefined**<`V`>(`list`): `V`

Given a list of function, execute each until there is a function that does not return undefined. You should have at
least one of the function return something to prevent problems.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `V` | The type of each item in the list. |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `list` | [`AnyArray`](README.md#anyarrayv)<() => `undefined` | `V`> | The list of functions to execute. |

#### Returns

`V`

The return value of the first function to not return an undefined value.

#### Source

arrays.ts:42

***

### getOrDefault()

> **getOrDefault**<`K`, `V`>(`map`, `key`, `defaultValue`): `V`

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `K` | The type of the key in the map. |
| `V` | The type of the value in the map. |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `map` | `Map`<`K`, `V`> | The map to get the data from. |
| `key` | `K` | The key to get the data for. |
| `defaultValue` | `V` | The default value to return if the key does not exist. |

#### Returns

`V`

The value in the map with the given key or if the key does not exist, the provided default value.

#### Source

map.ts:9

***

### keepOnlyDefined()

> **keepOnlyDefined**<`V`>(`list`): `V`\[]

Given a list of items, remove null and undefined from the list.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `V` | The type of each item in the list. |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `list` | [`AnyArray`](README.md#anyarrayv)<`V`> | The list of items to traverse and filter. |

#### Returns

`V`\[]

The given list without null or undefined values.

#### Source

arrays.ts:59

***

### toMap()

> **toMap**<`K`, `V`, `V2`>(`list`, `keySupplier`, `valueSupplier`): `Record`<`K`, `V2`>

Given a list, convert it to an object where the key will be provided using the given supplier.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `K` extends `PropertyKey` | The type for the key that will be produced for the map. |
| `V` | The type of each item in the list. |
| `V2` | The type for the value when it is set to the map. |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `list` | [`AnyArray`](README.md#anyarrayv)<`V`> | The list of items to convert. |
| `keySupplier` | (`item`, `index`) => `K` | Function to use to generate the key for each entry. |
| `valueSupplier` | (`item`, `key`, `index`) => `V2` | Function to use to generate the value for each entry. |

#### Returns

`Record`<`K`, `V2`>

An object representation of the given list using the provided suppliers to generate the keys and values.

#### Source

arrays.ts:74
