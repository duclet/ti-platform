import type { BeanDefinition } from '@src/bean-definition';
import { MapPlus } from '@ti-platform/aide';

/**
 * Manages bean instances and their dependencies.
 */
export class Container {
    constructor(
        private readonly instances: MapPlus<symbol, unknown> = new MapPlus(),
        private readonly resolutionStack: Array<symbol> = []
    ) {}

    /**
     * Resolves a bean definition and returns its instance.
     * Ensures singleton behavior - same instance returned for subsequent calls.
     *
     * @param bean Bean definition to resolve
     * @returns The resolved bean instance
     */
    resolve<T>(bean: BeanDefinition<T>): T {
        if (this.instances.has(bean.id)) {
            return this.instances.get(bean.id) as T;
        }

        // Check for circular dependency
        if (this.resolutionStack.includes(bean.id)) {
            throw new Error('Circular dependency detected: ' + bean.id.description);
        }

        // Add to resolution stack for circular dependency detection
        this.resolutionStack.push(bean.id);

        try {
            const instance = bean.factory((bean) => this.resolve(bean));
            this.instances.set(bean.id, instance);
            return instance;
        } finally {
            this.resolutionStack.pop();
        }
    }
}

/**
 * Creates a new dependency injection container.
 */
export function createContainer(): Container {
    return new Container();
}
