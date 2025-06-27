/**
 * Function type for retrieving dependencies from the container.
 * Used within factory functions to access other beans.
 */
export type GetFunction = <T>(bean: BeanDefinition<T>) => T;

/**
 * Factory function type that creates an instance of type T.
 * Can optionally use the get function to retrieve dependencies.
 */
export type FactoryFunction<T> = (get: GetFunction) => T;

/**
 * Represents a bean definition that can be resolved by a container.
 * Contains the factory function and metadata for creating instances.
 */
export type BeanDefinition<T> = {
    /**
     * Unique identifier for this bean definition.
     */
    readonly id: symbol;

    /**
     * Factory function that creates instances of this bean.
     */
    readonly factory: FactoryFunction<T>;
};

/**
 * Creates a bean definition with the given factory function.
 *
 * @param factory Function that creates instances of type T
 * @returns A new bean definition
 *
 * @example
 * ```typescript
 * // Simple bean without dependencies
 * const configBean = defineBean(() => ({ apiUrl: 'https://api.example.com', databaseUrl: 'https://db.example.com' }));
 *
 * // Bean with dependencies
 * const serviceBean = defineBean((get) => {
 *   const config = get(configBean);
 *   return new ApiService(config.apiUrl);
 * });
 *
 * // Bean with a name
 * const databaseBean = defineBean('database', (get) => {
 *   const config = get(configBean);
 *   return new Database(config.databaseUrl);
 * });
 * ```
 */
export function defineBean<T>(factory: FactoryFunction<T>): BeanDefinition<T>;

/**
 * Creates a bean definition with the given name and factory function.
 *
 * @param name Name for debugging purposes
 * @param factory Function that creates instances of type T
 * @returns A new bean definition
 */
export function defineBean<T>(name: string, factory: FactoryFunction<T>): BeanDefinition<T>;

export function defineBean<T>(
    nameOrFactory: string | FactoryFunction<T>,
    factory?: FactoryFunction<T>
): BeanDefinition<T> {
    const [name, actualFactory] =
        typeof nameOrFactory === 'string' ? [nameOrFactory, factory!] : [undefined, nameOrFactory];

    return { id: Symbol(name), factory: actualFactory };
}
