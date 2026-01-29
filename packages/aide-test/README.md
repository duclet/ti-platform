# @ti-platform/aide-test

Aide in writing tests with Vitest.

# Contents

* [API Docs](#api-docs)
  * [Classes](#classes)
    * [Assertion](#assertion)
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

### Assertion

Defined in: index.ts:6

Wrapper around Vitest's expect to allow a fluent API and some more extension.

#### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `T`            | -            |
| `P`            | `undefined`  |

#### Constructors

##### Constructor

> **new Assertion**<`T`, `P`>(`value`, `parentAssertion?`, `options?`): [`Assertion`](#assertion)<`T`, `P`>

Defined in: index.ts:7

###### Parameters

| Parameter          | Type                                          |
| ------------------ | --------------------------------------------- |
| `value`            | `T`                                           |
| `parentAssertion?` | `P`                                           |
| `options?`         | { `invert?`: `boolean`; `soft?`: `boolean`; } |
| `options.invert?`  | `boolean`                                     |
| `options.soft?`    | `boolean`                                     |

###### Returns

[`Assertion`](#assertion)<`T`, `P`>

#### Accessors

##### not

###### Get Signature

> **get** **not**(): [`Assertion`](#assertion)<`T`, [`Assertion`](#assertion)<`T`, `P`>>

Defined in: index.ts:19

Using not will negate the assertion.

###### Returns

[`Assertion`](#assertion)<`T`, [`Assertion`](#assertion)<`T`, `P`>>

#### Methods

##### map()

> **map**<`R`>(`mapper`): [`Assertion`](#assertion)<`R`, [`Assertion`](#assertion)<`T`, `P`>>

Defined in: index.ts:27

Create a new assertion by using the given mapper to map the current value to a new one. You would be able to get
back to this assertion by calling [parent](#parent) from the newly created assertion.

###### Type Parameters

| Type Parameter |
| -------------- |
| `R`            |

###### Parameters

| Parameter | Type             |
| --------- | ---------------- |
| `mapper`  | (`value`) => `R` |

###### Returns

[`Assertion`](#assertion)<`R`, [`Assertion`](#assertion)<`T`, `P`>>

##### parent()

> **parent**(): `P`

Defined in: index.ts:35

Get the parent assertion of this assertion, usually from a [map](#map) or [not](#not) call. Will throw an error
if there are no parent assertion.

###### Returns

`P`

##### toBe()

> **toBe**(`expected`): `this`

Defined in: index.ts:47

Checks that a value is what you expect. It calls `Object.is` to compare values. Don't use toBe with
floating-point numbers.

###### Parameters

| Parameter  | Type |
| ---------- | ---- |
| `expected` | `T`  |

###### Returns

`this`

##### toBeCloseTo()

> **toBeCloseTo**(`num`, `numDigits?`): `this`

Defined in: index.ts:56

Using exact equality with floating point numbers is a bad idea. Rounding means that intuitive things fail. The
default for precision is 2.

###### Parameters

| Parameter    | Type     |
| ------------ | -------- |
| `num`        | `number` |
| `numDigits?` | `number` |

###### Returns

`this`

##### toBeDefined()

> **toBeDefined**(): `this`

Defined in: index.ts:65

Ensure that a variable is not `undefined`.

###### Returns

`this`

##### toBeFalse()

> **toBeFalse**(): `this`

Defined in: index.ts:73

Ensures the value is `false`.

###### Returns

`this`

##### toBeFalsy()

> **toBeFalsy**(): `this`

Defined in: index.ts:81

When you don't care what a value is, you just want to ensure a value is false in a boolean context.

###### Returns

`this`

##### toBeGreaterThan()

> **toBeGreaterThan**(`num`): `this`

Defined in: index.ts:89

For comparing floating point numbers.

###### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `num`     | `number` \| `bigint` |

###### Returns

`this`

##### toBeGreaterThanOrEqual()

> **toBeGreaterThanOrEqual**(`num`): `this`

Defined in: index.ts:97

For comparing floating point numbers.

###### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `num`     | `number` \| `bigint` |

###### Returns

`this`

##### toBeInstanceOf()

> **toBeInstanceOf**<`C`>(`klass`): `this`

Defined in: index.ts:105

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

##### toBeLessThan()

> **toBeLessThan**(`num`): `this`

Defined in: index.ts:113

For comparing floating point numbers.

###### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `num`     | `number` \| `bigint` |

###### Returns

`this`

##### toBeLessThanOrEqual()

> **toBeLessThanOrEqual**(`num`): `this`

Defined in: index.ts:121

For comparing floating point numbers.

###### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `num`     | `number` \| `bigint` |

###### Returns

`this`

##### toBeNaN()

> **toBeNaN**(): `this`

Defined in: index.ts:129

Used to check that a variable is `NaN`.

###### Returns

`this`

##### toBeNull()

> **toBeNull**(): `this`

Defined in: index.ts:138

This is the same as `.toBe(null)` but the error messages are a bit nicer. So use `.toBeNull()` when you want to
check that something is `null`.

###### Returns

`this`

##### toBeTrue()

> **toBeTrue**(): `this`

Defined in: index.ts:146

Ensures the value is `true`.

###### Returns

`this`

##### toBeTruthy()

> **toBeTruthy**(): `this`

Defined in: index.ts:156

Use when you don't care what a value is, you just want to ensure a value is true in a boolean context. In
JavaScript, there are six falsy values: `false`, `0`, `''`, `null`, `undefined`, and `NaN`. Everything else is
truthy.

###### Returns

`this`

##### toBeTypeOf()

> **toBeTypeOf**(`type`): `this`

Defined in: index.ts:164

Ensures a value is of a specific type.

###### Parameters

| Parameter | Type                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------ |
| `type`    | `"string"` \| `"number"` \| `"bigint"` \| `"boolean"` \| `"symbol"` \| `"undefined"` \| `"object"` \| `"function"` |

###### Returns

`this`

##### toBeUndefined()

> **toBeUndefined**(): `this`

Defined in: index.ts:174

Used to check that a variable is `undefined`.

###### Returns

`this`

##### toContain()

> **toContain**<`U`>(`item`): `this`

Defined in: index.ts:183

Used when you want to check that an item is in a list. For testing the items in the list, this uses ===, a strict
equality check.

###### Type Parameters

| Type Parameter |
| -------------- |
| `U`            |

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `item`    | `U`  |

###### Returns

`this`

##### toContainEqual()

> **toContainEqual**<`U`>(`item`): `this`

Defined in: index.ts:192

Used when you want to check that an item is in a list. For testing the items in the list, this matcher
recursively checks the equality of all fields, rather than checking for object identity.

###### Type Parameters

| Type Parameter |
| -------------- |
| `U`            |

###### Parameters

| Parameter | Type |
| --------- | ---- |
| `item`    | `U`  |

###### Returns

`this`

##### toEqual()

> **toEqual**(`expected`): `this`

Defined in: index.ts:201

Used when you want to check that two objects have the same value. This matcher recursively checks the equality of
all fields, rather than checking for object identity.

###### Parameters

| Parameter  | Type |
| ---------- | ---- |
| `expected` | `T`  |

###### Returns

`this`

##### toHaveBeenCalled()

> **toHaveBeenCalled**(): `this`

Defined in: index.ts:209

Ensures that a mock function is called.

###### Returns

`this`

##### toHaveBeenCalledOnce()

> **toHaveBeenCalledOnce**(): `this`

Defined in: index.ts:217

Asserts that a mock function was called exactly once.

###### Returns

`this`

##### toHaveBeenCalledTimes()

> **toHaveBeenCalledTimes**(`times`): `this`

Defined in: index.ts:225

Ensures that a mock function is called an exact number of times.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `times`   | `number` |

###### Returns

`this`

##### toHaveBeenCalledWith()

> **toHaveBeenCalledWith**(...`args`): `this`

Defined in: index.ts:233

Ensure that a mock function is called with specific arguments.

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| ...`args` | `unknown`\[] |

###### Returns

`this`

##### toHaveBeenLastCalledWith()

> **toHaveBeenLastCalledWith**(...`args`): `this`

Defined in: index.ts:242

If you have a mock function, you can use `.toHaveBeenLastCalledWith` to test what arguments it was last called
with.

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| ...`args` | `unknown`\[] |

###### Returns

`this`

##### toHaveBeenNthCalledWith()

> **toHaveBeenNthCalledWith**(`time`, ...`args`): `this`

Defined in: index.ts:250

Ensure that a mock function is called with specific arguments on an Nth call.

###### Parameters

| Parameter | Type         |
| --------- | ------------ |
| `time`    | `number`     |
| ...`args` | `unknown`\[] |

###### Returns

`this`

##### toHaveLastResolvedWith()

> **toHaveLastResolvedWith**(`value`): `this`

Defined in: index.ts:258

Asserts that the last resolved value of a promise matches an expected value.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

###### Returns

`this`

##### toHaveLastReturnedWith()

> **toHaveLastReturnedWith**(`value`): `this`

Defined in: index.ts:267

Use to test the specific value that a mock function last returned. If the last call to the mock function threw an
error, then this matcher will fail no matter what value you provided as the expected return value.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

###### Returns

`this`

##### toHaveLength()

> **toHaveLength**(`length`): `this`

Defined in: index.ts:275

Used to check that an object has a `.length` property and it is set to a certain numeric value.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `length`  | `number` |

###### Returns

`this`

##### toHaveNthResolvedWith()

> **toHaveNthResolvedWith**(`time`, `value`): `this`

Defined in: index.ts:283

Ensures a specific value was returned by a promise on the nth resolution.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `time`    | `number`  |
| `value`   | `unknown` |

###### Returns

`this`

##### toHaveNthReturnedWith()

> **toHaveNthReturnedWith**(`time`, `value`): `this`

Defined in: index.ts:293

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

##### toHaveProperty()

> **toHaveProperty**(`property`, `value?`): `this`

Defined in: index.ts:305

Use to check if a property at the specified path exists on an object. For checking deeply nested properties, you
may use dot notation or an array containing the path segments for deep references.

Optionally, you can provide a value to check if it matches the value present at the path on the target object.
This matcher uses 'deep equality' (like [toEqual](#toequal)) and recursively checks the equality of all fields.

###### Parameters

| Parameter  | Type                                  |
| ---------- | ------------------------------------- |
| `property` | `string` \| (`string` \| `number`)\[] |
| `value?`   | `unknown`                             |

###### Returns

`this`

##### toHaveResolved()

> **toHaveResolved**(): `this`

Defined in: index.ts:314

Checks that a promise resolves successfully at least once.

###### Returns

`this`

##### toHaveResolvedTimes()

> **toHaveResolvedTimes**(`times`): `this`

Defined in: index.ts:324

Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
Any calls to the mock function that throw an error are not counted toward the number of times the function
returned.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `times`   | `number` |

###### Returns

`this`

##### toHaveResolvedWith()

> **toHaveResolvedWith**(`value`): `this`

Defined in: index.ts:332

Checks that a promise resolves to a specific value.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

###### Returns

`this`

##### toHaveReturned()

> **toHaveReturned**(): `this`

Defined in: index.ts:340

Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time.

###### Returns

`this`

##### toHaveReturnedTimes()

> **toHaveReturnedTimes**(`times`): `this`

Defined in: index.ts:350

Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
Any calls to the mock function that throw an error are not counted toward the number of times the function
returned.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `times`   | `number` |

###### Returns

`this`

##### toHaveReturnedWith()

> **toHaveReturnedWith**(`value`): `this`

Defined in: index.ts:358

Use to ensure that a mock function returned a specific value.

###### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

###### Returns

`this`

##### toHaveSize()

> **toHaveSize**(`size`): `this`

Defined in: index.ts:366

Used to check that an object has a `.szie` property and it is set to a certain numeric value.

###### Parameters

| Parameter | Type     |
| --------- | -------- |
| `size`    | `number` |

###### Returns

`this`

##### toMatch()

> **toMatch**(`expected`): `this`

Defined in: index.ts:374

Check that a string matches a regular expression.

###### Parameters

| Parameter  | Type                 |
| ---------- | -------------------- |
| `expected` | `string` \| `RegExp` |

###### Returns

`this`

##### toMatchFileSnapshot()

> **toMatchFileSnapshot**(`filepath`, `message?`): `Promise`<[`Assertion`](#assertion)<`T`, `P`>>

Defined in: index.ts:447

Compares the received value to a snapshot saved in a specified file. Useful for cases where snapshot content is
large or needs to be shared across tests.

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `filepath` | `string` |
| `message?` | `string` |

###### Returns

`Promise`<[`Assertion`](#assertion)<`T`, `P`>>

##### toMatchInlineSnapshot()

###### Call Signature

> **toMatchInlineSnapshot**(`message?`): `this`

Defined in: index.ts:459

This ensures that a value matches the most recent snapshot.

Vitest adds and updates the inlineSnapshot string argument to the matcher in the test file (instead of an
external .snap file).

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `message?` | `string` |

###### Returns

`this`

###### Call Signature

> **toMatchInlineSnapshot**(`properties`, `snapshot?`, `message?`): `this`

Defined in: index.ts:460

This ensures that a value matches the most recent snapshot.

Vitest adds and updates the inlineSnapshot string argument to the matcher in the test file (instead of an
external .snap file).

###### Parameters

| Parameter    | Type           |
| ------------ | -------------- |
| `properties` | `Partial`<`T`> |
| `snapshot?`  | `string`       |
| `message?`   | `string`       |

###### Returns

`this`

##### toMatchObject()

> **toMatchObject**(`expected`): `this`

Defined in: index.ts:382

Used to check that a JavaScript object matches a subset of the properties of an object

###### Parameters

| Parameter  | Type                    |
| ---------- | ----------------------- |
| `expected` | `object` \| `object`\[] |

###### Returns

`this`

##### toMatchSnapshot()

###### Call Signature

> **toMatchSnapshot**(`message?`): `this`

Defined in: index.ts:436

This ensures that a value matches the most recent snapshot.

You can provide an optional hint string argument that is appended to the test name. Although Vitest always
appends a number at the end of a snapshot name, short descriptive hints might be more useful than numbers to
differentiate multiple snapshots in a single it or test block. Vitest sorts snapshots by name in the
corresponding .snap file.

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `message?` | `string` |

###### Returns

`this`

###### Call Signature

> **toMatchSnapshot**(`shape`, `message?`): `this`

Defined in: index.ts:437

This ensures that a value matches the most recent snapshot.

You can provide an optional hint string argument that is appended to the test name. Although Vitest always
appends a number at the end of a snapshot name, short descriptive hints might be more useful than numbers to
differentiate multiple snapshots in a single it or test block. Vitest sorts snapshots by name in the
corresponding .snap file.

###### Parameters

| Parameter  | Type           |
| ---------- | -------------- |
| `shape`    | `Partial`<`T`> |
| `message?` | `string`       |

###### Returns

`this`

##### toSatisfy()

> **toSatisfy**(`predicate`, `message?`): `this`

Defined in: index.ts:390

Checks that a value satisfies a custom matcher function.

###### Parameters

| Parameter   | Type                    |
| ----------- | ----------------------- |
| `predicate` | (`actual`) => `boolean` |
| `message?`  | `string`                |

###### Returns

`this`

##### toStrictEqual()

> **toStrictEqual**(`value`): `this`

Defined in: index.ts:407

Asserts if value is equal to given or has the same structure if it is an object (compares them recursively), and
of the same type.

Differences from [toEqual](#toequal):

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

##### toThrowError()

> **toThrowError**(`expected?`): `this`

Defined in: index.ts:419

Asserts if a function throws an error when it is called.

You can provide an optional argument to test that a specific error is thrown:

* regular expression: error message matches the pattern
* string: error message includes the substring

###### Parameters

| Parameter   | Type      |
| ----------- | --------- |
| `expected?` | `unknown` |

###### Returns

`this`

##### toThrowErrorMatchingInlineSnapshot()

> **toThrowErrorMatchingInlineSnapshot**(`snapshot?`, `message?`): `this`

Defined in: index.ts:479

Checks that an error thrown by a function matches an inline snapshot within the test file. Useful for keeping
snapshots close to the test code.

###### Parameters

| Parameter   | Type     |
| ----------- | -------- |
| `snapshot?` | `string` |
| `message?`  | `string` |

###### Returns

`this`

##### toThrowErrorMatchingSnapshot()

> **toThrowErrorMatchingSnapshot**(`message?`): `this`

Defined in: index.ts:469

Checks that an error thrown by a function matches a previously recorded snapshot.

###### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `message?` | `string` |

###### Returns

`this`

## Functions

### expect()

> **expect**<`T`>(`actual`): [`Assertion`](#assertion)<`T`>

Defined in: index.ts:506

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

[`Assertion`](#assertion)<`T`>

***

### expectToFail()

> **expectToFail**(`message?`): `never`

Defined in: index.ts:511

This method is used to assert that a line should never be reached.

#### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `message?` | `string` |

#### Returns

`never`

***

### expectToHaveAssertions()

> **expectToHaveAssertions**(): `void`

Defined in: index.ts:520

After the test has passed or failed verify that at least one assertion was called during a test. A useful case would
be to check if an asynchronous code was called.

For example, if you have a code that calls a callback, we can make an assertion inside a callback, but the test will
always pass if we don't check if an assertion was called.

#### Returns

`void`

***

### expectToHaveAssertionTimes()

> **expectToHaveAssertionTimes**(`times`): `void`

Defined in: index.ts:529

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

***

### matchAny()

> **matchAny**(`klass`): `any`

Defined in: index.ts:536

This asymmetric matcher, when used with an equality check, will return true only if the value is an instance of a
specified constructor. Useful, if you have a value that is generated each time, and you only want to know that it
exists with a proper type.

#### Parameters

| Parameter | Type      |
| --------- | --------- |
| `klass`   | `unknown` |

#### Returns

`any`

***

### matchAnything()

> **matchAnything**(): `any`

Defined in: index.ts:542

This asymmetric matcher, when used with equality check, will always return true. Useful, if you just want to be sure
that the property exist.

#### Returns

`any`

***

### matchArrayContaining()

> **matchArrayContaining**(`expected`): `any`

Defined in: index.ts:547

Matches if the received array contains all elements in the expected array.

#### Parameters

| Parameter  | Type         |
| ---------- | ------------ |
| `expected` | `unknown`\[] |

#### Returns

`any`

***

### matchCloseTo()

> **matchCloseTo**(`expected`, `precision?`): `any`

Defined in: index.ts:552

Matches if the received number is within a certain precision of the expected number.

#### Parameters

| Parameter    | Type     |
| ------------ | -------- |
| `expected`   | `number` |
| `precision?` | `number` |

#### Returns

`any`

***

### matchObjectContaining()

> **matchObjectContaining**(`expected`): `any`

Defined in: index.ts:557

Matches if the received object contains all properties of the expected object.

#### Parameters

| Parameter  | Type      |
| ---------- | --------- |
| `expected` | `unknown` |

#### Returns

`any`

***

### matchStringContaining()

> **matchStringContaining**(`expected`): `any`

Defined in: index.ts:562

Matches if the received string contains the expected substring.

#### Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `expected` | `string` |

#### Returns

`any`

***

### matchStringMatching()

> **matchStringMatching**(`expected`): `any`

Defined in: index.ts:567

Matches if the received string or regex matches the expected pattern.

#### Parameters

| Parameter  | Type                 |
| ---------- | -------------------- |
| `expected` | `string` \| `RegExp` |

#### Returns

`any`

***

### softExpect()

> **softExpect**<`T`>(`actual`): [`Assertion`](#assertion)<`T`>

Defined in: index.ts:575

Functions similarly to [expect](#expect), but instead of terminating the test execution upon a failed assertion, it
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

[`Assertion`](#assertion)<`T`>
