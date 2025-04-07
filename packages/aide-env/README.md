# @ti-platform/aide-env

This package provides enhancement towards loading environment variables from `.env` files but in a hierarchical
approach. It will load in the following order by default:

* `.env`
* `.env.{NODE_ENV}`, where `{NODE_ENV}` is the value of `process.env.NODE_ENV`
* `.env.local`

You can of course configure it to change the order and pattern that best fit your style.

# Contents

* [API Docs](#api-docs)
  * [Functions](#functions)
    * [loadEnv()](#loadenv)

# API Docs

## Functions

### loadEnv()

> **loadEnv**(`filesOrder`): `void`

Defined in: index.ts:10

Load the environment variables.

#### Parameters

| Parameter    | Type        |
| ------------ | ----------- |
| `filesOrder` | `string`\[] |

#### Returns

`void`
