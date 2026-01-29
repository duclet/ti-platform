# @ti-platform/di

A lightweight, type-safe dependency injection container for TypeScript applications. This package provides a simple yet powerful DI system with singleton behavior, lazy instantiation, circular dependency detection, and full TypeScript support.

## Features

* **Type Safety**: Full TypeScript support with proper type inference
* **Singleton Behavior**: Each bean is instantiated only once per container
* **Lazy Instantiation**: Beans are created only when first requested
* **Dependency Injection**: Factory functions receive a `get()` function to retrieve dependencies
* **Circular Dependency Detection**: Clear error messages when circular dependencies are detected
* **Named Beans**: Optional naming for better debugging and error messages
* **Lightweight**: Minimal dependencies (only @ti-platform/aide)

## Installation

```bash
pnpm add @ti-platform/di
```

## Quick Start

```typescript
import { defineBean, createContainer } from '@ti-platform/di';

// Define your beans
const configBean = defineBean(() => ({
  apiUrl: 'https://api.example.com',
  timeout: 5000
}));

const apiServiceBean = defineBean((get) => {
  const config = get(configBean);
  return new ApiService(config.apiUrl, config.timeout);
});

// Create a container and resolve dependencies
const container = createContainer();
const apiService = container.resolve(apiServiceBean);
```

## Advanced Usage

### Named Beans

You can provide names for your beans to improve debugging and error messages:

```typescript
const databaseBean = defineBean('database', (get) => {
  const config = get(configBean);
  return new Database(config.databaseUrl);
});

const userServiceBean = defineBean('userService', (get) => {
  const db = get(databaseBean);
  return new UserService(db);
});
```

### Complex Dependencies

```typescript
// Configuration bean
const configBean = defineBean('config', () => ({
  apiUrl: 'https://api.example.com',
  databaseUrl: 'postgresql://localhost:5432/mydb',
  cacheSize: 1000
}));

// Database connection
const databaseBean = defineBean('database', (get) => {
  const config = get(configBean);
  return new Database(config.databaseUrl);
});

// Cache service
const cacheBean = defineBean('cache', (get) => {
  const config = get(configBean);
  return new Cache({ maxSize: config.cacheSize });
});

// User repository with multiple dependencies
const userRepositoryBean = defineBean('userRepository', (get) => {
  const db = get(databaseBean);
  const cache = get(cacheBean);
  return new UserRepository(db, cache);
});

// API service that depends on repository
const apiServiceBean = defineBean('apiService', (get) => {
  const config = get(configBean);
  const userRepo = get(userRepositoryBean);
  return new ApiService(config.apiUrl, userRepo);
});
```

### Error Handling

The container provides clear error messages for common issues:

```typescript
// Circular dependency detection
const beanA = defineBean('beanA', (get) => ({ b: get(beanB) }));
const beanB = defineBean('beanB', (get) => ({ a: get(beanA) }));

const container = createContainer();
try {
  container.resolve(beanA);
} catch (error) {
  console.error(error.message); // "Circular dependency detected: beanA"
}

// Factory function errors are propagated
const errorBean = defineBean('errorBean', () => {
  throw new Error('Something went wrong');
});

try {
  container.resolve(errorBean);
} catch (error) {
  console.error(error.message); // "Something went wrong"
}
```

### Multiple Containers

Each container maintains its own instances:

```typescript
const container1 = createContainer();
const container2 = createContainer();

const service1 = container1.resolve(apiServiceBean);
const service2 = container2.resolve(apiServiceBean);

// service1 and service2 are different instances
console.log(service1 === service2); // false

// But within the same container, instances are singletons
const service1Again = container1.resolve(apiServiceBean);
console.log(service1 === service1Again); // true
```

# API Docs

## Classes

### Container

Defined in: container.ts:7

Manages bean instances and their dependencies.

#### Constructors

##### Constructor

