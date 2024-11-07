# @ti-platform/aide

This package exposes some types and functions as utilities that can be used by other packages. Refer to the below API
Docs for more information.

# Contents

* [API Docs](#api-docs)
  * [Classes](#classes)
    * [Deferred\<T>](#deferredt)
    * [MapPlus\<K, V>](#mapplusk-v)
    * [Queue\<T>](#queuet)
  * [Interfaces](#interfaces)
    * [Optional\<T>](#optionalt)
    * [QueueConstructorOptions](#queueconstructoroptions)
  * [Type Aliases](#type-aliases)
    * [AnyArray\<V>](#anyarrayv)
    * [Awaitable\<T>](#awaitablet)
    * [ConsumerFn()\<T>](#consumerfnt)
    * [MapperFn()\<T, R>](#mapperfnt-r)
    * [MapPlusKey](#mappluskey)
    * [MapPlusPredicate\<K, V>](#mappluspredicatek-v)
    * [MarkReadonly\<T, K>](#markreadonlyt-k)
    * [NonEmptyArray\<T>](#nonemptyarrayt)
    * [PredicateFn()\<T>](#predicatefnt)
    * [QueueItem()\<T>](#queueitemt)
    * [Runnable()](#runnable)
    * [Simplify\<T>](#simplifyt)
    * [SupplierFn()\<T>](#supplierfnt)
    * [UndefinedFallback\<T, Fallback>](#undefinedfallbackt-fallback)
  * [Functions](#functions)
    * [createOptional()](#createoptional)
    * [ensureType()](#ensuretype)
    * [executeTasks()](#executetasks)
    * [first()](#first)
    * [firstDefined()](#firstdefined)
    * [getOrDefault()](#getordefault-1)
    * [keepOnlyDefined()](#keeponlydefined)
    * [toMap()](#tomap)
    * [toMapPlus()](#tomapplus)

# API Docs

## Classes

### Deferred\<T>

Extracting out a `Promise`'s `resolve` and `reject` method to allow one to more easily pass around those methods.

#### Type Parameters

| Type Parameter | Default type | Description               |
| -------------- | ------------ | ------------------------- |
| `T`            | `void`       | The type to resolve with. |

#### Constructors

##### new Deferred()

> **new Deferred**<`T`>(): [`Deferred`](README.md#deferredt)<`T`>

Create a new instance.

###### Returns

[`Deferred`](README.md#deferredt)<`T`>

###### Defined in

packages/aide/src/promises.ts:30

#### Properties

| Property  | Modifier   | Type                                                          | Description                    |
| --------- | ---------- | ------------------------------------------------------------- | ------------------------------ |
| `promise` | `readonly` | `Promise`<`T`>                                                | The underlying promise.        |
| `reject`  | `public`   | (`reason`?: `any`) => `void`                                  | Reject the internal promise.   |
| `resolve` | `public`   | (`value`: [`Awaitable`](README.md#awaitablet)<`T`>) => `void` | Resolves the internal promise. |

***

### MapPlus\<K, V>

Extension to a Map with some new methods.

#### Extends

* `Map`<`K`, `V`>

#### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `K` *extends* [`MapPlusKey`](README.md#mappluskey) |
| `V`                                                |

#### Constructors

##### new MapPlus()

> **new MapPlus**<`K`, `V`>(`entries`?): [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>

###### Parameters

| Parameter  | Type                                       |
| ---------- | ------------------------------------------ |
| `entries`? | `null` \| readonly readonly \[`K`, `V`]\[] |

###### Returns

[`MapPlus`](README.md#mapplusk-v)<`K`, `V`>

###### Inherited from

`Map<K, V>.constructor`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

##### new MapPlus()

> **new MapPlus**<`K`, `V`>(`iterable`?): [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>

###### Parameters

| Parameter   | Type                                                      |
| ----------- | --------------------------------------------------------- |
| `iterable`? | `null` \| `Iterable`\<readonly \[`K`, `V`], `any`, `any`> |

###### Returns

[`MapPlus`](README.md#mapplusk-v)<`K`, `V`>

###### Inherited from

`Map<K, V>.constructor`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:49

#### Properties

| Property        | Modifier   | Type             | Description | Inherited from      |
| --------------- | ---------- | ---------------- | ----------- | ------------------- |
| `[toStringTag]` | `readonly` | `string`         | -           | `Map.[toStringTag]` |
| `size`          | `readonly` | `number`         |             | `Map.size`          |
| `[species]`     | `readonly` | `MapConstructor` | -           | `Map.[species]`     |

#### Methods

##### \[iterator]\()

> **\[iterator]**(): `MapIterator`<\[`K`, `V`]>

Returns an iterable of entries in the map.

###### Returns

`MapIterator`<\[`K`, `V`]>

###### Inherited from

`Map.[iterator]`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:143

##### asOptional()

> **asOptional**(`key`): [`Optional`](README.md#optionalt)<`V`>

Retrieve the value for the provided key as an [Optional](README.md#optionalt).

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |

###### Returns

[`Optional`](README.md#optionalt)<`V`>

###### Defined in

packages/aide/src/map.ts:47

##### clear()

> **clear**(): `void`

###### Returns

`void`

###### Inherited from

`Map.clear`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:20

##### clearAndReturn()

> **clearAndReturn**(): `this`

Same as Map#clear but returns this instance after clearing.

###### Returns

`this`

###### Defined in

packages/aide/src/map.ts:54

##### compute()

> **compute**(`key`, `remapper`): [`Optional`](README.md#optionalt)<`V`>

Attempts to compute a mapping for the specified key and its current mapped value, or undefined if there is no
current mapping. If the remapping function returns undefined or null, the mapping is removed (or remains absent
if initially absent).

###### Parameters

| Parameter  | Type                                                                                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`      | `K`                                                                                                                                                                        |
| `remapper` | [`MapperFn`](README.md#mapperfnt-r)<{`key`: `K`;`map`: [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>;`value`: `undefined` \| `V`; }, [`Optional`](README.md#optionalt)<`V`>> |

###### Returns

[`Optional`](README.md#optionalt)<`V`>

An optional containing the value associated with the provided key.

###### Defined in

packages/aide/src/map.ts:66

##### computeIfAbsent()

> **computeIfAbsent**(`key`, `mapper`): [`Optional`](README.md#optionalt)<`V`>

If the value for the specified key is absent, attempts to compute its value using the given mapping function and
enters it into this map unless undefined or null.

###### Parameters

| Parameter | Type                                                                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`     | `K`                                                                                                                                            |
| `mapper`  | [`MapperFn`](README.md#mapperfnt-r)<{`key`: `K`;`map`: [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>; }, [`Optional`](README.md#optionalt)<`V`>> |

###### Returns

[`Optional`](README.md#optionalt)<`V`>

An optional containing the value associated with the provided key.

###### Defined in

packages/aide/src/map.ts:83

##### computeIfPresent()

> **computeIfPresent**(`key`, `remapper`): [`Optional`](README.md#optionalt)<`V`>

If the value for the specified key is present, attempts to compute a new mapping given the key and its current
mapped value. If the remapping function returns undefined or null, the mapping is removed.

###### Parameters

| Parameter  | Type                                                                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`      | `K`                                                                                                                                                         |
| `remapper` | [`MapperFn`](README.md#mapperfnt-r)<{`key`: `K`;`map`: [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>;`value`: `V`; }, [`Optional`](README.md#optionalt)<`V`>> |

###### Returns

[`Optional`](README.md#optionalt)<`V`>

An optional containing the value associated with the provided key.

###### Defined in

packages/aide/src/map.ts:97

##### contains()

> **contains**(`item`): `boolean`

Returns true if this map maps one or more keys to the specified value.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `item`    | `V`  |

###### Returns

`boolean`

###### Defined in

packages/aide/src/map.ts:111

##### delete()

> **delete**(`key`): `boolean`

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |

###### Returns

`boolean`

true if an element in the Map existed and has been removed, or false if the element does not exist.

###### Inherited from

`Map.delete`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:24

##### each()

> **each**(`consumer`): `this`

Similar to Map#forEach except return this at the end and the consumer retrieves the data differently.

###### Parameters

| Parameter  | Type                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| `consumer` | [`ConsumerFn`](README.md#consumerfnt)<{`key`: `K`;`map`: [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>;`value`: `V`; }> |

###### Returns

`this`

###### Defined in

packages/aide/src/map.ts:118

##### entries()

> **entries**(): `MapIterator`<\[`K`, `V`]>

Returns an iterable of key, value pairs for every entry in the map.

###### Returns

`MapIterator`<\[`K`, `V`]>

###### Inherited from

`Map.entries`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:148

##### every()

> **every**(`predicate`): `boolean`

Returns true if every entry in this map satisfies the given predicate.

###### Parameters

| Parameter   | Type                                                          |
| ----------- | ------------------------------------------------------------- |
| `predicate` | [`MapPlusPredicate`](README.md#mappluspredicatek-v)<`K`, `V`> |

###### Returns

`boolean`

###### Defined in

packages/aide/src/map.ts:126

##### filter()

> **filter**(`predicate`): [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>

Create a new map by only keeping the entries that satisfies the provided predicate.

###### Parameters

| Parameter   | Type                                                          |
| ----------- | ------------------------------------------------------------- |
| `predicate` | [`MapPlusPredicate`](README.md#mappluspredicatek-v)<`K`, `V`> |

###### Returns

[`MapPlus`](README.md#mapplusk-v)<`K`, `V`>

###### Defined in

packages/aide/src/map.ts:133

##### forEach()

> **forEach**(`callbackfn`, `thisArg`?): `void`

Executes a provided function once per each key/value pair in the Map, in insertion order.

###### Parameters

| Parameter    | Type                              |
| ------------ | --------------------------------- |
| `callbackfn` | (`value`, `key`, `map`) => `void` |
| `thisArg`?   | `any`                             |

###### Returns

`void`

###### Inherited from

`Map.forEach`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:28

##### get()

> **get**(`key`): `undefined` | `V`

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |

###### Returns

`undefined` | `V`

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

###### Inherited from

`Map.get`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:33

##### getOrDefault()

> **getOrDefault**(`key`, `defaultValue`): `V`

If this map has the provided key, return the value associated with that key, otherwise return the provided
default value.

###### Parameters

| Parameter      | Type |
| -------------- | ---- |
| `key`          | `K`  |
| `defaultValue` | `V`  |

###### Returns

`V`

###### Defined in

packages/aide/src/map.ts:143

##### getOrThrow()

> **getOrThrow**(`key`): `V`

Similar to Map#get but will throw an Error if the key does not exist.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |

###### Returns

`V`

###### Defined in

packages/aide/src/map.ts:150

##### has()

> **has**(`key`): `boolean`

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |

###### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

###### Inherited from

`Map.has`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:37

##### isEmpty()

> **isEmpty**(): `boolean`

Returns true if this map contains no key-value mappings.

###### Returns

`boolean`

###### Defined in

packages/aide/src/map.ts:161

##### keys()

> **keys**(): `MapIterator`<`K`>

Returns an iterable of keys in the map

###### Returns

`MapIterator`<`K`>

###### Inherited from

`Map.keys`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:153

##### keysArray()

> **keysArray**(): `K`\[]

Retrieve the keys as an array.

###### Returns

`K`\[]

###### Defined in

packages/aide/src/map.ts:168

##### mapKeys()

> **mapKeys**<`R`>(`mapper`): [`MapPlus`](README.md#mapplusk-v)<`R`, `V`>

Create a new version of this map with the keys mapped to a different value with the provided mapper. Please note
that no consideration will be made in validate the keys are not duplicated meaning if the mapper function
generates the same key multiple times, the later will override the previous value.

###### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `R` *extends* [`MapPlusKey`](README.md#mappluskey) |

###### Parameters

| Parameter | Type                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------ |
| `mapper`  | [`MapperFn`](README.md#mapperfnt-r)<{`key`: `K`;`map`: [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>;`value`: `V`; }, `R`> |

###### Returns

[`MapPlus`](README.md#mapplusk-v)<`R`, `V`>

###### Defined in

packages/aide/src/map.ts:177

##### mapValues()

> **mapValues**<`R`>(`mapper`): [`MapPlus`](README.md#mapplusk-v)<`K`, `R`>

Create a new version of this map with the values mapped to a different value with the provided mapper.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------ |
| `mapper`  | [`MapperFn`](README.md#mapperfnt-r)<{`key`: `K`;`map`: [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>;`value`: `V`; }, `R`> |

###### Returns

[`MapPlus`](README.md#mapplusk-v)<`K`, `R`>

###### Defined in

packages/aide/src/map.ts:186

##### set()

> **set**(`key`, `value`): `this`

Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |
| `value`   | `V`  |

###### Returns

`this`

###### Inherited from

`Map.set`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:41

##### setAll()

> **setAll**(`map`): `this`

Set all key/value pair in the given map to this map.

###### Parameters

| Parameter | Type                              |
| --------- | --------------------------------- |
| `map`     | `Map`<`K`, `V`> \| \[`K`, `V`]\[] |

###### Returns

`this`

###### Defined in

packages/aide/src/map.ts:195

##### setIfAbsent()

> **setIfAbsent**(`key`, `value`): `V`

Set the provided value to the provided key if it doesn't exists, returning the new current value.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |
| `value`   | `V`  |

###### Returns

`V`

###### Defined in

packages/aide/src/map.ts:208

##### some()

> **some**(`predicate`): `boolean`

Returns true if at least one entry in this map satisfies the provided predicate.

###### Parameters

| Parameter   | Type                                                          |
| ----------- | ------------------------------------------------------------- |
| `predicate` | [`MapPlusPredicate`](README.md#mappluspredicatek-v)<`K`, `V`> |

###### Returns

`boolean`

###### Defined in

packages/aide/src/map.ts:220

##### toObject()

> **toObject**(): `Record`<`K`, `V`>

Convert this to an object of key/value pair.

###### Returns

`Record`<`K`, `V`>

###### Defined in

packages/aide/src/map.ts:227

##### values()

> **values**(): `MapIterator`<`V`>

Returns an iterable of values in the map

###### Returns

`MapIterator`<`V`>

###### Inherited from

`Map.values`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:158

##### valuesArray()

> **valuesArray**(): `V`\[]

Retrieves all values as an array.

###### Returns

`V`\[]

###### Defined in

packages/aide/src/map.ts:234

##### groupBy()

> `static` **groupBy**<`K`, `T`>(`items`, `keySelector`): `Map`<`K`, `T`\[]>

Groups members of an iterable according to the return value of the passed callback.

###### Type Parameters

| Type Parameter |
| -------------- |
| `K`            |
| `T`            |

###### Parameters

| Parameter     | Type                          | Description                                              |
| ------------- | ----------------------------- | -------------------------------------------------------- |
| `items`       | `Iterable`<`T`, `any`, `any`> | An iterable.                                             |
| `keySelector` | (`item`, `index`) => `K`      | A callback which will be invoked for each item in items. |

###### Returns

`Map`<`K`, `T`\[]>

###### Inherited from

`Map.groupBy`

###### Defined in

common/temp/node\_modules/.pnpm/typescript\@5.6.3/node\_modules/typescript/lib/lib.esnext.collection.d.ts:25

***

### Queue\<T>

Queue that execute handlers as per the configured concurrency limit. It also has the ability to rate limit how much
execution happens within an interval.

#### Type Parameters

| Type Parameter | Default type | Description                                                                             |
| -------------- | ------------ | --------------------------------------------------------------------------------------- |
| `T`            | `void`       | The type of the item that the promise resolves with for the handlers. Defaults to void. |

#### Constructors

##### new Queue()

> **new Queue**<`T`>(`__namedParameters`): [`Queue`](README.md#queuet)<`T`>

Create a new instance.

###### Parameters

| Parameter                           | Type     | Description                                                                                                                                                                                             |
| ----------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`                 | `object` | -                                                                                                                                                                                                       |
| `__namedParameters.intervalMs`?     | `number` | If given in addition with `maxPerInterval`, used to limit how many items can execute within an interval. This is simply the time, in milliseconds, for when to reset the execution counts per interval. |
| `__namedParameters.maxConcurrent`   | `number` | Maximum number of concurrent executions.                                                                                                                                                                |
| `__namedParameters.maxPerInterval`? | `number` | If given in addition with `intervalMs`, used to limit how many items can execute within an interval. This is simply the maximum number of executions within the interval.                               |

###### Returns

[`Queue`](README.md#queuet)<`T`>

###### Defined in

packages/aide/src/queue.ts:146

#### Properties

| Property         | Modifier   | Type     | Description                                                                                                                                                                                             |
| ---------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intervalMs`     | `readonly` | `number` | If given in addition with `maxPerInterval`, used to limit how many items can execute within an interval. This is simply the time, in milliseconds, for when to reset the execution counts per interval. |
| `maxConcurrent`  | `readonly` | `number` | Maximum number of concurrent executions.                                                                                                                                                                |
| `maxPerInterval` | `readonly` | `number` | If given in addition with `intervalMs`, used to limit how many items can execute within an interval. This is simply the maximum number of executions within the interval.                               |

#### Methods

##### add()

> **add**(`item`): {`onAfterStart`: `Promise`<`void`>;`onBeforeStart`: `Promise`<`void`>;`onEnd`: `Promise`<`T`>; }

Add a new item to the queue for execution.

###### Parameters

| Parameter | Type                                     |
| --------- | ---------------------------------------- |
| `item`    | [`QueueItem`](README.md#queueitemt)<`T`> |

###### Returns

{`onAfterStart`: `Promise`<`void`>;`onBeforeStart`: `Promise`<`void`>;`onEnd`: `Promise`<`T`>; }

| Name            | Type              | Description                                                                                                        |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `onAfterStart`  | `Promise`<`void`> | Promised that is resolved right after the handler is executed but not necessarily after it has finished execution. |
| `onBeforeStart` | `Promise`<`void`> | Promised that is resolved right before the handler is executed.                                                    |
| `onEnd`         | `Promise`<`T`>    | Promised that is resolved after the handler finished executing.                                                    |

###### Throws

Error if items can no longer be added.

###### Defined in

packages/aide/src/queue.ts:157

##### lockQueue()

> **lockQueue**(): `Promise`<`void`>

Lock the queue and return a promise that will resolve when all the handlers finished execution.

###### Returns

`Promise`<`void`>

###### Defined in

packages/aide/src/queue.ts:181

## Interfaces

### Optional\<T>

Wrapper around values that are either present or absent (null or undefined).

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Methods

##### filter()

> **filter**(`predicate`): [`Optional`](README.md#optionalt)<`T`>

If a value is present and the value matches the given predicate, return an Optional describing the value,
otherwise return an empty Optional.

###### Parameters

| Parameter   | Type                                                        |
| ----------- | ----------------------------------------------------------- |
| `predicate` | [`PredicateFn`](README.md#predicatefnt)<`NonNullable`<`T`>> |

###### Returns

[`Optional`](README.md#optionalt)<`T`>

###### Defined in

packages/aide/src/optional.ts:11

##### flatMap()

> **flatMap**<`R`>(`mapper`): [`Optional`](README.md#optionalt)<`R`>

If a value is present, apply the provided Optional-bearing mapping function to it, return that result, otherwise
return an empty Optional. This method is similar to [map](README.md#map), but the provided mapper is one whose result is
already an Optional, and if invoked, flatMap does not wrap it with an additional Optional.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type                                                                                            |
| --------- | ----------------------------------------------------------------------------------------------- |
| `mapper`  | [`MapperFn`](README.md#mapperfnt-r)<`NonNullable`<`T`>, [`Optional`](README.md#optionalt)<`R`>> |

###### Returns

[`Optional`](README.md#optionalt)<`R`>

###### Defined in

packages/aide/src/optional.ts:18

##### getOrThrow()

> **getOrThrow**(): `NonNullable`<`T`>

If the value is present, returns the value, otherwise throws an Error.

###### Returns

`NonNullable`<`T`>

###### Defined in

packages/aide/src/optional.ts:23

##### ifAbsent()

> **ifAbsent**(`handler`): `this`

If the value is absent, invoke the specified handler, otherwise do nothing.

###### Parameters

| Parameter | Type                             |
| --------- | -------------------------------- |
| `handler` | [`Runnable`](README.md#runnable) |

###### Returns

`this`

###### Defined in

packages/aide/src/optional.ts:28

##### ifPresent()

> **ifPresent**(`consumer`): `this`

If a value is present, invoke the specified consumer with the value, otherwise do nothing.

###### Parameters

| Parameter  | Type                                                      |
| ---------- | --------------------------------------------------------- |
| `consumer` | [`ConsumerFn`](README.md#consumerfnt)<`NonNullable`<`T`>> |

###### Returns

`this`

###### Defined in

packages/aide/src/optional.ts:33

##### isAbsent()

> **isAbsent**(): `boolean`

If a value is absent (null or undefined), returns true, otherwise false.

###### Returns

`boolean`

###### Defined in

packages/aide/src/optional.ts:38

##### isPresent()

> **isPresent**(): `boolean`

If a value is present, returns true, otherwise false.

###### Returns

`boolean`

###### Defined in

packages/aide/src/optional.ts:43

##### map()

> **map**<`R`>(`mapper`): [`Optional`](README.md#optionalt)<`R`>

If a value is present, apply the provided mapping function to it, and if the result is present, return an
Optional describing the result, otherwise, return an empty Optional.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type                                                         |
| --------- | ------------------------------------------------------------ |
| `mapper`  | [`MapperFn`](README.md#mapperfnt-r)<`NonNullable`<`T`>, `R`> |

###### Returns

[`Optional`](README.md#optionalt)<`R`>

###### Defined in

packages/aide/src/optional.ts:49

##### or()

> **or**(`other`): [`Optional`](README.md#optionalt)<`T`>

If a value is present, returns an Optional describing the value, otherwise returns an Optional produced by the
supplying function.

###### Parameters

| Parameter | Type                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| `other`   | [`SupplierFn`](README.md#supplierfnt)<[`Optional`](README.md#optionalt)<`T`>> |

###### Returns

[`Optional`](README.md#optionalt)<`T`>

###### Defined in

packages/aide/src/optional.ts:55

##### orElse()

> **orElse**(`other`): `T`

If a value is present, returns the value, otherwise returns other.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `other`   | `T`  |

###### Returns

`T`

###### Defined in

packages/aide/src/optional.ts:60

##### orElseGet()

> **orElseGet**(`other`): `T`

If a value is present, returns the value, otherwise returns the result produced by the supplying function.

###### Parameters

| Parameter | Type                                       |
| --------- | ------------------------------------------ |
| `other`   | [`SupplierFn`](README.md#supplierfnt)<`T`> |

###### Returns

`T`

###### Defined in

packages/aide/src/optional.ts:65

##### orElseThrow()

> **orElseThrow**<`X`>(`other`): `T`

If a value is present, returns the value, otherwise throws an exception to be created by the provided supplier.

###### Type Parameters

| Type Parameter |
| -------------- |
| `X`            |

###### Parameters

| Parameter | Type                                       |
| --------- | ------------------------------------------ |
| `other`   | [`SupplierFn`](README.md#supplierfnt)<`X`> |

###### Returns

`T`

###### Defined in

packages/aide/src/optional.ts:70

##### orUndefined()

> **orUndefined**(): `undefined` | `NonNullable`<`T`>

If a value is present, returns the value, otherwise return undefined.

###### Returns

`undefined` | `NonNullable`<`T`>

###### Defined in

packages/aide/src/optional.ts:75

***

### QueueConstructorOptions

Arguments for constructing a [Queue](README.md#queuet).

#### Properties

| Property          | Type     | Description                                                                                                                                                                                             |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intervalMs?`     | `number` | If given in addition with `maxPerInterval`, used to limit how many items can execute within an interval. This is simply the time, in milliseconds, for when to reset the execution counts per interval. |
| `maxConcurrent`   | `number` | Maximum number of concurrent executions.                                                                                                                                                                |
| `maxPerInterval?` | `number` | If given in addition with `intervalMs`, used to limit how many items can execute within an interval. This is simply the maximum number of executions within the interval.                               |

## Type Aliases

### AnyArray\<V>

> **AnyArray**<`V`>: `V`\[] | `ReadonlyArray`<`V`>

Type matching against both a writable array and a readonly array.

#### Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `V`            | The type of each item in the array. |

#### Defined in

packages/aide/src/types.ts:11

***

### Awaitable\<T>

> **Awaitable**<`T`>: `T` | `Promise`<`T`>

The type is simply `T` or a promise which, when resolved, is given `T`.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Defined in

packages/aide/src/types.ts:4

***

### ConsumerFn()\<T>

> **ConsumerFn**<`T`>: (`input`) => `void`

Represents an operation that accepts an input argument and returns no result.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `input`   | `T`  |

#### Returns

`void`

#### Defined in

packages/aide/src/types.ts:36

***

### MapperFn()\<T, R>

> **MapperFn**<`T`, `R`>: (`input`) => `R`

Represents a function that accepts an input argument and produces a result.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `R`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `input`   | `T`  |

#### Returns

`R`

#### Defined in

packages/aide/src/types.ts:41

***

### MapPlusKey

> **MapPlusKey**: `string` | `number` | `symbol`

The possible type for a key.

#### Defined in

packages/aide/src/map.ts:19

***

### MapPlusPredicate\<K, V>

> **MapPlusPredicate**<`K`, `V`>: [`PredicateFn`](README.md#predicatefnt)<{`key`: `K`;`map`: [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>;`value`: `V`; }>

Predicate used by [MapPlus](README.md#mapplusk-v).

#### Type declaration

| Name    | Type                                        |
| ------- | ------------------------------------------- |
| `key`   | `K`                                         |
| `map`   | [`MapPlus`](README.md#mapplusk-v)<`K`, `V`> |
| `value` | `V`                                         |

#### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `K` *extends* [`MapPlusKey`](README.md#mappluskey) |
| `V`                                                |

#### Defined in

packages/aide/src/map.ts:24

***

### MarkReadonly\<T, K>

> **MarkReadonly**<`T`, `K`>: `Omit`<`T`, `K`> & `Readonly`<`Pick`<`T`, `K`>>

For a given object, T, mark the keys given as being readonly.

#### Type Parameters

| Type Parameter          |
| ----------------------- |
| `T`                     |
| `K` *extends* keyof `T` |

#### Defined in

packages/aide/src/types.ts:16

***

### NonEmptyArray\<T>

> **NonEmptyArray**<`T`>: \[`T`, `...T[]`]

For a non-empty array.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Defined in

packages/aide/src/types.ts:21

***

### PredicateFn()\<T>

> **PredicateFn**<`T`>: (`input`) => `boolean`

Represents a predicate (boolean-valued function) of one argument.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `input`   | `T`  |

#### Returns

`boolean`

#### Defined in

packages/aide/src/types.ts:46

***

### QueueItem()\<T>

> **QueueItem**<`T`>: () => [`Awaitable`](README.md#awaitablet)<`T`>

An item in the queue.

#### Type Parameters

| Type Parameter | Default type | Description                                                            |
| -------------- | ------------ | ---------------------------------------------------------------------- |
| `T`            | `void`       | The type of the item that the promise resolves with. Defaults to void. |

#### Returns

[`Awaitable`](README.md#awaitablet)<`T`>

#### Defined in

packages/aide/src/queue.ts:28

***

### Runnable()

> **Runnable**: () => `void`

Represents an operation that does not return a result.

#### Returns

`void`

#### Defined in

packages/aide/src/types.ts:51

***

### Simplify\<T>

> **Simplify**<`T`>: `{ [KeyType in keyof T]: T[KeyType] }` & `NonNullable`<`unknown`>

Refer to <https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts>.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Defined in

packages/aide/src/types.ts:26

***

### SupplierFn()\<T>

> **SupplierFn**<`T`>: () => `T`

Represents a supplier of results.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Returns

`T`

#### Defined in

packages/aide/src/types.ts:56

***

### UndefinedFallback\<T, Fallback>

> **UndefinedFallback**<`T`, `Fallback`>: \[`T`] *extends* \[`undefined`] ? `Fallback` : `T`

If the given type, `T` is undefined, return `Fallback`, otherwise just return \`T.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `Fallback`     |

#### Defined in

packages/aide/src/types.ts:31

## Functions

### createOptional()

> **createOptional**<`T`>(`value`): [`Optional`](README.md#optionalt)<`T`>

Create an optional from the provided value.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type                         | Default value |
| --------- | ---------------------------- | ------------- |
| `value`   | `undefined` \| `null` \| `T` | `undefined`   |

#### Returns

[`Optional`](README.md#optionalt)<`T`>

#### Defined in

packages/aide/src/optional.ts:195

***

### ensureType()

> **ensureType**<`V`>(): <`T`>(`list`) => readonly `T`\[]

This function is primarily here to help with stricter typing. When Typescript allows for partial inference of
arguments to functions, this function would likely not be needed anymore.

#### Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `V`            | The type of each item in the array. |

#### Returns

`Function`

An identity function that accepts a list and simply returns it.

##### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

##### Parameters

| Parameter | Type            |
| --------- | --------------- |
| `list`    | readonly `T`\[] |

##### Returns

readonly `T`\[]

#### Example

```ts
type MyItem = { name: string, displayName: string };
 const list = ensureType<MyItem>()([
     { name: 'one', displayName: 'ONE' },    // <- You get proper linting and hinting support here
     { name: 'two', displayName: 'TWO' },
 ] as const); // <- The "as const" allows for better type restrictions as below

 type Name = typeof list[number]['name'];    // == "one" | "two" vs string if not using this
```

#### Defined in

packages/aide/src/arrays.ts:19

***

### executeTasks()

> **executeTasks**<`T`>(`tasks`, `maxNumOfWorkers`): `Promise`<`T`\[]>

Given a list of tasks to execute, execute them, ensuring there is a maximum number of tasks actively running at the
same time. The returning array of responses should match the order of the task that was given.

#### Type Parameters

| Type Parameter | Description                          |
| -------------- | ------------------------------------ |
| `T`            | The type of the result of each task. |

#### Parameters

| Parameter         | Type                             | Default value | Description                                 |
| ----------------- | -------------------------------- | ------------- | ------------------------------------------- |
| `tasks`           | readonly () => `Promise`<`T`>\[] | `undefined`   | The tasks to run.                           |
| `maxNumOfWorkers` | `number`                         | `10`          | The maximum number of tasks to run at once. |

#### Returns

`Promise`<`T`\[]>

A promise that will resolve when all the tasks are completed.

#### Defined in

packages/aide/src/queue.ts:13

***

### first()

> **first**<`V`>(`list`): `V` | `undefined`

#### Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `V`            | The type of each item in the array. |

#### Parameters

| Parameter | Type                                   | Description                                 |
| --------- | -------------------------------------- | ------------------------------------------- |
| `list`    | [`AnyArray`](README.md#anyarrayv)<`V`> | The list to retrieve the first element for. |

#### Returns

`V` | `undefined`

The first item in the list or undefined if the list is empty.

#### Defined in

packages/aide/src/arrays.ts:30

***

### firstDefined()

> **firstDefined**<`V`>(`list`): `V`

Given a list of function, execute each until there is a function that does not return undefined. You should have at
least one of the function return something to prevent problems.

#### Type Parameters

| Type Parameter | Description                        |
| -------------- | ---------------------------------- |
| `V`            | The type of each item in the list. |

#### Parameters

| Parameter | Type                                                        | Description                       |
| --------- | ----------------------------------------------------------- | --------------------------------- |
| `list`    | [`AnyArray`](README.md#anyarrayv)<() => `undefined` \| `V`> | The list of functions to execute. |

#### Returns

`V`

The return value of the first function to not return an undefined value.

#### Defined in

packages/aide/src/arrays.ts:42

***

### getOrDefault()

> **getOrDefault**<`K`, `V`>(`map`, `key`, `defaultValue`): `V`

#### Type Parameters

| Type Parameter | Description                       |
| -------------- | --------------------------------- |
| `K`            | The type of the key in the map.   |
| `V`            | The type of the value in the map. |

#### Parameters

| Parameter      | Type            | Description                                            |
| -------------- | --------------- | ------------------------------------------------------ |
| `map`          | `Map`<`K`, `V`> | The map to get the data from.                          |
| `key`          | `K`             | The key to get the data for.                           |
| `defaultValue` | `V`             | The default value to return if the key does not exist. |

#### Returns

`V`

The value in the map with the given key or if the key does not exist, the provided default value.

#### Defined in

packages/aide/src/map.ts:12

***

### keepOnlyDefined()

> **keepOnlyDefined**<`V`>(`list`): `V`\[]

Given a list of items, remove null and undefined from the list.

#### Type Parameters

| Type Parameter | Description                        |
| -------------- | ---------------------------------- |
| `V`            | The type of each item in the list. |

#### Parameters

| Parameter | Type                                   | Description                               |
| --------- | -------------------------------------- | ----------------------------------------- |
| `list`    | [`AnyArray`](README.md#anyarrayv)<`V`> | The list of items to traverse and filter. |

#### Returns

`V`\[]

The given list without null or undefined values.

#### Defined in

packages/aide/src/arrays.ts:59

***

### toMap()

> **toMap**<`K`, `V`, `V2`>(`list`, `keySupplier`, `valueSupplier`): `Record`<`K`, `V2`>

Given a list, convert it to an object where the key will be provided using the given supplier.

#### Type Parameters

| Type Parameter              | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `K` *extends* `PropertyKey` | The type for the key that will be produced for the map. |
| `V`                         | The type of each item in the list.                      |
| `V2`                        | The type for the value when it is set to the map.       |

#### Parameters

| Parameter       | Type                                   | Description                                           |
| --------------- | -------------------------------------- | ----------------------------------------------------- |
| `list`          | [`AnyArray`](README.md#anyarrayv)<`V`> | The list of items to convert.                         |
| `keySupplier`   | (`item`, `index`) => `K`               | Function to use to generate the key for each entry.   |
| `valueSupplier` | (`item`, `key`, `index`) => `V2`       | Function to use to generate the value for each entry. |

#### Returns

`Record`<`K`, `V2`>

An object representation of the given list using the provided suppliers to generate the keys and values.

#### Defined in

packages/aide/src/arrays.ts:74

***

### toMapPlus()

> **toMapPlus**<`K`, `V`>(`from`): [`MapPlus`](README.md#mapplusk-v)<`K`, `V`>

Ensure the given is a [MapPlus](README.md#mapplusk-v).

#### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `K` *extends* [`MapPlusKey`](README.md#mappluskey) |
| `V`                                                |

#### Parameters

| Parameter | Type                              |
| --------- | --------------------------------- |
| `from`    | `Map`<`K`, `V`> \| \[`K`, `V`]\[] |

#### Returns

[`MapPlus`](README.md#mapplusk-v)<`K`, `V`>

#### Defined in

packages/aide/src/map.ts:29
