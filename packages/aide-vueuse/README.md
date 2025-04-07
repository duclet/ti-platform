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

Defined in: polling.ts:10

The state of the polling.

#### Enumeration Members

| Enumeration Member                     | Value |
| -------------------------------------- | ----- |
| <a id="failure"></a> `FAILURE`         | `3`   |
| <a id="not_started"></a> `NOT_STARTED` | `0`   |
| <a id="polling"></a> `POLLING`         | `1`   |
| <a id="success"></a> `SUCCESS`         | `2`   |
| <a id="timeout"></a> `TIMEOUT`         | `4`   |

## Type Aliases

### ElementOrComponentWithEl

> **ElementOrComponentWithEl** = `HTMLElement` | { `$el`: `HTMLElement`; }

Defined in: dom.ts:8

Either an `HTMLElement` or a Vue component with the property `$el` which is an `HTMLElement`.

***

### UsePollingRetVal

> **UsePollingRetVal** = { `startPolling`: () => [`UsePollingRetVal`](#usepollingretval); `state`: `ComputedRef`<[`PollingState`](#pollingstate)>; }

Defined in: polling.ts:21

Return value of the [usePolling](#usepolling) function.

#### Properties

| Property                                 | Type                                           | Description                       |
| ---------------------------------------- | ---------------------------------------------- | --------------------------------- |
| <a id="startpolling"></a> `startPolling` | () => [`UsePollingRetVal`](#usepollingretval)  | Start polling.                    |
| <a id="state"></a> `state`               | `ComputedRef`<[`PollingState`](#pollingstate)> | The current state of the polling. |

## Functions

### isPollingFailure()

> **isPollingFailure**(`state`): `boolean`

Defined in: polling.ts:40

See if the given state is considered a failure, either it was considered a failure by the executing function or it
had timed out.

#### Parameters

| Parameter | Type                            | Description            |
| --------- | ------------------------------- | ---------------------- |
| `state`   | [`PollingState`](#pollingstate) | The state to validate. |

#### Returns

`boolean`

Returns true if it is considered to be a failure, false otherwise.

***

### useHeightCalc()

> **useHeightCalc**(`baseHeight`, `elements`): `ComputedRefWithControl`<`string`>

Defined in: dom.ts:17

In cases where we have an element where any of the height CSS styles is using the "calc" function, we may want to
subtract from a base height the current height of some elements, this function allows for that.

#### Parameters

| Parameter    | Type                                                                                                                       | Description                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `baseHeight` | `string`                                                                                                                   | The base height to essentially subtract from. Ex: 90vh, 800px, 100%                                 |
| `elements`   | `Ref`<[`ElementOrComponentWithEl`](#elementorcomponentwithel), [`ElementOrComponentWithEl`](#elementorcomponentwithel)>\[] | The list of elements or components with a singular root element whose height we will subtract from. |

#### Returns

`ComputedRefWithControl`<`string`>

***

### usePolling()

> **usePolling**(`fn`, `intervalMs`, `timeoutMs`): [`UsePollingRetVal`](#usepollingretval)

Defined in: polling.ts:54

Keep executing the provided function until it returns a success, failure, or it has timed out. Note that the next
polling will not start until the current task finishes.

#### Parameters

| Parameter    | Type                                               | Description                                                                                                                                                                                                                    |
| ------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fn`         | () => `Awaitable`<[`PollingState`](#pollingstate)> | The function to execute. The function should return [PollingState.POLLING](#polling) to have the polling to continue. Returning either [PollingState.SUCCESS](#success) or [PollingState.FAILURE](#failure) will stop polling. |
| `intervalMs` | `number`                                           | The time in milliseconds between each poll.                                                                                                                                                                                    |
| `timeoutMs`  | `number`                                           | The maximum time in milliseconds before it is considered a polling timeout.                                                                                                                                                    |

#### Returns

[`UsePollingRetVal`](#usepollingretval)

Return an object with the current state of the polling and function to start the polling.
