# @ti-platform/aide

This package exposes some types and functions as utilities that can be used by other packages. Refer to the below API
Docs for more information.

## API Docs

### Type Aliases

- [AnyArray](README.md#anyarray)
- [MarkReadonly](README.md#markreadonly)

### Functions

- [ensureType](README.md#ensuretype)
- [executeTasks](README.md#executetasks)
- [first](README.md#first)
- [firstDefined](README.md#firstdefined)
- [keepOnlyDefined](README.md#keeponlydefined)
- [toMap](README.md#tomap)

## Type Aliases

### AnyArray

Ƭ **AnyArray**<`V`\>: `V`[] \| `ReadonlyArray`<`V`\>

Type matching against both a writable array and a readonly array.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Defined in

arrays.ts:4

___

### MarkReadonly

Ƭ **MarkReadonly**<`T`, `K`\>: `Omit`<`T`, `K`\> & `Readonly`<`Pick`<`T`, `K`\>\>

For a given object, T, mark the keys given as being readonly.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

types.ts:4

## Functions

### ensureType

▸ **ensureType**<`V`\>(): <T\>(`list`: readonly `T`[]) => readonly `T`[]

This function is primarily here to help with stricter typing. When Typescript allows for partial inference of
arguments to functions, this function would likely not be needed anymore.

**`Example`**

```ts
type MyItem = { name: string, displayName: string };
 const list = ensureType<MyItem>()([
     { name: 'one', displayName: 'ONE' },    // <- You get proper linting and hinting support here
     { name: 'two', displayName: 'TWO' },
 ] as const); // <- The "as const" allows for better type restrictions as below

 type Name = typeof list[number]['name'];    // == "one" | "two" vs string if not using this
```

#### Type parameters

| Name |
| :------ |
| `V` |

#### Returns

`fn`

▸ <`T`\>(`list`): readonly `T`[]

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `list` | readonly `T`[] |

##### Returns

readonly `T`[]

#### Defined in

arrays.ts:19

___

### executeTasks

▸ **executeTasks**<`T`\>(`tasks`, `maxNumOfWorkers?`): `Promise`<`T`[]\>

Given a list of tasks to execute, execute them, ensuring there is a maximum number of tasks actively running at the
same time. The returning array of responses should match the order of the task that was given.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tasks` | readonly () => `Promise`<`T`\>[] | `undefined` | The tasks to run. |
| `maxNumOfWorkers` | `number` | `10` | The maximum number of tasks to run at once. |

#### Returns

`Promise`<`T`[]\>

A promise that will resolve when all the tasks are completed.

#### Defined in

queue.ts:12

___

### first

▸ **first**<`V`\>(`list`): `undefined` \| `V`

Retrieve the first element of a list.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | [`AnyArray`](README.md#anyarray)<`V`\> | The list to retrieve the first element for. |

#### Returns

`undefined` \| `V`

#### Defined in

arrays.ts:31

___

### firstDefined

▸ **firstDefined**<`V`\>(`list`): `V`

Given a list of function, execute each until there is a function that does not return undefined. You should have at
least one of the function return something to prevent problems.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | [`AnyArray`](README.md#anyarray)<() => `undefined` \| `V`\> | The list of functions to execute. |

#### Returns

`V`

The return value of the first function to not return an undefined value.

#### Defined in

arrays.ts:44

___

### keepOnlyDefined

▸ **keepOnlyDefined**<`V`\>(`list`): `V`[]

Given a list of items, remove null and undefined from the list.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | [`AnyArray`](README.md#anyarray)<`V`\> | The list of items to traverse and filter. |

#### Returns

`V`[]

#### Defined in

arrays.ts:60

___

### toMap

▸ **toMap**<`K`, `V`, `V2`\>(`list`, `keySupplier`, `valueSupplier`): `Record`<`K`, `V2`\>

Given a list, convert it to a map where the key will be provided using the given supplier.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `PropertyKey` |
| `V` | `V` |
| `V2` | `V2` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | [`AnyArray`](README.md#anyarray)<`V`\> | The list of items to convert. |
| `keySupplier` | (`item`: `V`, `index`: `number`) => `K` | Function to use to generate the key for each entry. |
| `valueSupplier` | (`item`: `V`, `key`: `K`, `index`: `number`) => `V2` | Function to use to generate the value for each entry. |

#### Returns

`Record`<`K`, `V2`\>

#### Defined in

arrays.ts:74
