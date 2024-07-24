# @ti-platform/aide-vueuse

This package contains utility functions that makes use @vueuse/core and its functions.

# Contents

* [API Docs](#api-docs)
  * [Enumerations](#enumerations)
    * [PollingState](#pollingstate)
  * [Type Aliases](#type-aliases)
    * [ElementOrComponentWithEl](#elementorcomponentwithel)
    * [UsePollingRetVal](#usepollingretval)
  * [Functions](#functions)
    * [isPollingFailure()](#ispollingfailure)
    * [useHeightCalc()](#useheightcalc)
    * [usePolling()](#usepolling)

# API Docs

## Enumerations

### PollingState

The state of the polling.

#### Enumeration Members

| Enumeration Member | Value |
| ------------------ | ----- |
| `FAILURE`          | `3`   |
| `NOT_STARTED`      | `0`   |
| `POLLING`          | `1`   |
| `SUCCESS`          | `2`   |
| `TIMEOUT`          | `4`   |

## Type Aliases

### ElementOrComponentWithEl

> **ElementOrComponentWithEl**: `HTMLElement` | {`$el`: `HTMLElement`; }

Either an `HTMLElement` or a Vue component with the property `$el` which is an `HTMLElement`.

#### Defined in

dom.ts:8

***

### UsePollingRetVal

> **UsePollingRetVal**: {`startPolling`: () => [`UsePollingRetVal`](README.md#usepollingretval);`state`: `ComputedRef`<[`PollingState`](README.md#pollingstate)>; }

Return value of the [usePolling](README.md#usepolling) function.

#### Type declaration

| Name           | Type                                                    | Description                       |
| -------------- | ------------------------------------------------------- | --------------------------------- |
| `startPolling` | () => [`UsePollingRetVal`](README.md#usepollingretval)  | Start polling.                    |
| `state`        | `ComputedRef`<[`PollingState`](README.md#pollingstate)> | The current state of the polling. |

#### Defined in

polling.ts:21

## Functions

### isPollingFailure()

> **isPollingFailure**(`state`): `boolean`

See if the given state is considered a failure, either it was considered a failure by the executing function or it
had timed out.

#### Parameters

| Parameter | Type                                     | Description            |
| --------- | ---------------------------------------- | ---------------------- |
| `state`   | [`PollingState`](README.md#pollingstate) | The state to validate. |

#### Returns

`boolean`

Returns true if it is considered to be a failure, false otherwise.

#### Defined in

polling.ts:40

***

### useHeightCalc()

> **useHeightCalc**(`baseHeight`, `elements`): `ComputedRefWithControl`<`string`>

In cases where we have an element where any of the height CSS styles is using the "calc" function, we may want to
subtract from a base height the current height of some elements, this function allows for that.

#### Parameters

| Parameter    | Type                                                                       | Description                                                                                         |
| ------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `baseHeight` | `string`                                                                   | The base height to essentially subtract from. Ex: 90vh, 800px, 100%                                 |
| `elements`   | `Ref`<[`ElementOrComponentWithEl`](README.md#elementorcomponentwithel)>\[] | The list of elements or components with a singular root element whose height we will subtract from. |

#### Returns

`ComputedRefWithControl`<`string`>

#### Defined in

dom.ts:17

***

### usePolling()

> **usePolling**(`fn`, `intervalMs`, `timeoutMs`): [`UsePollingRetVal`](README.md#usepollingretval)

Keep executing the provided function until it returns a success, failure, or it has timed out. Note that the next
polling will not start until the current task finishes.

#### Parameters

| Parameter    | Type                                                        | Description                                                                                                                                                                                                                                                              |
| ------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fn`         | () => `Awaitable`<[`PollingState`](README.md#pollingstate)> | The function to execute. The function should return [PollingState.POLLING](README.md#pollingstate) to have the polling to continue. Returning either [PollingState.SUCCESS](README.md#pollingstate) or [PollingState.FAILURE](README.md#pollingstate) will stop polling. |
| `intervalMs` | `number`                                                    | The time in milliseconds between each poll.                                                                                                                                                                                                                              |
| `timeoutMs`  | `number`                                                    | The maximum time in milliseconds before it is considered a polling timeout.                                                                                                                                                                                              |

#### Returns

[`UsePollingRetVal`](README.md#usepollingretval)

Return an object with the current state of the polling and function to start the polling.

#### Defined in

polling.ts:54
