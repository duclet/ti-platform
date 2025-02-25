# @ti-platform/aide-test

Aide in writing tests with Vitest.

# Contents

* [API Docs](#api-docs)
  * [Classes](#classes)
    * [Assertion\<T, P>](#assertiont-p)
  * [Functions](#functions)
    * [expect()](#expect)
    * [expectToFail()](#expecttofail)
    * [expectToHaveAssertions()](#expecttohaveassertions)
    * [expectToHaveAssertionTimes()](#expecttohaveassertiontimes)
    * [matchAny()](#matchany)
    * [matchAnything()](#matchanything)
    * [matchArrayContaining()](#matcharraycontaining)
    * [matchCloseTo()](#matchcloseto)
    * [matchObjectContaining()](#matchobjectcontaining)
    * [matchStringContaining()](#matchstringcontaining)
    * [matchStringMatching()](#matchstringmatching)
    * [softExpect()](#softexpect)

# API Docs

## Classes

### Assertion\<T, P>

Wrapper around Vitest's expect to allow a fluent API and some more extension.

#### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `T`            | -            |
| `P`            | `undefined`  |

#### Constructors

##### new Assertion()

> **new Assertion**<`T`, `P`>(`value`, `parentAssertion`?, `options`?): [`Assertion`](README.md#assertiont-p)<`T`, `P`>

###### Parameters

| Parameter          | Type      |
| ------------------ | --------- |
| `value`            | `T`       |
| `parentAssertion`? | `P`       |
| `options`?         | `object`  |
| `options.invert`?  | `boolean` |
| `options.soft`?    | `boolean` |

###### Returns

[`Assertion`](README.md#assertiont-p)<`T`, `P`>

###### Defined in

index.ts:7

#### Accessors

##### not

###### Get Signature

> **get** **not**(): [`Assertion`](README.md#assertiont-p)<`T`, [`Assertion`](README.md#assertiont-p)<`T`, `P`>>

Using not will negate the assertion.

###### Returns

[`Assertion`](README.md#assertiont-p)<`T`, [`Assertion`](README.md#assertiont-p)<`T`, `P`>>

###### Defined in

index.ts:19

#### Methods

##### map()

> **map**<`R`>(`mapper`): [`Assertion`](README.md#assertiont-p)<`R`, [`Assertion`](README.md#assertiont-p)<`T`, `P`>>

Create a new assertion by using the given mapper to map the current value to a new one. You would be able to get
back to this assertion by calling [parent](README.md#parent) from the newly created assertion.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type             |
| --------- | ---------------- |
| `mapper`  | (`value`) => `R` |

###### Returns

[`Assertion`](README.md#assertiont-p)<`R`, [`Assertion`](README.md#assertiont-p)<`T`, `P`>>

###### Defined in

index.ts:27

##### parent()

> **parent**(): `P`

Get the parent assertion of this assertion, usually from a [map](README.md#map) or [not](README.md#not) call. Will throw an error
if there are no parent assertion.

###### Returns

`P`

###### Defined in

index.ts:35

##### toBe()

> **toBe**(`expected`): `this`

Checks that a value is what you expect. It calls `Object.is` to compare values. Don't use toBe with
floating-point numbers.

###### Parameters

| Parameter  | Type |
| ---------- | ---- |
| `expected` | `T`  |

###### Returns

`this`

###### Defined in

index.ts:47

##### toBeCloseTo()

> **toBeCloseTo**(`num`, `numDigits`?): `this`

Using exact equality with floating point numbers is a bad idea. Rounding means that intuitive things fail. The
default for precision is 2.

###### Parameters

| Parameter    | Type     |
| ------------ | -------- |
| `num`        | `number` |
| `numDigits`? | `number` |

###### Returns

`this`

###### Defined in

index.ts:56

##### toBeDefined()

> **toBeDefined**(): `this`

Ensure that a variable is not `undefined`.

###### Returns

`this`

###### Defined in

index.ts:65

##### toBeFalse()

> **toBeFalse**(): `this`

Ensures the value is `false`.

###### Returns

`this`

###### Defined in

index.ts:73

##### toBeFalsy()

> **toBeFalsy**(): `this`

When you don't care what a value is, you just want to ensure a value is false in a boolean context.

###### Returns

`this`

###### Defined in

index.ts:81

##### toBeGreaterThan()

> **toBeGreaterThan**(`num`): `this`

For comparing floating point numbers.

###### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `num`     | `number` \| `bigint` |

###### Returns

`this`

###### Defined in

index.ts:89

##### toBeGreaterThanOrEqual()

> **toBeGreaterThanOrEqual**(`num`): `this`

For comparing floating point numbers.

###### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `num`     | `number` \| `bigint` |

###### Returns

`this`

###### Defined in

index.ts:97

##### toBeInstanceOf()

> **toBeInstanceOf**<`C`>(`klass`): `this`

Ensure that an object is an instance of a class. This matcher uses instanceof underneath.

###### Type Parameters

| Type Parameter |
| -------------- |
| `C`            |

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `klass`   | `C`  |

###### Returns

`this`

###### Defined in

index.ts:105

##### toBeLessThan()

> **toBeLessThan**(`num`): `this`

For comparing floating point numbers.

###### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `num`     | `number` \| `bigint` |

###### Returns

`this`

###### Defined in

index.ts:113

##### toBeLessThanOrEqual()

> **toBeLessThanOrEqual**(`num`): `this`

For comparing floating point numbers.

###### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `num`     | `number` \| `bigint` |

###### Returns

`this`

###### Defined in

index.ts:121

##### toBeNaN()

> **toBeNaN**(): `this`

Used to check that a variable is `NaN`.

###### Returns

`this`

###### Defined in

index.ts:129

##### toBeNull()

> **toBeNull**(): `this`

This is the same as `.toBe(null)` but the error messages are a bit nicer. So use `.toBeNull()` when you want to
check that something is `null`.

###### Returns

`this`

###### Defined in

index.ts:138

##### toBeTrue()

> **toBeTrue**(): `this`

Ensures the value is `true`.

###### Returns

`this`

###### Defined in

index.ts:146

##### toBeTruthy()

> **toBeTruthy**(): `this`

Use when you don't care what a value is, you just want to ensure a value is true in a boolean context. In
JavaScript, there are six falsy values: `false`, `0`, `''`, `null`, `undefined`, and `NaN`. Everything else is
truthy.

###### Returns

`this`

###### Defined in

index.ts:156

##### toBeTypeOf()

> **toBeTypeOf**(`type`): `this`

Ensures a value is of a specific type.

###### Parameters

| Parameter | Type                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------ |
| `type`    | `"string"` \| `"number"` \| `"bigint"` \| `"boolean"` \| `"symbol"` \| `"undefined"` \| `"object"` \| `"function"` |

###### Returns

`this`

###### Defined in

index.ts:164

##### toBeUndefined()

> **toBeUndefined**(): `this`

Used to check that a variable is `undefined`.

###### Returns

`this`

###### Defined in

index.ts:174

##### toContain()

> **toContain**(`item`): `this`

Used when you want to check that an item is in a list. For testing the items in the list, this uses ===, a strict
equality check.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `item`    | `T`  |

###### Returns

`this`

###### Defined in

index.ts:183

##### toContainEqual()

> **toContainEqual**(`item`): `this`

Used when you want to check that an item is in a list. For testing the items in the list, this matcher
recursively checks the equality of all fields, rather than checking for object identity.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `item`    | `T`  |

###### Returns

`this`

###### Defined in

index.ts:192

##### toEqual()

> **toEqual**(`expected`): `this`

Used when you want to check that two objects have the same value. This matcher recursively checks the equality of
all fields, rather than checking for object identity.

###### Parameters

| Parameter  | Type |
| ---------- | ---- |
| `expected` | `T`  |

###### Returns

`this`

###### Defined in

index.ts:201

##### toHaveBeenCalled()

> **toHaveBeenCalled**(): `this`

Ensures that a mock function is called.

###### Returns

`this`

###### Defined in

index.ts:209

##### toHaveBeenCalledOnce()

> **toHaveBeenCalledOnce**(): `this`

Asserts that a mock function was called exactly once.

###### Returns

`this`

###### Defined in

index.ts:217

##### toHaveBeenCalledTimes()

> **toHaveBeenCalledTimes**(`times`): `this`

Ensures that a mock function is called an exact number of times.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `times`   | `number` |

###### Returns

`this`

###### Defined in

index.ts:225

##### toHaveBeenCalledWith()

> **toHaveBeenCalledWith**(...`args`): `this`

Ensure that a mock function is called with specific arguments.

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| ...`args` | `unknown`\[] |

###### Returns

`this`

###### Defined in

index.ts:233

##### toHaveBeenLastCalledWith()

> **toHaveBeenLastCalledWith**(...`args`): `this`

If you have a mock function, you can use `.toHaveBeenLastCalledWith` to test what arguments it was last called
with.

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| ...`args` | `unknown`\[] |

###### Returns

`this`

###### Defined in

index.ts:242

##### toHaveBeenNthCalledWith()

> **toHaveBeenNthCalledWith**(`time`, ...`args`): `this`

Ensure that a mock function is called with specific arguments on an Nth call.

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| `time`    | `number`     |
| ...`args` | `unknown`\[] |

###### Returns

`this`

###### Defined in

index.ts:250

##### toHaveLastResolvedWith()

> **toHaveLastResolvedWith**(`value`): `this`

Asserts that the last resolved value of a promise matches an expected value.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

###### Returns

`this`

###### Defined in

index.ts:258

##### toHaveLastReturnedWith()

> **toHaveLastReturnedWith**(`value`): `this`

Use to test the specific value that a mock function last returned. If the last call to the mock function threw an
error, then this matcher will fail no matter what value you provided as the expected return value.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

###### Returns

`this`

###### Defined in

index.ts:267

##### toHaveLength()

> **toHaveLength**(`length`): `this`

Used to check that an object has a `.length` property and it is set to a certain numeric value.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `length`  | `number` |

###### Returns

`this`

###### Defined in

index.ts:275

##### toHaveNthResolvedWith()

> **toHaveNthResolvedWith**(`time`, `value`): `this`

Ensures a specific value was returned by a promise on the nth resolution.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `time`    | `number`  |
| `value`   | `unknown` |

###### Returns

`this`

###### Defined in

index.ts:283

##### toHaveNthReturnedWith()

> **toHaveNthReturnedWith**(`time`, `value`): `this`

Use to test the specific value that a mock function returned for the nth call. If the nth call to the mock
function threw an error, then this matcher will fail no matter what value you provided as the expected return
value.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `time`    | `number`  |
| `value`   | `unknown` |

###### Returns

`this`

###### Defined in

index.ts:293

##### toHaveProperty()

> **toHaveProperty**(`property`, `value`?): `this`

Use to check if a property at the specified path exists on an object. For checking deeply nested properties, you
may use dot notation or an array containing the path segments for deep references.

Optionally, you can provide a value to check if it matches the value present at the path on the target object.
This matcher uses 'deep equality' (like [toEqual](README.md#toequal)) and recursively checks the equality of all fields.

###### Parameters

| Parameter  | Type                                  |
| ---------- | ------------------------------------- |
| `property` | `string` \| (`string` \| `number`)\[] |
| `value`?   | `unknown`                             |

###### Returns

`this`

###### Defined in

index.ts:305

##### toHaveResolved()

> **toHaveResolved**(): `this`

Checks that a promise resolves successfully at least once.

###### Returns

`this`

###### Defined in

index.ts:314

##### toHaveResolvedTimes()

> **toHaveResolvedTimes**(`times`): `this`

Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
Any calls to the mock function that throw an error are not counted toward the number of times the function
returned.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `times`   | `number` |

###### Returns

`this`

###### Defined in

index.ts:324

##### toHaveResolvedWith()

> **toHaveResolvedWith**(`value`): `this`

Checks that a promise resolves to a specific value.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

###### Returns

`this`

###### Defined in

index.ts:332

##### toHaveReturned()

> **toHaveReturned**(): `this`

Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time.

###### Returns

`this`

###### Defined in

index.ts:340

##### toHaveReturnedTimes()

> **toHaveReturnedTimes**(`times`): `this`

Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
Any calls to the mock function that throw an error are not counted toward the number of times the function
returned.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `times`   | `number` |

###### Returns

`this`

###### Defined in

index.ts:350

##### toHaveReturnedWith()

> **toHaveReturnedWith**(`value`): `this`

Use to ensure that a mock function returned a specific value.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

###### Returns

`this`

###### Defined in

index.ts:358

##### toHaveSize()

> **toHaveSize**(`size`): `this`

Used to check that an object has a `.szie` property and it is set to a certain numeric value.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `size`    | `number` |

###### Returns

`this`

###### Defined in

index.ts:366

##### toMatch()

> **toMatch**(`expected`): `this`

Check that a string matches a regular expression.

###### Parameters

| Parameter  | Type                 |
| ---------- | -------------------- |
| `expected` | `string` \| `RegExp` |

###### Returns

`this`

###### Defined in

index.ts:374

##### toMatchFileSnapshot()

> **toMatchFileSnapshot**(`filepath`, `message`?): `Promise`<[`Assertion`](README.md#assertiont-p)<`T`, `P`>>

Compares the received value to a snapshot saved in a specified file. Useful for cases where snapshot content is
large or needs to be shared across tests.

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `filepath` | `string` |
| `message`? | `string` |

###### Returns

`Promise`<[`Assertion`](README.md#assertiont-p)<`T`, `P`>>

###### Defined in

index.ts:446

##### toMatchInlineSnapshot()

###### toMatchInlineSnapshot(message)

> **toMatchInlineSnapshot**(`message`?): `this`

This ensures that a value matches the most recent snapshot.

Vitest adds and updates the inlineSnapshot string argument to the matcher in the test file (instead of an
external .snap file).

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `message`? | `string` |

###### Returns

`this`

###### Defined in

index.ts:458

###### toMatchInlineSnapshot(properties, snapshot, message)

> **toMatchInlineSnapshot**(`properties`, `snapshot`?, `message`?): `this`

###### Parameters

| Parameter    | Type           |
| ------------ | -------------- |
| `properties` | `Partial`<`T`> |
| `snapshot`?  | `string`       |
| `message`?   | `string`       |

###### Returns

`this`

###### Defined in

index.ts:459

##### toMatchObject()

> **toMatchObject**(`expected`): `this`

Used to check that a JavaScript object matches a subset of the properties of an object

###### Parameters

| Parameter  | Type                    |
| ---------- | ----------------------- |
| `expected` | `object` \| `object`\[] |

###### Returns

`this`

###### Defined in

index.ts:382

##### toMatchSnapshot()

###### toMatchSnapshot(message)

> **toMatchSnapshot**(`message`?): `this`

This ensures that a value matches the most recent snapshot.

You can provide an optional hint string argument that is appended to the test name. Although Vitest always
appends a number at the end of a snapshot name, short descriptive hints might be more useful than numbers to
differentiate multiple snapshots in a single it or test block. Vitest sorts snapshots by name in the
corresponding .snap file.

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `message`? | `string` |

###### Returns

`this`

###### Defined in

index.ts:435

###### toMatchSnapshot(shape, message)

> **toMatchSnapshot**(`shape`, `message`?): `this`

###### Parameters

| Parameter  | Type           |
| ---------- | -------------- |
| `shape`    | `Partial`<`T`> |
| `message`? | `string`       |

###### Returns

`this`

###### Defined in

index.ts:436

##### toSatisfy()

> **toSatisfy**(`predicate`, `message`?): `this`

Checks that a value satisfies a custom matcher function.

###### Parameters

| Parameter   | Type                    |
| ----------- | ----------------------- |
| `predicate` | (`actual`) => `boolean` |
| `message`?  | `string`                |

###### Returns

`this`

###### Defined in

index.ts:390

##### toStrictEqual()

> **toStrictEqual**(`value`): `this`

Asserts if value is equal to given or has the same structure if it is an object (compares them recursively), and
of the same type.

Differences from [toEqual](README.md#toequal):

* Keys with undefined properties are checked. e.g. {a: undefined, b: 2} does not match {b: 2} when using
  .toStrictEqual.
* Array sparseness is checked. e.g. \[, 1] does not match \[undefined, 1] when using .toStrictEqual.
* Object types are checked to be equal. e.g. A class instance with fields a and b will not equal a literal object
  with fields a and b.

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `value`   | `T`  |

###### Returns

`this`

###### Defined in

index.ts:407

##### toThrowError()

> **toThrowError**(`expected`?): `this`

Asserts if a function throws an error when it is called.

You can provide an optional argument to test that a specific error is thrown:

* regular expression: error message matches the pattern
* string: error message includes the substring

###### Parameters

| Parameter   | Type      |
| ----------- | --------- |
| `expected`? | `unknown` |

###### Returns

`this`

###### Defined in

index.ts:419

##### toThrowErrorMatchingInlineSnapshot()

> **toThrowErrorMatchingInlineSnapshot**(`snapshot`?, `message`?): `this`

Checks that an error thrown by a function matches an inline snapshot within the test file. Useful for keeping
snapshots close to the test code.

###### Parameters

| Parameter   | Type     |
| ----------- | -------- |
| `snapshot`? | `string` |
| `message`?  | `string` |

###### Returns

`this`

###### Defined in

index.ts:478

##### toThrowErrorMatchingSnapshot()

> **toThrowErrorMatchingSnapshot**(`message`?): `this`

Checks that an error thrown by a function matches a previously recorded snapshot.

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `message`? | `string` |

###### Returns

`this`

###### Defined in

index.ts:468

## Functions

### expect()

> **expect**<`T`>(`actual`): [`Assertion`](README.md#assertiont-p)<`T`, `undefined`>

Create a new assertion.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `actual`  | `T`  |

#### Returns

[`Assertion`](README.md#assertiont-p)<`T`, `undefined`>

#### Defined in

index.ts:504

***

### expectToFail()

> **expectToFail**(`message`?): `never`

This method is used to assert that a line should never be reached.

#### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `message`? | `string` |

#### Returns

`never`

#### Defined in

index.ts:509

***

### expectToHaveAssertions()

> **expectToHaveAssertions**(): `void`

After the test has passed or failed verify that at least one assertion was called during a test. A useful case would
be to check if an asynchronous code was called.

For example, if you have a code that calls a callback, we can make an assertion inside a callback, but the test will
always pass if we don't check if an assertion was called.

#### Returns

`void`

#### Defined in

index.ts:518

***

### expectToHaveAssertionTimes()

> **expectToHaveAssertionTimes**(`times`): `void`

After the test has passed or failed verify that a certain number of assertions was called during a test. A useful
case would be to check if an asynchronous code was called.

For example, if we have a function that asynchronously calls two matchers, we can assert that they were actually
called.

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `times`   | `number` |

#### Returns

`void`

#### Defined in

index.ts:527

***

### matchAny()

> **matchAny**(`klass`): `any`

This asymmetric matcher, when used with an equality check, will return true only if the value is an instance of a
specified constructor. Useful, if you have a value that is generated each time, and you only want to know that it
exists with a proper type.

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `klass`   | `unknown` |

#### Returns

`any`

#### Defined in

index.ts:534

***

### matchAnything()

> **matchAnything**(): `any`

This asymmetric matcher, when used with equality check, will always return true. Useful, if you just want to be sure
that the property exist.

#### Returns

`any`

#### Defined in

index.ts:540

***

### matchArrayContaining()

> **matchArrayContaining**(`expected`): `any`

Matches if the received array contains all elements in the expected array.

#### Parameters

| Parameter  | Type         |
| ---------- | ------------ |
| `expected` | `unknown`\[] |

#### Returns

`any`

#### Defined in

index.ts:545

***

### matchCloseTo()

> **matchCloseTo**(`expected`, `precision`?): `any`

Matches if the received number is within a certain precision of the expected number.

#### Parameters

| Parameter    | Type     |
| ------------ | -------- |
| `expected`   | `number` |
| `precision`? | `number` |

#### Returns

`any`

#### Defined in

index.ts:550

***

### matchObjectContaining()

> **matchObjectContaining**(`expected`): `any`

Matches if the received object contains all properties of the expected object.

#### Parameters

| Parameter  | Type      |
| ---------- | --------- |
| `expected` | `unknown` |

#### Returns

`any`

#### Defined in

index.ts:555

***

### matchStringContaining()

> **matchStringContaining**(`expected`): `any`

Matches if the received string contains the expected substring.

#### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `expected` | `string` |

#### Returns

`any`

#### Defined in

index.ts:560

***

### matchStringMatching()

> **matchStringMatching**(`expected`): `any`

Matches if the received string or regex matches the expected pattern.

#### Parameters

| Parameter  | Type                 |
| ---------- | -------------------- |
| `expected` | `string` \| `RegExp` |

#### Returns

`any`

#### Defined in

index.ts:565

***

### softExpect()

> **softExpect**<`T`>(`actual`): [`Assertion`](README.md#assertiont-p)<`T`, `undefined`>

Functions similarly to [expect](README.md#expect), but instead of terminating the test execution upon a failed assertion, it
continues running and marks the failure as a test failure. All errors encountered during the test will be displayed
until the test is completed.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| --------- | ---- |
| `actual`  | `T`  |

#### Returns

[`Assertion`](README.md#assertiont-p)<`T`, `undefined`>

#### Defined in

index.ts:572
