import DIContainer from './DIContainer';

type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * Decorator that registers a class as a singleton in the DI container
 * @param constructor The class constructor to register as singleton
 */
export function SingletonViewModel<T extends Constructor>(constructor: T): T {
  const container = DIContainer.getInstance();

  // Register the singleton when the decorator is applied
  container.registerSingleton(constructor);

  // Return the original constructor - the container handles singleton behavior
  return constructor;
}

/**
 * Helper function to get a singleton instance from anywhere in the code
 * @param constructor The class constructor
 * @returns The singleton instance
 */
export function getInstance<T>(constructor: Constructor<T>): T {
  const container = DIContainer.getInstance();
  return container.getSingleton(constructor);
}

/**
 * Helper function to check if a singleton is registered
 * @param constructor The class constructor
 * @returns True if the singleton is registered
 */
export function isRegistered<T>(constructor: Constructor<T>): boolean {
  const container = DIContainer.getInstance();
  return container.hasSingleton(constructor);
}
