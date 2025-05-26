# @ti-platform/aide

This package exposes some types and functions as utilities that can be used by other packages. Refer to the below API
Docs for more information.

# Contents

* [API Docs](#api-docs)
  * [Classes](#classes)
    * [AbsentOptional\<T>](#absentoptionalt)
    * [Deferred\<T>](#deferredt)
    * [MapPlus\<K, V>](#mapplusk-v)
    * [PresentOptional\<T>](#presentoptionalt)
    * [Queue\<T>](#queuet)
  * [Interfaces](#interfaces)
    * [Optional\<T>](#optionalt)
    * [QueueConstructorOptions](#queueconstructoroptions)
  * [Type Aliases](#type-aliases)
    * [AnyArray\<V>](#anyarrayv)
    * [Awaitable\<T>](#awaitablet)
    * [AwaitableBiConsumer()\<T, U>](#awaitablebiconsumert-u)
    * [AwaitableBiMapper()\<T, U, R>](#awaitablebimappert-u-r)
    * [AwaitableBinaryOperator()\<T>](#awaitablebinaryoperatort)
    * [AwaitableBiPredicate()\<T, U>](#awaitablebipredicatet-u)
    * [AwaitableConsumer()\<T>](#awaitableconsumert)
    * [AwaitableMapper()\<T, R>](#awaitablemappert-r)
    * [AwaitablePredicate()\<T>](#awaitablepredicatet)
    * [AwaitableRunnable()](#awaitablerunnable)
    * [AwaitableSupplier()\<T>](#awaitablesuppliert)
    * [AwaitableTernaryOperator()\<T>](#awaitableternaryoperatort)
    * [AwaitableTriConsumer()\<T, U, V>](#awaitabletriconsumert-u-v)
    * [AwaitableTriMapper()\<T, U, V, R>](#awaitabletrimappert-u-v-r)
    * [AwaitableTriPredicate()\<T, U, V>](#awaitabletripredicatet-u-v)
    * [AwaitableUnaryOperator()\<T>](#awaitableunaryoperatort)
    * [BiConsumer()\<T, U>](#biconsumert-u)
    * [BiMapper()\<T, U, R>](#bimappert-u-r)
    * [BinaryOperator()\<T>](#binaryoperatort)
    * [BiPredicate()\<T, U>](#bipredicatet-u)
    * [Consumer()\<T>](#consumert)
    * [Mapper()\<T, R>](#mappert-r)
    * [MapPlusKey](#mappluskey)
    * [MarkReadonly\<T, K>](#markreadonlyt-k)
    * [Merge\<T, U>](#merget-u)
    * [NonEmptyArray\<T>](#nonemptyarrayt)
    * [Predicate()\<T>](#predicatet)
    * [QueueItem()\<T>](#queueitemt)
    * [Runnable()](#runnable)
    * [Simplify\<T>](#simplifyt)
    * [SimplifyOmit\<T, K>](#simplifyomitt-k)
    * [Supplier()\<T>](#suppliert)
    * [TernaryOperator()\<T>](#ternaryoperatort)
    * [TriConsumer()\<T, U, V>](#triconsumert-u-v)
    * [TriMapper()\<T, U, V, R>](#trimappert-u-v-r)
    * [TriPredicate()\<T, U, V>](#tripredicatet-u-v)
    * [UnaryOperator()\<T>](#unaryoperatort)
    * [UndefinedFallback\<T, Fallback>](#undefinedfallbackt-fallback)
  * [Functions](#functions)
    * [asNonEmptyArray()](#asnonemptyarray)
    * [createOptional()](#createoptional)
    * [ensureType()](#ensuretype)
    * [executeTasks()](#executetasks)
    * [first()](#first)
    * [firstDefined()](#firstdefined)
    * [firstDefinedOpt()](#firstdefinedopt)
    * [firstOpt()](#firstopt)
    * [getOrDefault()](#getordefault-1)
    * [keepOnlyDefined()](#keeponlydefined)
    * [toMap()](#tomap)
    * [toMapPlus()](#tomapplus)
    * [waitFor()](#waitfor)

# API Docs

## Classes

### AbsentOptional\<T>

Defined in: packages/aide/src/optional.ts:78

Wrapper around values that are either present or absent (null or undefined).

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Implements

* [`Optional`](#optional)<`T`>

#### Constructors

##### Constructor

> **new AbsentOptional**<`T`>(): [`AbsentOptional`](#absentoptional)<`T`>

###### Returns

[`AbsentOptional`](#absentoptional)<`T`>

#### Methods

##### filter()

> **filter**(`predicate`): [`Optional`](#optional)<`T`>

Defined in: packages/aide/src/optional.ts:79

If a value is present and the value matches the given predicate, return an Optional describing the value,
otherwise return an empty Optional.

###### Parameters

| Parameter   | Type                                          |
| ----------- | --------------------------------------------- |
| `predicate` | [`Predicate`](#predicate)<`NonNullable`<`T`>> |

###### Returns

[`Optional`](#optional)<`T`>

###### Implementation of

[`Optional`](#optional).[`filter`](#filter-6)

##### flatMap()

> **flatMap**<`R`>(`mapper`): [`Optional`](#optional)<`R`>

Defined in: packages/aide/src/optional.ts:83

If a value is present, apply the provided Optional-bearing mapping function to it, return that result, otherwise
return an empty Optional. This method is similar to [map](#map-4), but the provided mapper is one whose result is
already an Optional, and if invoked, flatMap does not wrap it with an additional Optional.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type                                                                  |
| --------- | --------------------------------------------------------------------- |
| `mapper`  | [`Mapper`](#mapper)<`NonNullable`<`T`>, [`Optional`](#optional)<`R`>> |

###### Returns

[`Optional`](#optional)<`R`>

###### Implementation of

[`Optional`](#optional).[`flatMap`](#flatmap-4)

##### getOrThrow()

> **getOrThrow**(): `NonNullable`<`T`>

Defined in: packages/aide/src/optional.ts:87

If the value is present, returns the value, otherwise throws an Error.

###### Returns

`NonNullable`<`T`>

###### Implementation of

[`Optional`](#optional).[`getOrThrow`](#getorthrow-6)

##### ifAbsent()

> **ifAbsent**(`handler`): `this`

Defined in: packages/aide/src/optional.ts:91

If the value is absent, invoke the specified handler, otherwise do nothing.

###### Parameters

| Parameter | Type                    |
| --------- | ----------------------- |
| `handler` | [`Runnable`](#runnable) |

###### Returns

`this`

###### Implementation of

[`Optional`](#optional).[`ifAbsent`](#ifabsent-4)

##### ifPresent()

> **ifPresent**(`consumer`): `this`

Defined in: packages/aide/src/optional.ts:96

If a value is present, invoke the specified consumer with the value, otherwise do nothing.

###### Parameters

| Parameter  | Type                                        |
| ---------- | ------------------------------------------- |
| `consumer` | [`Consumer`](#consumer)<`NonNullable`<`T`>> |

###### Returns

`this`

###### Implementation of

[`Optional`](#optional).[`ifPresent`](#ifpresent-4)

##### isAbsent()

> **isAbsent**(): `this is AbsentOptional<T>`

Defined in: packages/aide/src/optional.ts:100

If a value is absent (null or undefined), returns true, otherwise false.

###### Returns

`this is AbsentOptional<T>`

###### Implementation of

[`Optional`](#optional).[`isAbsent`](#isabsent-4)

##### isPresent()

> **isPresent**(): `this is PresentOptional<T>`

Defined in: packages/aide/src/optional.ts:104

If a value is present, returns true, otherwise false.

###### Returns

`this is PresentOptional<T>`

###### Implementation of

[`Optional`](#optional).[`isPresent`](#ispresent-4)

##### map()

> **map**<`R`>(`mapper`): [`Optional`](#optional)<`R`>

Defined in: packages/aide/src/optional.ts:108

If a value is present, apply the provided mapping function to it, and if the result is present, return an
Optional describing the result, otherwise, return an empty Optional.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `mapper`  | [`Mapper`](#mapper)<`NonNullable`<`T`>, `R`> |

###### Returns

[`Optional`](#optional)<`R`>

###### Implementation of

[`Optional`](#optional).[`map`](#map-4)

##### or()

> **or**(`other`): [`Optional`](#optional)<`T`>

Defined in: packages/aide/src/optional.ts:112

If a value is present, returns an Optional describing the value, otherwise returns an Optional produced by the
supplying function.

###### Parameters

| Parameter | Type                                                  |
| --------- | ----------------------------------------------------- |
| `other`   | [`Supplier`](#supplier)<[`Optional`](#optional)<`T`>> |

###### Returns

[`Optional`](#optional)<`T`>

###### Implementation of

[`Optional`](#optional).[`or`](#or-4)

##### orElse()

> **orElse**(`other`): `T`

Defined in: packages/aide/src/optional.ts:116

If a value is present, returns the value, otherwise returns other.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `other`   | `T`  |

###### Returns

`T`

###### Implementation of

[`Optional`](#optional).[`orElse`](#orelse-4)

##### orElseGet()

> **orElseGet**(`other`): `T`

Defined in: packages/aide/src/optional.ts:120

If a value is present, returns the value, otherwise returns the result produced by the supplying function.

###### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `other`   | [`Supplier`](#supplier)<`T`> |

###### Returns

`T`

###### Implementation of

[`Optional`](#optional).[`orElseGet`](#orelseget-4)

##### orElseThrow()

> **orElseThrow**<`X`>(`other`): `T`

Defined in: packages/aide/src/optional.ts:124

If a value is present, returns the value, otherwise throws an exception to be created by the provided supplier.

###### Type Parameters

| Type Parameter |
| -------------- |
| `X`            |

###### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `other`   | [`Supplier`](#supplier)<`X`> |

###### Returns

`T`

###### Implementation of

[`Optional`](#optional).[`orElseThrow`](#orelsethrow-4)

##### orUndefined()

> **orUndefined**(): `undefined`

Defined in: packages/aide/src/optional.ts:128

If a value is present, returns the value, otherwise return undefined.

###### Returns

`undefined`

###### Implementation of

[`Optional`](#optional).[`orUndefined`](#orundefined-4)

***

### Deferred\<T>

Defined in: packages/aide/src/promises.ts:15

Extracting out a `Promise`'s `resolve` and `reject` method to allow one to more easily pass around those methods.

#### Type Parameters

| Type Parameter | Default type | Description               |
| -------------- | ------------ | ------------------------- |
| `T`            | `void`       | The type to resolve with. |

#### Constructors

##### Constructor

> **new Deferred**<`T`>(): [`Deferred`](#deferred)<`T`>

Defined in: packages/aide/src/promises.ts:37

Create a new instance.

###### Returns

[`Deferred`](#deferred)<`T`>

#### Properties

| Property                       | Modifier   | Type                  | Description                    |
| ------------------------------ | ---------- | --------------------- | ------------------------------ |
| <a id="promise"></a> `promise` | `readonly` | `Promise`<`T`>        | The underlying promise.        |
| <a id="reject"></a> `reject`   | `public`   | (`reason`?) => `void` | Reject the internal promise.   |
| <a id="resolve"></a> `resolve` | `public`   | (`value`) => `void`   | Resolves the internal promise. |

***

### MapPlus\<K, V>

Defined in: packages/aide/src/map.ts:50

Extension to a Map with some new methods.

#### Extends

* `Map`<`K`, `V`>

#### Type Parameters

| Type Parameter                            |
| ----------------------------------------- |
| `K` *extends* [`MapPlusKey`](#mappluskey) |
| `V`                                       |

#### Constructors

##### Constructor

> **new MapPlus**<`K`, `V`>(`entries`?): [`MapPlus`](#mapplus)<`K`, `V`>

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

###### Parameters

| Parameter  | Type                                       |
| ---------- | ------------------------------------------ |
| `entries`? | `null` \| readonly readonly \[`K`, `V`]\[] |

###### Returns

[`MapPlus`](#mapplus)<`K`, `V`>

###### Inherited from

`Map<K, V>.constructor`

##### Constructor

> **new MapPlus**<`K`, `V`>(`iterable`?): [`MapPlus`](#mapplus)<`K`, `V`>

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:49

###### Parameters

| Parameter   | Type                                                      |
| ----------- | --------------------------------------------------------- |
| `iterable`? | `null` \| `Iterable`\<readonly \[`K`, `V`], `any`, `any`> |

###### Returns

[`MapPlus`](#mapplus)<`K`, `V`>

###### Inherited from

`Map<K, V>.constructor`

#### Properties

| Property                                 | Modifier   | Type             | Inherited from      |
| ---------------------------------------- | ---------- | ---------------- | ------------------- |
| <a id="tostringtag"></a> `[toStringTag]` | `readonly` | `string`         | `Map.[toStringTag]` |
| <a id="size"></a> `size`                 | `readonly` | `number`         | `Map.size`          |
| <a id="species"></a> `[species]`         | `readonly` | `MapConstructor` | `Map.[species]`     |

#### Methods

##### \[iterator]\()

> **\[iterator]**(): `MapIterator`<\[`K`, `V`]>

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:143

Returns an iterable of entries in the map.

###### Returns

`MapIterator`<\[`K`, `V`]>

###### Inherited from

`Map.[iterator]`

##### asOptional()

> **asOptional**(`key`): [`Optional`](#optional)<`V`>

Defined in: packages/aide/src/map.ts:54

Retrieve the value for the provided key as an [Optional](#optional).

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |

###### Returns

[`Optional`](#optional)<`V`>

##### clear()

> **clear**(): `void`

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:20

###### Returns

`void`

###### Inherited from

`Map.clear`

##### clearAndReturn()

> **clearAndReturn**(): `this`

Defined in: packages/aide/src/map.ts:61

Same as Map#clear but returns this instance after clearing.

###### Returns

`this`

##### compute()

> **compute**(`key`, `remapper`): [`Optional`](#optional)<`V`>

Defined in: packages/aide/src/map.ts:73

Attempts to compute a mapping for the specified key and its current mapped value, or undefined if there is no
current mapping. If the remapping function returns undefined or null, the mapping is removed (or remains absent
if initially absent).

###### Parameters

| Parameter  | Type                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `key`      | `K`                                                                                                                                     |
| `remapper` | [`Mapper`](#mapper)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `undefined` \| `V`; }, [`Optional`](#optional)<`V`>> |

###### Returns

[`Optional`](#optional)<`V`>

An optional containing the value associated with the provided key.

##### computeIfAbsent()

> **computeIfAbsent**(`key`, `mapper`): [`Optional`](#optional)<`V`>

Defined in: packages/aide/src/map.ts:87

If the value for the specified key is absent, attempts to compute its value using the given mapping function and
enters it into this map unless undefined or null.

###### Parameters

| Parameter | Type                                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| `key`     | `K`                                                                                                        |
| `mapper`  | [`Mapper`](#mapper)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; }, [`Optional`](#optional)<`V`>> |

###### Returns

[`Optional`](#optional)<`V`>

An optional containing the value associated with the provided key.

##### computeIfPresent()

> **computeIfPresent**(`key`, `remapper`): [`Optional`](#optional)<`V`>

Defined in: packages/aide/src/map.ts:104

If the value for the specified key is present, attempts to compute a new mapping given the key and its current
mapped value. If the remapping function returns undefined or null, the mapping is removed.

###### Parameters

| Parameter  | Type                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `key`      | `K`                                                                                                                                     |
| `remapper` | [`Mapper`](#mapper)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }, [`Optional`](#optional)<`V`>> |

###### Returns

[`Optional`](#optional)<`V`>

An optional containing the value associated with the provided key.

##### contains()

> **contains**(`item`): `boolean`

Defined in: packages/aide/src/map.ts:115

Returns true if this map maps one or more keys to the specified value.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `item`    | `V`  |

###### Returns

`boolean`

##### delete()

> **delete**(`key`): `boolean`

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:24

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |

###### Returns

`boolean`

true if an element in the Map existed and has been removed, or false if the element does not exist.

###### Inherited from

`Map.delete`

##### each()

> **each**(`consumer`): `this`

Defined in: packages/aide/src/map.ts:122

Similar to Map#forEach except return this at the end and the consumer retrieves the data differently.

###### Parameters

| Parameter  | Type                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `consumer` | [`Consumer`](#consumer)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }> |

###### Returns

`this`

##### entries()

> **entries**(): `MapIterator`<\[`K`, `V`]>

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:148

Returns an iterable of key, value pairs for every entry in the map.

###### Returns

`MapIterator`<\[`K`, `V`]>

###### Inherited from

`Map.entries`

##### entriesAsArray()

> **entriesAsArray**(): \[`K`, `V`]\[]

Defined in: packages/aide/src/map.ts:130

Get the entries as an array.

###### Returns

\[`K`, `V`]\[]

##### every()

> **every**(`predicate`): `boolean`

Defined in: packages/aide/src/map.ts:137

Returns true if every entry in this map satisfies the given predicate.

###### Parameters

| Parameter   | Type                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `predicate` | [`Predicate`](#predicate)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }> |

###### Returns

`boolean`

##### filter()

> **filter**(`predicate`): [`MapPlus`](#mapplus)<`K`, `V`>

Defined in: packages/aide/src/map.ts:146

Create a new map by only keeping the entries that satisfies the provided predicate.

###### Parameters

| Parameter   | Type                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `predicate` | [`Predicate`](#predicate)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }> |

###### Returns

[`MapPlus`](#mapplus)<`K`, `V`>

##### find()

> **find**(`predicate`): [`Optional`](#optional)<`V`>

Defined in: packages/aide/src/map.ts:157

Get an optional for the first value that matches the given predicate.

###### Parameters

| Parameter   | Type                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `predicate` | [`Predicate`](#predicate)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }> |

###### Returns

[`Optional`](#optional)<`V`>

##### forEach()

> **forEach**(`callbackfn`, `thisArg`?): `void`

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:28

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

##### get()

> **get**(`key`): `undefined` | `V`

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:33

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

##### getOrDefault()

> **getOrDefault**(`key`, `defaultValue`): `V`

Defined in: packages/aide/src/map.ts:167

If this map has the provided key, return the value associated with that key, otherwise return the provided
default value.

###### Parameters

| Parameter      | Type |
| -------------- | ---- |
| `key`          | `K`  |
| `defaultValue` | `V`  |

###### Returns

`V`

##### getOrThrow()

> **getOrThrow**(`key`): `NonNullable`<`V`>

Defined in: packages/aide/src/map.ts:174

Similar to Map#get but will throw an Error if the key does not exist.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |

###### Returns

`NonNullable`<`V`>

##### groupBy()

> **groupBy**<`K2`>(`classifier`): [`MapPlus`](#mapplus)<`K2`, [`MapPlus`](#mapplus)<`K`, `V`>>

Defined in: packages/aide/src/map.ts:185

Groups the entries of this map by the result of the classifier function.

###### Type Parameters

| Type Parameter                             |
| ------------------------------------------ |
| `K2` *extends* [`MapPlusKey`](#mappluskey) |

###### Parameters

| Parameter    | Type                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `classifier` | [`Mapper`](#mapper)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }, `K2`> |

###### Returns

[`MapPlus`](#mapplus)<`K2`, [`MapPlus`](#mapplus)<`K`, `V`>>

##### has()

> **has**(`key`): `boolean`

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:37

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |

###### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

###### Inherited from

`Map.has`

##### isEmpty()

> **isEmpty**(): `boolean`

Defined in: packages/aide/src/map.ts:204

Returns true if this map contains no key-value mappings.

###### Returns

`boolean`

##### keys()

> **keys**(): `MapIterator`<`K`>

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:153

Returns an iterable of keys in the map

###### Returns

`MapIterator`<`K`>

###### Inherited from

`Map.keys`

##### keysArray()

> **keysArray**(): `K`\[]

Defined in: packages/aide/src/map.ts:211

Retrieve the keys as an array.

###### Returns

`K`\[]

##### mapKeys()

> **mapKeys**<`R`>(`mapper`): [`MapPlus`](#mapplus)<`R`, `V`>

Defined in: packages/aide/src/map.ts:220

Create a new version of this map with the keys mapped to a different value with the provided mapper. Please note
that no consideration will be made in validate the keys are not duplicated meaning if the mapper function
generates the same key multiple times, the later will override the previous value.

###### Type Parameters

| Type Parameter                            |
| ----------------------------------------- |
| `R` *extends* [`MapPlusKey`](#mappluskey) |

###### Parameters

| Parameter | Type                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| `mapper`  | [`Mapper`](#mapper)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }, `R`> |

###### Returns

[`MapPlus`](#mapplus)<`R`, `V`>

##### mapValues()

> **mapValues**<`R`>(`mapper`): [`MapPlus`](#mapplus)<`K`, `R`>

Defined in: packages/aide/src/map.ts:232

Create a new version of this map with the values mapped to a different value with the provided mapper.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| `mapper`  | [`Mapper`](#mapper)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }, `R`> |

###### Returns

[`MapPlus`](#mapplus)<`K`, `R`>

##### set()

> **set**(`key`, `value`): `this`

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.collection.d.ts:41

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

##### setAll()

> **setAll**(`map`): `this`

Defined in: packages/aide/src/map.ts:244

Set all key/value pair in the given map to this map.

###### Parameters

| Parameter | Type                                                    |
| --------- | ------------------------------------------------------- |
| `map`     | `Map`<`K`, `V`> \| `Record`<`K`, `V`> \| \[`K`, `V`]\[] |

###### Returns

`this`

##### setIfAbsent()

> **setIfAbsent**(`key`, `value`): `V`

Defined in: packages/aide/src/map.ts:259

Set the provided value to the provided key if it doesn't exists, returning the new current value.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `key`     | `K`  |
| `value`   | `V`  |

###### Returns

`V`

##### some()

> **some**(`predicate`): `boolean`

Defined in: packages/aide/src/map.ts:271

Returns true if at least one entry in this map satisfies the provided predicate.

###### Parameters

| Parameter   | Type                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `predicate` | [`Predicate`](#predicate)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }> |

###### Returns

`boolean`

##### toObject()

> **toObject**<`K2`, `V2`>(`__namedParameters`): `Record`<`K2`, `V2`>

Defined in: packages/aide/src/map.ts:280

Convert this to an object of key/value pair with possibility of mapping the key and value.

###### Type Parameters

| Type Parameter                             |
| ------------------------------------------ |
| `K2` *extends* [`MapPlusKey`](#mappluskey) |
| `V2`                                       |

###### Parameters

| Parameter                        | Type                                                                                                                                                                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`              | { `keyMapper`: [`Mapper`](#mapper)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }, `K2`>; `valueMapper`: [`Mapper`](#mapper)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }, `V2`>; } |
| `__namedParameters.keyMapper`?   | [`Mapper`](#mapper)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }, `K2`>                                                                                                                                                   |
| `__namedParameters.valueMapper`? | [`Mapper`](#mapper)<{ `key`: `K`; `map`: [`MapPlus`](#mapplus)<`K`, `V`>; `value`: `NonNullable`<`V`>; }, `V2`>                                                                                                                                                   |

###### Returns

`Record`<`K2`, `V2`>

##### values()

> **values**(): `MapIterator`<`V`>

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:158

Returns an iterable of values in the map

###### Returns

`MapIterator`<`V`>

###### Inherited from

`Map.values`

##### valuesArray()

> **valuesArray**(): `V`\[]

Defined in: packages/aide/src/map.ts:301

Retrieves all values as an array.

###### Returns

`V`\[]

##### groupBy()

> `static` **groupBy**<`K`, `T`>(`items`, `keySelector`): `Map`<`K`, `T`\[]>

Defined in: common/temp/node\_modules/.pnpm/typescript\@5.8.2/node\_modules/typescript/lib/lib.es2024.collection.d.ts:25

Groups members of an iterable according to the return value of the passed callback.

###### Type Parameters

| Type Parameter |
| -------------- |
| `K`            |
| `T`            |

###### Parameters

| Parameter     | Type                     | Description                                              |
| ------------- | ------------------------ | -------------------------------------------------------- |
| `items`       | `Iterable`<`T`>          | An iterable.                                             |
| `keySelector` | (`item`, `index`) => `K` | A callback which will be invoked for each item in items. |

###### Returns

`Map`<`K`, `T`\[]>

###### Inherited from

`Map.groupBy`

***

### PresentOptional\<T>

Defined in: packages/aide/src/optional.ts:133

Wrapper around values that are either present or absent (null or undefined).

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Implements

* [`Optional`](#optional)<`T`>

#### Constructors

##### Constructor

> **new PresentOptional**<`T`>(`value`): [`PresentOptional`](#presentoptional)<`T`>

Defined in: packages/aide/src/optional.ts:134

###### Parameters

| Parameter | Type               |
| --------- | ------------------ |
| `value`   | `NonNullable`<`T`> |

###### Returns

[`PresentOptional`](#presentoptional)<`T`>

#### Methods

##### filter()

> **filter**(`predicate`): [`Optional`](#optional)<`T`>

Defined in: packages/aide/src/optional.ts:136

If a value is present and the value matches the given predicate, return an Optional describing the value,
otherwise return an empty Optional.

###### Parameters

| Parameter   | Type                                          |
| ----------- | --------------------------------------------- |
| `predicate` | [`Predicate`](#predicate)<`NonNullable`<`T`>> |

###### Returns

[`Optional`](#optional)<`T`>

###### Implementation of

[`Optional`](#optional).[`filter`](#filter-6)

##### flatMap()

> **flatMap**<`R`>(`mapper`): [`Optional`](#optional)<`R`>

Defined in: packages/aide/src/optional.ts:140

If a value is present, apply the provided Optional-bearing mapping function to it, return that result, otherwise
return an empty Optional. This method is similar to [map](#map-4), but the provided mapper is one whose result is
already an Optional, and if invoked, flatMap does not wrap it with an additional Optional.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type                                                                  |
| --------- | --------------------------------------------------------------------- |
| `mapper`  | [`Mapper`](#mapper)<`NonNullable`<`T`>, [`Optional`](#optional)<`R`>> |

###### Returns

[`Optional`](#optional)<`R`>

###### Implementation of

[`Optional`](#optional).[`flatMap`](#flatmap-4)

##### getOrThrow()

> **getOrThrow**(): `NonNullable`<`T`>

Defined in: packages/aide/src/optional.ts:144

If the value is present, returns the value, otherwise throws an Error.

###### Returns

`NonNullable`<`T`>

###### Implementation of

[`Optional`](#optional).[`getOrThrow`](#getorthrow-6)

##### ifAbsent()

> **ifAbsent**(`handler`): `this`

Defined in: packages/aide/src/optional.ts:148

If the value is absent, invoke the specified handler, otherwise do nothing.

###### Parameters

| Parameter | Type                    |
| --------- | ----------------------- |
| `handler` | [`Runnable`](#runnable) |

###### Returns

`this`

###### Implementation of

[`Optional`](#optional).[`ifAbsent`](#ifabsent-4)

##### ifPresent()

> **ifPresent**(`consumer`): `this`

Defined in: packages/aide/src/optional.ts:152

If a value is present, invoke the specified consumer with the value, otherwise do nothing.

###### Parameters

| Parameter  | Type                                        |
| ---------- | ------------------------------------------- |
| `consumer` | [`Consumer`](#consumer)<`NonNullable`<`T`>> |

###### Returns

`this`

###### Implementation of

[`Optional`](#optional).[`ifPresent`](#ifpresent-4)

##### isAbsent()

> **isAbsent**(): `this is AbsentOptional<T>`

Defined in: packages/aide/src/optional.ts:157

If a value is absent (null or undefined), returns true, otherwise false.

###### Returns

`this is AbsentOptional<T>`

###### Implementation of

[`Optional`](#optional).[`isAbsent`](#isabsent-4)

##### isPresent()

> **isPresent**(): `this is PresentOptional<T>`

Defined in: packages/aide/src/optional.ts:161

If a value is present, returns true, otherwise false.

###### Returns

`this is PresentOptional<T>`

###### Implementation of

[`Optional`](#optional).[`isPresent`](#ispresent-4)

##### map()

> **map**<`R`>(`mapper`): [`Optional`](#optional)<`R`>

Defined in: packages/aide/src/optional.ts:165

If a value is present, apply the provided mapping function to it, and if the result is present, return an
Optional describing the result, otherwise, return an empty Optional.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `mapper`  | [`Mapper`](#mapper)<`NonNullable`<`T`>, `R`> |

###### Returns

[`Optional`](#optional)<`R`>

###### Implementation of

[`Optional`](#optional).[`map`](#map-4)

##### or()

> **or**(`other`): [`Optional`](#optional)<`T`>

Defined in: packages/aide/src/optional.ts:169

If a value is present, returns an Optional describing the value, otherwise returns an Optional produced by the
supplying function.

###### Parameters

| Parameter | Type                                                  |
| --------- | ----------------------------------------------------- |
| `other`   | [`Supplier`](#supplier)<[`Optional`](#optional)<`T`>> |

###### Returns

[`Optional`](#optional)<`T`>

###### Implementation of

[`Optional`](#optional).[`or`](#or-4)

##### orElse()

> **orElse**(`other`): `T`

Defined in: packages/aide/src/optional.ts:173

If a value is present, returns the value, otherwise returns other.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `other`   | `T`  |

###### Returns

`T`

###### Implementation of

[`Optional`](#optional).[`orElse`](#orelse-4)

##### orElseGet()

> **orElseGet**(`other`): `T`

Defined in: packages/aide/src/optional.ts:177

If a value is present, returns the value, otherwise returns the result produced by the supplying function.

###### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `other`   | [`Supplier`](#supplier)<`T`> |

###### Returns

`T`

###### Implementation of

[`Optional`](#optional).[`orElseGet`](#orelseget-4)

##### orElseThrow()

> **orElseThrow**<`X`>(`other`): `T`

Defined in: packages/aide/src/optional.ts:181

If a value is present, returns the value, otherwise throws an exception to be created by the provided supplier.

###### Type Parameters

| Type Parameter |
| -------------- |
| `X`            |

###### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `other`   | [`Supplier`](#supplier)<`X`> |

###### Returns

`T`

###### Implementation of

[`Optional`](#optional).[`orElseThrow`](#orelsethrow-4)

##### orUndefined()

> **orUndefined**(): `NonNullable`<`T`>

Defined in: packages/aide/src/optional.ts:185

If a value is present, returns the value, otherwise return undefined.

###### Returns

`NonNullable`<`T`>

###### Implementation of

[`Optional`](#optional).[`orUndefined`](#orundefined-4)

***

### Queue\<T>

Defined in: packages/aide/src/queue.ts:76

Queue that execute handlers as per the configured concurrency limit. It also has the ability to rate limit how much
execution happens within an interval.

#### Type Parameters

| Type Parameter | Default type | Description                                                                             |
| -------------- | ------------ | --------------------------------------------------------------------------------------- |
| `T`            | `void`       | The type of the item that the promise resolves with for the handlers. Defaults to void. |

#### Constructors

##### Constructor

> **new Queue**<`T`>(`__namedParameters`): [`Queue`](#queue)<`T`>

Defined in: packages/aide/src/queue.ts:146

Create a new instance.

###### Parameters

| Parameter                           | Type                                                                               | Description                                                                                                                                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`                 | { `intervalMs`: `number`; `maxConcurrent`: `number`; `maxPerInterval`: `number`; } | -                                                                                                                                                                                                       |
| `__namedParameters.intervalMs`?     | `number`                                                                           | If given in addition with `maxPerInterval`, used to limit how many items can execute within an interval. This is simply the time, in milliseconds, for when to reset the execution counts per interval. |
| `__namedParameters.maxConcurrent`   | `number`                                                                           | Maximum number of concurrent executions.                                                                                                                                                                |
| `__namedParameters.maxPerInterval`? | `number`                                                                           | If given in addition with `intervalMs`, used to limit how many items can execute within an interval. This is simply the maximum number of executions within the interval.                               |

###### Returns

[`Queue`](#queue)<`T`>

#### Properties

| Property                                     | Modifier   | Type     | Description                                                                                                                                                                                             |
| -------------------------------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="intervalms"></a> `intervalMs`         | `readonly` | `number` | If given in addition with `maxPerInterval`, used to limit how many items can execute within an interval. This is simply the time, in milliseconds, for when to reset the execution counts per interval. |
| <a id="maxconcurrent"></a> `maxConcurrent`   | `readonly` | `number` | Maximum number of concurrent executions.                                                                                                                                                                |
| <a id="maxperinterval"></a> `maxPerInterval` | `readonly` | `number` | If given in addition with `intervalMs`, used to limit how many items can execute within an interval. This is simply the maximum number of executions within the interval.                               |

#### Methods

##### add()

> **add**(`item`): { `onAfterStart`: `Promise`<`void`>; `onBeforeStart`: `Promise`<`void`>; `onEnd`: `Promise`<`T`>; }

Defined in: packages/aide/src/queue.ts:157

Add a new item to the queue for execution.

###### Parameters

| Parameter | Type                           |
| --------- | ------------------------------ |
| `item`    | [`QueueItem`](#queueitem)<`T`> |

###### Returns

{ `onAfterStart`: `Promise`<`void`>; `onBeforeStart`: `Promise`<`void`>; `onEnd`: `Promise`<`T`>; }

| Name            | Type              | Description                                                                                                        |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `onAfterStart`  | `Promise`<`void`> | Promised that is resolved right after the handler is executed but not necessarily after it has finished execution. |
| `onBeforeStart` | `Promise`<`void`> | Promised that is resolved right before the handler is executed.                                                    |
| `onEnd`         | `Promise`<`T`>    | Promised that is resolved after the handler finished executing.                                                    |

###### Throws

Error if items can no longer be added.

##### lockQueue()

> **lockQueue**(): `Promise`<`void`>

Defined in: packages/aide/src/queue.ts:181

Lock the queue and return a promise that will resolve when all the handlers finished execution.

###### Returns

`Promise`<`void`>

## Interfaces

### Optional\<T>

Defined in: packages/aide/src/optional.ts:6

Wrapper around values that are either present or absent (null or undefined).

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Methods

##### filter()

> **filter**(`predicate`): [`Optional`](#optional)<`T`>

Defined in: packages/aide/src/optional.ts:11

If a value is present and the value matches the given predicate, return an Optional describing the value,
otherwise return an empty Optional.

###### Parameters

| Parameter   | Type                                          |
| ----------- | --------------------------------------------- |
| `predicate` | [`Predicate`](#predicate)<`NonNullable`<`T`>> |

###### Returns

[`Optional`](#optional)<`T`>

##### flatMap()

> **flatMap**<`R`>(`mapper`): [`Optional`](#optional)<`R`>

Defined in: packages/aide/src/optional.ts:18

If a value is present, apply the provided Optional-bearing mapping function to it, return that result, otherwise
return an empty Optional. This method is similar to [map](#map-4), but the provided mapper is one whose result is
already an Optional, and if invoked, flatMap does not wrap it with an additional Optional.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type                                                                  |
| --------- | --------------------------------------------------------------------- |
| `mapper`  | [`Mapper`](#mapper)<`NonNullable`<`T`>, [`Optional`](#optional)<`R`>> |

###### Returns

[`Optional`](#optional)<`R`>

##### getOrThrow()

> **getOrThrow**(): `NonNullable`<`T`>

Defined in: packages/aide/src/optional.ts:23

If the value is present, returns the value, otherwise throws an Error.

###### Returns

`NonNullable`<`T`>

##### ifAbsent()

> **ifAbsent**(`handler`): `this`

Defined in: packages/aide/src/optional.ts:28

If the value is absent, invoke the specified handler, otherwise do nothing.

###### Parameters

| Parameter | Type                    |
| --------- | ----------------------- |
| `handler` | [`Runnable`](#runnable) |

###### Returns

`this`

##### ifPresent()

> **ifPresent**(`consumer`): `this`

Defined in: packages/aide/src/optional.ts:33

If a value is present, invoke the specified consumer with the value, otherwise do nothing.

###### Parameters

| Parameter  | Type                                        |
| ---------- | ------------------------------------------- |
| `consumer` | [`Consumer`](#consumer)<`NonNullable`<`T`>> |

###### Returns

`this`

##### isAbsent()

> **isAbsent**(): `this is AbsentOptional<T>`

Defined in: packages/aide/src/optional.ts:38

If a value is absent (null or undefined), returns true, otherwise false.

###### Returns

`this is AbsentOptional<T>`

##### isPresent()

> **isPresent**(): `this is PresentOptional<T>`

Defined in: packages/aide/src/optional.ts:43

If a value is present, returns true, otherwise false.

###### Returns

`this is PresentOptional<T>`

##### map()

> **map**<`R`>(`mapper`): [`Optional`](#optional)<`R`>

Defined in: packages/aide/src/optional.ts:49

If a value is present, apply the provided mapping function to it, and if the result is present, return an
Optional describing the result, otherwise, return an empty Optional.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type                                         |
| --------- | -------------------------------------------- |
| `mapper`  | [`Mapper`](#mapper)<`NonNullable`<`T`>, `R`> |

###### Returns

[`Optional`](#optional)<`R`>

##### or()

> **or**(`other`): [`Optional`](#optional)<`T`>

Defined in: packages/aide/src/optional.ts:55

If a value is present, returns an Optional describing the value, otherwise returns an Optional produced by the
supplying function.

###### Parameters

| Parameter | Type                                                  |
| --------- | ----------------------------------------------------- |
| `other`   | [`Supplier`](#supplier)<[`Optional`](#optional)<`T`>> |

###### Returns

[`Optional`](#optional)<`T`>

##### orElse()

> **orElse**(`other`): `T`

Defined in: packages/aide/src/optional.ts:60

If a value is present, returns the value, otherwise returns other.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `other`   | `T`  |

###### Returns

`T`

##### orElseGet()

> **orElseGet**(`other`): `T`

Defined in: packages/aide/src/optional.ts:65

If a value is present, returns the value, otherwise returns the result produced by the supplying function.

###### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `other`   | [`Supplier`](#supplier)<`T`> |

###### Returns

`T`

##### orElseThrow()

> **orElseThrow**<`X`>(`other`): `T`

Defined in: packages/aide/src/optional.ts:70

If a value is present, returns the value, otherwise throws an exception to be created by the provided supplier.

###### Type Parameters

| Type Parameter |
| -------------- |
| `X`            |

###### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `other`   | [`Supplier`](#supplier)<`X`> |

###### Returns

`T`

##### orUndefined()

> **orUndefined**(): `undefined` | `NonNullable`<`T`>

Defined in: packages/aide/src/optional.ts:75

If a value is present, returns the value, otherwise return undefined.

###### Returns

`undefined` | `NonNullable`<`T`>

***

### QueueConstructorOptions

Defined in: packages/aide/src/queue.ts:35

Arguments for constructing a [Queue](#queue).

#### Properties

| Property                                        | Type     | Description                                                                                                                                                                                             |
| ----------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="intervalms-1"></a> `intervalMs?`         | `number` | If given in addition with `maxPerInterval`, used to limit how many items can execute within an interval. This is simply the time, in milliseconds, for when to reset the execution counts per interval. |
| <a id="maxconcurrent-1"></a> `maxConcurrent`    | `number` | Maximum number of concurrent executions.                                                                                                                                                                |
| <a id="maxperinterval-1"></a> `maxPerInterval?` | `number` | If given in addition with `intervalMs`, used to limit how many items can execute within an interval. This is simply the maximum number of executions within the interval.                               |

## Type Aliases

### AnyArray\<V>

> **AnyArray**<`V`> = `V`\[] | `ReadonlyArray`<`V`>

Defined in: packages/aide/src/types.ts:11

Type matching against both a writable array and a readonly array.

#### Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `V`            | The type of each item in the array. |

***

### Awaitable\<T>

> **Awaitable**<`T`> = `T` | `Promise`<`T`>

Defined in: packages/aide/src/types.ts:4

The type is simply `T` or a promise which, when resolved, is given `T`.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

***

### AwaitableBiConsumer()\<T, U>

> **AwaitableBiConsumer**<`T`, `U`> = (`t`, `u`) => [`Awaitable`](#awaitable)<`void`>

Defined in: packages/aide/src/function.ts:6

Represents an operation that accepts two input arguments and returns no result. This operation returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |

#### Returns

[`Awaitable`](#awaitable)<`void`>

***

### AwaitableBiMapper()\<T, U, R>

> **AwaitableBiMapper**<`T`, `U`, `R`> = (`t`, `u`) => [`Awaitable`](#awaitable)<`R`>

Defined in: packages/aide/src/function.ts:11

Represents a function that accepts two arguments and produces a result. This function returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |
| `R`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |

#### Returns

[`Awaitable`](#awaitable)<`R`>

***

### AwaitableBinaryOperator()\<T>

> **AwaitableBinaryOperator**<`T`> = (`left`, `right`) => [`Awaitable`](#awaitable)<`T`>

Defined in: packages/aide/src/function.ts:16

Represents an operation upon two operands of the same type, producing a result of the same type as the operands. This operation returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `left`    | `T`  |
| `right`   | `T`  |

#### Returns

[`Awaitable`](#awaitable)<`T`>

***

### AwaitableBiPredicate()\<T, U>

> **AwaitableBiPredicate**<`T`, `U`> = (`t`, `u`) => [`Awaitable`](#awaitable)<`boolean`>

Defined in: packages/aide/src/function.ts:21

Represents a predicate (boolean-valued function) of two arguments. This predicate returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |

#### Returns

[`Awaitable`](#awaitable)<`boolean`>

***

### AwaitableConsumer()\<T>

> **AwaitableConsumer**<`T`> = (`t`) => [`Awaitable`](#awaitable)<`void`>

Defined in: packages/aide/src/function.ts:26

Represents an operation that accepts a single input argument and returns no result. This operation returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |

#### Returns

[`Awaitable`](#awaitable)<`void`>

***

### AwaitableMapper()\<T, R>

> **AwaitableMapper**<`T`, `R`> = (`t`) => [`Awaitable`](#awaitable)<`R`>

Defined in: packages/aide/src/function.ts:31

Represents a function that accepts one argument and produces a result. This function returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `R`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |

#### Returns

[`Awaitable`](#awaitable)<`R`>

***

### AwaitablePredicate()\<T>

> **AwaitablePredicate**<`T`> = (`t`) => [`Awaitable`](#awaitable)<`boolean`>

Defined in: packages/aide/src/function.ts:41

Represents a predicate (boolean-valued function) of one argument. This predicate returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |

#### Returns

[`Awaitable`](#awaitable)<`boolean`>

***

### AwaitableRunnable()

> **AwaitableRunnable** = () => [`Awaitable`](#awaitable)<`void`>

Defined in: packages/aide/src/function.ts:36

Represents a runnable task that takes no arguments and returns no result. This task returns an Awaitable.

#### Returns

[`Awaitable`](#awaitable)<`void`>

***

### AwaitableSupplier()\<T>

> **AwaitableSupplier**<`T`> = () => [`Awaitable`](#awaitable)<`T`>

Defined in: packages/aide/src/function.ts:46

Represents a supplier of results. This supplier returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Returns

[`Awaitable`](#awaitable)<`T`>

***

### AwaitableTernaryOperator()\<T>

> **AwaitableTernaryOperator**<`T`> = (`first`, `second`, `third`) => [`Awaitable`](#awaitable)<`T`>

Defined in: packages/aide/src/function.ts:51

Represents an operation upon three operands of the same type, producing a result of the same type as the operands. This operation returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `first`   | `T`  |
| `second`  | `T`  |
| `third`   | `T`  |

#### Returns

[`Awaitable`](#awaitable)<`T`>

***

### AwaitableTriConsumer()\<T, U, V>

> **AwaitableTriConsumer**<`T`, `U`, `V`> = (`t`, `u`, `v`) => [`Awaitable`](#awaitable)<`void`>

Defined in: packages/aide/src/function.ts:56

Represents an operation that accepts three input arguments and returns no result. This operation returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |
| `V`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |
| `v`       | `V`  |

#### Returns

[`Awaitable`](#awaitable)<`void`>

***

### AwaitableTriMapper()\<T, U, V, R>

> **AwaitableTriMapper**<`T`, `U`, `V`, `R`> = (`t`, `u`, `v`) => [`Awaitable`](#awaitable)<`R`>

Defined in: packages/aide/src/function.ts:61

Represents a function that accepts three arguments and produces a result. This function returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |
| `V`            |
| `R`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |
| `v`       | `V`  |

#### Returns

[`Awaitable`](#awaitable)<`R`>

***

### AwaitableTriPredicate()\<T, U, V>

> **AwaitableTriPredicate**<`T`, `U`, `V`> = (`t`, `u`, `v`) => [`Awaitable`](#awaitable)<`boolean`>

Defined in: packages/aide/src/function.ts:66

Represents a predicate (boolean-valued function) of three arguments. This predicate returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |
| `V`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |
| `v`       | `V`  |

#### Returns

[`Awaitable`](#awaitable)<`boolean`>

***

### AwaitableUnaryOperator()\<T>

> **AwaitableUnaryOperator**<`T`> = (`t`) => [`Awaitable`](#awaitable)<`T`>

Defined in: packages/aide/src/function.ts:71

Represents an operation on a single operand that produces a result of the same type as its operand. This operation returns an Awaitable.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |

#### Returns

[`Awaitable`](#awaitable)<`T`>

***

### BiConsumer()\<T, U>

> **BiConsumer**<`T`, `U`> = (`t`, `u`) => `void`

Defined in: packages/aide/src/function.ts:76

Represents an operation that accepts two input arguments and returns no result.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |

#### Returns

`void`

***

### BiMapper()\<T, U, R>

> **BiMapper**<`T`, `U`, `R`> = (`t`, `u`) => `R`

Defined in: packages/aide/src/function.ts:81

Represents a function that accepts two arguments and produces a result.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |
| `R`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |

#### Returns

`R`

***

### BinaryOperator()\<T>

> **BinaryOperator**<`T`> = (`left`, `right`) => `T`

Defined in: packages/aide/src/function.ts:86

Represents an operation upon two operands of the same type, producing a result of the same type as the operands.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `left`    | `T`  |
| `right`   | `T`  |

#### Returns

`T`

***

### BiPredicate()\<T, U>

> **BiPredicate**<`T`, `U`> = (`t`, `u`) => `boolean`

Defined in: packages/aide/src/function.ts:91

Represents a predicate (boolean-valued function) of two arguments.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |

#### Returns

`boolean`

***

### Consumer()\<T>

> **Consumer**<`T`> = (`t`) => `void`

Defined in: packages/aide/src/function.ts:96

Represents an operation that accepts a single input argument and returns no result.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |

#### Returns

`void`

***

### Mapper()\<T, R>

> **Mapper**<`T`, `R`> = (`t`) => `R`

Defined in: packages/aide/src/function.ts:101

Represents a function that accepts one argument and produces a result.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `R`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |

#### Returns

`R`

***

### MapPlusKey

> **MapPlusKey** = `string` | `number` | `symbol`

Defined in: packages/aide/src/map.ts:21

The possible type for a key.

***

### MarkReadonly\<T, K>

> **MarkReadonly**<`T`, `K`> = `Omit`<`T`, `K`> & `Readonly`<`Pick`<`T`, `K`>>

Defined in: packages/aide/src/types.ts:16

For a given object, T, mark the keys given as being readonly.

#### Type Parameters

| Type Parameter          |
| ----------------------- |
| `T`                     |
| `K` *extends* keyof `T` |

***

### Merge\<T, U>

> **Merge**<`T`, `U`> = [`Simplify`](#simplify)<`Omit`<`T`, keyof `U`> & `U`>

Defined in: packages/aide/src/types.ts:21

Merge the two types together with the properties from second type overwriting the first.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |

***

### NonEmptyArray\<T>

> **NonEmptyArray**<`T`> = \[`T`, `...T[]`]

Defined in: packages/aide/src/types.ts:26

For a non-empty array.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

***

### Predicate()\<T>

> **Predicate**<`T`> = (`t`) => `boolean`

Defined in: packages/aide/src/function.ts:111

Represents a predicate (boolean-valued function) of one argument.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |

#### Returns

`boolean`

***

### QueueItem()\<T>

> **QueueItem**<`T`> = () => [`Awaitable`](#awaitable)<`T`>

Defined in: packages/aide/src/queue.ts:28

An item in the queue.

#### Type Parameters

| Type Parameter | Default type | Description                                                            |
| -------------- | ------------ | ---------------------------------------------------------------------- |
| `T`            | `void`       | The type of the item that the promise resolves with. Defaults to void. |

#### Returns

[`Awaitable`](#awaitable)<`T`>

***

### Runnable()

> **Runnable** = () => `void`

Defined in: packages/aide/src/function.ts:106

Represents a runnable task that takes no arguments and returns no result.

#### Returns

`void`

***

### Simplify\<T>

> **Simplify**<`T`> = `{ [KeyType in keyof T]: T[KeyType] }` & `NonNullable`<`unknown`>

Defined in: packages/aide/src/types.ts:31

Refer to <https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts>.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

***

### SimplifyOmit\<T, K>

> **SimplifyOmit**<`T`, `K`> = [`Simplify`](#simplify)<`Omit`<`T`, `K`>>

Defined in: packages/aide/src/types.ts:36

Wrapping Simplify over Omit.

#### Type Parameters

| Type Parameter          |
| ----------------------- |
| `T`                     |
| `K` *extends* keyof `T` |

***

### Supplier()\<T>

> **Supplier**<`T`> = () => `T`

Defined in: packages/aide/src/function.ts:116

Represents a supplier of results.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Returns

`T`

***

### TernaryOperator()\<T>

> **TernaryOperator**<`T`> = (`first`, `second`, `third`) => `T`

Defined in: packages/aide/src/function.ts:121

Represents an operation upon three operands of the same type, producing a result of the same type as the operands.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `first`   | `T`  |
| `second`  | `T`  |
| `third`   | `T`  |

#### Returns

`T`

***

### TriConsumer()\<T, U, V>

> **TriConsumer**<`T`, `U`, `V`> = (`t`, `u`, `v`) => `void`

Defined in: packages/aide/src/function.ts:126

Represents an operation that accepts three input arguments and returns no result.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |
| `V`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |
| `v`       | `V`  |

#### Returns

`void`

***

### TriMapper()\<T, U, V, R>

> **TriMapper**<`T`, `U`, `V`, `R`> = (`t`, `u`, `v`) => `R`

Defined in: packages/aide/src/function.ts:131

Represents a function that accepts three arguments and produces a result.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |
| `V`            |
| `R`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |
| `v`       | `V`  |

#### Returns

`R`

***

### TriPredicate()\<T, U, V>

> **TriPredicate**<`T`, `U`, `V`> = (`t`, `u`, `v`) => `boolean`

Defined in: packages/aide/src/function.ts:136

Represents a predicate (boolean-valued function) of three arguments.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |
| `V`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |
| `u`       | `U`  |
| `v`       | `V`  |

#### Returns

`boolean`

***

### UnaryOperator()\<T>

> **UnaryOperator**<`T`> = (`t`) => `T`

Defined in: packages/aide/src/function.ts:141

Represents an operation on a single operand that produces a result of the same type as its operand.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `t`       | `T`  |

#### Returns

`T`

***

### UndefinedFallback\<T, Fallback>

> **UndefinedFallback**<`T`, `Fallback`> = \[`T`] *extends* \[`undefined`] ? `Fallback` : `T`

Defined in: packages/aide/src/types.ts:40

If the given type, `T` is undefined, return `Fallback`, otherwise just return \`T.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `Fallback`     |

## Functions

### asNonEmptyArray()

> **asNonEmptyArray**<`V`>(`list`): \[`V`, `...V[]`]

Defined in: packages/aide/src/arrays.ts:13

Ensure that the given list is not empty.

#### Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `V`            | The type of each item in the array. |

#### Parameters

| Parameter | Type                         | Description                      |
| --------- | ---------------------------- | -------------------------------- |
| `list`    | [`AnyArray`](#anyarray)<`V`> | The list to ensure is not empty. |

#### Returns

\[`V`, `...V[]`]

The same list.

***

### createOptional()

> **createOptional**<`T`>(`value`): [`Optional`](#optional)<`T`>

Defined in: packages/aide/src/optional.ts:195

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

[`Optional`](#optional)<`T`>

***

### ensureType()

> **ensureType**<`V`>(): <`T`>(`list`) => readonly `T`\[]

Defined in: packages/aide/src/arrays.ts:37

This function is primarily here to help with stricter typing. When Typescript allows for partial inference of
arguments to functions, this function would likely not be needed anymore.

#### Type Parameters

| Type Parameter | Description                         |
| -------------- | ----------------------------------- |
| `V`            | The type of each item in the array. |

#### Returns

An identity function that accepts a list and simply returns it.

> <`T`>(`list`): readonly `T`\[]

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

***

### executeTasks()

> **executeTasks**<`T`>(`tasks`, `maxNumOfWorkers`): `Promise`<`T`\[]>

Defined in: packages/aide/src/queue.ts:13

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

***

### first()

> **first**<`V`>(`list`): `undefined` | `V`

Defined in: packages/aide/src/arrays.ts:46

Retrieve the first value in the given list or undefined if it is empty.

#### Type Parameters

| Type Parameter |
| -------------- |
| `V`            |

#### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `list`    | [`AnyArray`](#anyarray)<`V`> |

#### Returns

`undefined` | `V`

***

### firstDefined()

> **firstDefined**<`V`>(`list`): `undefined` | `V`

Defined in: packages/aide/src/arrays.ts:60

Execute the functions in the list and return the value of the first supplier that return a defined value.

#### Type Parameters

| Type Parameter |
| -------------- |
| `V`            |

#### Parameters

| Parameter | Type                                                                 |
| --------- | -------------------------------------------------------------------- |
| `list`    | [`AnyArray`](#anyarray)<[`Supplier`](#supplier)<`undefined` \| `V`>> |

#### Returns

`undefined` | `V`

***

### firstDefinedOpt()

> **firstDefinedOpt**<`V`>(`list`): [`Optional`](#optional)<`V`>

Defined in: packages/aide/src/arrays.ts:67

Same as [firstDefined](#firstdefined) except both the supplier and the return value of this should be an [Optional](#optional).

#### Type Parameters

| Type Parameter |
| -------------- |
| `V`            |

#### Parameters

| Parameter | Type                                                                           |
| --------- | ------------------------------------------------------------------------------ |
| `list`    | [`AnyArray`](#anyarray)<[`Supplier`](#supplier)<[`Optional`](#optional)<`V`>>> |

#### Returns

[`Optional`](#optional)<`V`>

***

### firstOpt()

> **firstOpt**<`V`>(`list`): [`Optional`](#optional)<`V`>

Defined in: packages/aide/src/arrays.ts:53

Same as [first](#first) except this returns an [Optional](#optional).

#### Type Parameters

| Type Parameter |
| -------------- |
| `V`            |

#### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `list`    | [`AnyArray`](#anyarray)<`V`> |

#### Returns

[`Optional`](#optional)<`V`>

***

### getOrDefault()

> **getOrDefault**<`K`, `V`>(`map`, `key`, `defaultValue`): `V`

Defined in: packages/aide/src/map.ts:14

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

***

### keepOnlyDefined()

> **keepOnlyDefined**<`V`>(`list`): `NonNullable`<`V`>\[]

Defined in: packages/aide/src/arrays.ts:80

Given a list of items, remove null and undefined from the list.

#### Type Parameters

| Type Parameter |
| -------------- |
| `V`            |

#### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `list`    | [`AnyArray`](#anyarray)<`V`> |

#### Returns

`NonNullable`<`V`>\[]

***

### toMap()

> **toMap**<`K`, `V`, `V2`>(`list`, `keySupplier`, `valueSupplier`): `Record`<`K`, `V2`>

Defined in: packages/aide/src/arrays.ts:95

Given a list, convert it to an object where the key will be provided using the given supplier.

#### Type Parameters

| Type Parameter              | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `K` *extends* `PropertyKey` | The type for the key that will be produced for the map. |
| `V`                         | The type of each item in the list.                      |
| `V2`                        | The type for the value when it is set to the map.       |

#### Parameters

| Parameter       | Type                                                | Description                                           |
| --------------- | --------------------------------------------------- | ----------------------------------------------------- |
| `list`          | [`AnyArray`](#anyarray)<`V`>                        | The list of items to convert.                         |
| `keySupplier`   | [`BiMapper`](#bimapper)<`V`, `number`, `K`>         | Function to use to generate the key for each entry.   |
| `valueSupplier` | [`TriMapper`](#trimapper)<`V`, `K`, `number`, `V2`> | Function to use to generate the value for each entry. |

#### Returns

`Record`<`K`, `V2`>

An object representation of the given list using the provided suppliers to generate the keys and values.

***

### toMapPlus()

> **toMapPlus**<`K`, `V`>(`from`): [`MapPlus`](#mapplus)<`K`, `V`>

Defined in: packages/aide/src/map.ts:36

Ensure the given is a [MapPlus](#mapplus).

#### Type Parameters

| Type Parameter                            |
| ----------------------------------------- |
| `K` *extends* [`MapPlusKey`](#mappluskey) |
| `V`                                       |

#### Parameters

| Parameter | Type                                                    |
| --------- | ------------------------------------------------------- |
| `from`    | `Map`<`K`, `V`> \| `Record`<`K`, `V`> \| \[`K`, `V`]\[] |

#### Returns

[`MapPlus`](#mapplus)<`K`, `V`>

***

### waitFor()

> **waitFor**(`timeMs`): `Promise`<`void`>

Defined in: packages/aide/src/promises.ts:6

Returns a promise which will resolve after the provided time.

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `timeMs`  | `number` |

#### Returns

`Promise`<`void`>
