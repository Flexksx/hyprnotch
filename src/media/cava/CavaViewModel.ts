import AstalCava from 'gi://AstalCava';
import Logger from '../../logger/Logger';
import { bind, Binding } from 'astal';

export default class CavaViewModel {
  private static instance: CavaViewModel | null = null;
  private cava!: AstalCava.Cava;
  private logger: Logger = new Logger('CavaViewModel');

  private constructor(barCount: number = 5) {
    try {
      this.cava = AstalCava.get_default()!;
      if (!this.cava) {
        this.logger.error('Cava is not available');
        throw new Error('Cava is not available');
      }

      this.logger.debug('CavaViewModel initialized');
      this.cava.set_bars(barCount);
      this.cava.set_autosens(true);

      this.logger.debug(`Cava bars set to ${barCount}`);
    } catch (error) {
      this.logger.error('Failed to initialize CavaViewModel:', error);
      throw error;
    }
  }

  public static getInstance(barCount: number = 5): CavaViewModel {
    if (!CavaViewModel.instance) {
      CavaViewModel.instance = new CavaViewModel(barCount);
    } else if (CavaViewModel.instance.cava.get_bars() !== barCount) {
      // Update bar count if different
      CavaViewModel.instance.cava.set_bars(barCount);
      CavaViewModel.instance.logger.debug(`Updated Cava bars to ${barCount}`);
    }
    return CavaViewModel.instance;
  }

  public getCava(): AstalCava.Cava {
    if (!this.cava) {
      this.logger.error('Cava is not initialized');
      throw new Error('Cava is not initialized');
    }
    return this.cava;
  }

  public getCavaValues(): Binding<number[]> {
    return bind(this.getCava(), 'values');
  }

  public getCavaBars(): Binding<number> {
    return bind(this.getCava(), 'bars');
  }
}
