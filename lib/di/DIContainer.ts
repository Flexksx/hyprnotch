import Logger from '../../src/logger/Logger';

type Constructor<T = {}> = new (...args: any[]) => T;

class DIContainer {
  private static instance: DIContainer;
  private singletons = new Map<Constructor, any>();
  private logger = new Logger('DIContainer');

  private constructor() {}

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  public registerSingleton<T>(constructor: Constructor<T>): void {
    if (this.singletons.has(constructor)) {
      this.logger.warn(`Singleton ${constructor.name} is already registered`);
      return;
    }

    // Create the instance
    const instance = new constructor();
    this.singletons.set(constructor, instance);
    this.logger.debug(`Registered singleton: ${constructor.name}`);
  }

  public getSingleton<T>(constructor: Constructor<T>): T {
    const instance = this.singletons.get(constructor);
    if (!instance) {
      throw new Error(
        `Singleton ${constructor.name} not found. Did you forget to add @SingletonViewModel decorator?`
      );
    }
    return instance as T;
  }

  public hasSingleton<T>(constructor: Constructor<T>): boolean {
    return this.singletons.has(constructor);
  }

  public clear(): void {
    this.singletons.clear();
    this.logger.debug('Cleared all singletons');
  }
}

export default DIContainer;