> **new Container**(`instances`, `resolutionStack`): [`Container`](#container)

Defined in: container.ts:8

###### Parameters

| Parameter         | Type                           | Default value |
| ----------------- | ------------------------------ | ------------- |
| `instances`       | `MapPlus`<`symbol`, `unknown`> | `...`         |
| `resolutionStack` | `symbol`\[]                    | `[]`          |

###### Returns

[`Container`](#container)

#### Methods

##### resolve()

> **resolve**<`T`>(`bean`): `T`

Defined in: container.ts:20

Resolves a bean definition and returns its instance.
Ensures singleton behavior - same instance returned for subsequent calls.

###### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

###### Parameters

| Parameter | Type                                     | Description                |
| --------- | ---------------------------------------- | -------------------------- |
| `bean`    | [`BeanDefinition`](#beandefinition)<`T`> | Bean definition to resolve |

###### Returns

`T`

The resolved bean instance

## Type Aliases

### BeanDefinition

> **BeanDefinition**<`T`> = { `factory`: [`FactoryFunction`](#factoryfunction)<`T`>; `id`: `symbol`; }

Defined in: bean-definition.ts:17

Represents a bean definition that can be resolved by a container.
Contains the factory function and metadata for creating instances.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Properties

| Property                       | Modifier   | Type                                       | Description                                           |
| ------------------------------ | ---------- | ------------------------------------------ | ----------------------------------------------------- |
| <a id="factory"></a> `factory` | `readonly` | [`FactoryFunction`](#factoryfunction)<`T`> | Factory function that creates instances of this bean. |
| <a id="id"></a> `id`           | `readonly` | `symbol`                                   | Unique identifier for this bean definition.           |

***

### FactoryFunction()

> **FactoryFunction**<`T`> = (`get`) => `T`

Defined in: bean-definition.ts:11

Factory function type that creates an instance of type T.
Can optionally use the get function to retrieve dependencies.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type                          |
| --------- | ----------------------------- |
| `get`     | [`GetFunction`](#getfunction) |

#### Returns

`T`

***

### GetFunction()

> **GetFunction** = <`T`>(`bean`) => `T`

Defined in: bean-definition.ts:5

Function type for retrieving dependencies from the container.
Used within factory functions to access other beans.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type                                     |
| --------- | ---------------------------------------- |
| `bean`    | [`BeanDefinition`](#beandefinition)<`T`> |

#### Returns

`T`

## Functions

### createContainer()

> **createContainer**(): [`Container`](#container)

Defined in: container.ts:46

Creates a new dependency injection container.

#### Returns

[`Container`](#container)

***

### defineBean()

#### Call Signature

> **defineBean**<`T`>(`factory`): [`BeanDefinition`](#beandefinition)<`T`>

Defined in: bean-definition.ts:53

Creates a bean definition with the given factory function.

##### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

##### Parameters

| Parameter | Type                                       | Description                               |
| --------- | ------------------------------------------ | ----------------------------------------- |
| `factory` | [`FactoryFunction`](#factoryfunction)<`T`> | Function that creates instances of type T |

##### Returns

[`BeanDefinition`](#beandefinition)<`T`>

A new bean definition

##### Example

```typescript
// Simple bean without dependencies
const configBean = defineBean(() => ({ apiUrl: 'https://api.example.com', databaseUrl: 'https://db.example.com' }));

// Bean with dependencies
const serviceBean = defineBean((get) => {
  const config = get(configBean);
  return new ApiService(config.apiUrl);
});

// Bean with a name
const databaseBean = defineBean('database', (get) => {
  const config = get(configBean);
  return new Database(config.databaseUrl);
});
```

#### Call Signature

> **defineBean**<`T`>(`name`, `factory`): [`BeanDefinition`](#beandefinition)<`T`>

Defined in: bean-definition.ts:62

Creates a bean definition with the given name and factory function.

##### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

##### Parameters

| Parameter | Type                                       | Description                               |
| --------- | ------------------------------------------ | ----------------------------------------- |
| `name`    | `string`                                   | Name for debugging purposes               |
| `factory` | [`FactoryFunction`](#factoryfunction)<`T`> | Function that creates instances of type T |

##### Returns

[`BeanDefinition`](#beandefinition)<`T`>

A new bean definition
