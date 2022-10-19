# @ti-platform/aide-vueuse

This package contains utility functions that makes use @vueuse/core and its functions.

## API Docs

### Enumerations

- [PollingState](enums/PollingState.md)

### Type Aliases

- [ElementOrComponentWithEl](README.md#elementorcomponentwithel)
- [UsePollingRetVal](README.md#usepollingretval)

### Functions

- [isPollingFailure](README.md#ispollingfailure)
- [useHeightCalc](README.md#useheightcalc)
- [usePolling](README.md#usepolling)

## Type Aliases

### ElementOrComponentWithEl

Ƭ **ElementOrComponentWithEl**: `HTMLElement` \| { `$el`: `HTMLElement`  }

#### Defined in

dom.ts:4

___

### UsePollingRetVal

Ƭ **UsePollingRetVal**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `startPolling` | () => [`UsePollingRetVal`](README.md#usepollingretval) |
| `state` | `ComputedRef`<[`PollingState`](enums/PollingState.md)\> |

#### Defined in

polling.ts:15

## Functions

### isPollingFailure

▸ **isPollingFailure**(`state`): `boolean`

See if the given state is considered a failure, either it was considered a failure by the executing function or it
had timed out.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | [`PollingState`](enums/PollingState.md) | The state to validate. |

#### Returns

`boolean`

Returns true if it is considered to be a failure, false otherwise.

#### Defined in

polling.ts:29

___

### useHeightCalc

▸ **useHeightCalc**(`baseHeight`, `elements`): `ComputedRefWithControl`<`string`\>

In cases where we have an element where any of the height CSS styles is using the "calc" function, we may want to
subtract from a base height the current height of some elements, this function allows for that.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseHeight` | `string` | The base height to essentially subtract from. Ex: 90vh, 800px, 100% |
| `elements` | `Ref`<[`ElementOrComponentWithEl`](README.md#elementorcomponentwithel)\>[] | The list of elements or components with a singular root element whose height we will subtract from. |

#### Returns

`ComputedRefWithControl`<`string`\>

#### Defined in

dom.ts:15

___

### usePolling

▸ **usePolling**(`fn`, `intervalMs`, `timeoutMs`): [`UsePollingRetVal`](README.md#usepollingretval)

Keep executing the provided function until it returns a success, failure, or it has timed out. Note that the next
polling will not start until the current task finishes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | () => `Awaitable`<[`PollingState`](enums/PollingState.md)\> | The function to execute. The function should return [POLLING](enums/PollingState.md#polling) to have the polling to continue.  Returning either [SUCCESS](enums/PollingState.md#success) or [FAILURE](enums/PollingState.md#failure) will stop polling. |
| `intervalMs` | `number` | The time in milliseconds between each poll. |
| `timeoutMs` | `number` | The maximum time in milliseconds before it is considered a polling timeout. |

#### Returns

[`UsePollingRetVal`](README.md#usepollingretval)

Return an object with the current state of the polling and function to start the polling.

#### Defined in

polling.ts:47
