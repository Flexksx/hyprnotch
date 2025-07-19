import { exec } from 'astal';
import Logger from '../logger/Logger';

export enum MatugenMaterialSchemas {
  CONTENT = 'scheme-content',
  EXPRESSIVE = 'scheme-expressive',
  FIDELITY = 'scheme-fidelity',
  FRUIT_SALAD = 'scheme-fruit-salad',
  MONOCHROME = 'scheme-monochrome',
  NEUTRAL = 'scheme-neutral',
  RAINBOW = 'scheme-rainbow',
  TONAL_SPOT = 'scheme-tonal-spot',
  VIBRANT = 'scheme-vibrant'
}

export enum MatugenMode {
  LIGHT = 'light',
  DARK = 'dark'
}

export default class MatugenViewModel {
  private static instance: MatugenViewModel;
  private logger = new Logger(this.constructor.name);

  private constructor() {}

  public static getInstance(): MatugenViewModel {
    if (!MatugenViewModel.instance) {
      MatugenViewModel.instance = new MatugenViewModel();
    }
    return MatugenViewModel.instance;
  }

  public getMaterialSchemas(): MatugenMaterialSchemas[] {
    return Object.values(MatugenMaterialSchemas);
  }
  public generateForImage(
    image: string,
    schema: MatugenMaterialSchemas = MatugenMaterialSchemas.CONTENT,
    mode: MatugenMode = MatugenMode.LIGHT
  ) {
    this.logger.debug(
      `Generating material for image ${image} with schema ${schema}`
    );
    exec(`matugen -m ${mode} -t ${schema} image ${image}`);
  }
}
