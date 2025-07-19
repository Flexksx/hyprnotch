import Logger from '../logger/Logger';
import { bind, Binding, Variable } from 'astal';
import { exec } from 'astal/process';
import { MatugenMaterialSchemas, MatugenMode } from './MatugenViewModel';

export default class ThemeSelectionViewModel {
  private static instance: ThemeSelectionViewModel;
  private logger: Logger = new Logger(this.constructor.name);
  private static readonly WALLPAPERS_PATH: string =
    '/home/ccretu/config/backrgrounds/';
  private static readonly IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
  private wallpaperPaths: Variable<string[]> = new Variable([]);
  private selectedWallpaper: Variable<string | null> = new Variable(null);
  private selectedSchema: Variable<MatugenMaterialSchemas> = new Variable(
    MatugenMaterialSchemas.CONTENT
  );
  private selectedMode: Variable<MatugenMode> = new Variable(MatugenMode.DARK);

  private constructor() {
    this.logger.debug('ThemeSelectionViewModel created');
    this.identifyImagesRecursively();
  }
  public static getInstance(): ThemeSelectionViewModel {
    if (!this.instance) {
      this.instance = new ThemeSelectionViewModel();
    }
    return this.instance;
  }

  private identifyImagesRecursively() {
    this.logger.debug(
      'Identifying images in path:',
      ThemeSelectionViewModel.WALLPAPERS_PATH
    );

    try {
      // Use find command to recursively get all image files
      const output = exec([
        'find',
        ThemeSelectionViewModel.WALLPAPERS_PATH,
        '-type',
        'f',
        '(',
        '-iname',
        '*.jpg',
        '-o',
        '-iname',
        '*.jpeg',
        '-o',
        '-iname',
        '*.png',
        ')'
      ]);

      const imagePaths = output
        .trim()
        .split('\n')
        .filter(path => path.length > 0);
      this.wallpaperPaths.set(imagePaths);
      this.logger.info('Image files found:', imagePaths.length);
      this.logger.debug('Image paths:', imagePaths);
    } catch (error) {
      this.logger.error('Error reading wallpapers directory:', error);
      this.wallpaperPaths.set([]);
    }
  }

  public getWallpaperPaths(): Binding<string[]> {
    return bind(this.wallpaperPaths);
  }

  public getSelectedWallpaper(): Variable<string | null> {
    return this.selectedWallpaper;
  }

  public setSelectedWallpaper(path: string): void {
    this.selectedWallpaper.set(path);
    this.logger.debug('Selected wallpaper:', path);
  }

  public getSelectedSchema(): Variable<MatugenMaterialSchemas> {
    return this.selectedSchema;
  }

  public setSelectedSchema(schema: MatugenMaterialSchemas): void {
    this.selectedSchema.set(schema);
    this.logger.debug('Selected schema:', schema);
  }

  public getSelectedMode(): Variable<MatugenMode> {
    return this.selectedMode;
  }

  public setSelectedMode(mode: MatugenMode): void {
    this.selectedMode.set(mode);
    this.logger.debug('Selected mode:', mode);
  }

  public applySelectedTheme(): void {
    const wallpaper = this.selectedWallpaper.get();
    const schema = this.selectedSchema.get();
    const mode = this.selectedMode.get();

    if (!wallpaper) {
      this.logger.error('No wallpaper selected');
      return;
    }

    this.logger.info(
      `Applying theme: ${wallpaper} with ${schema} in ${mode} mode`
    );

    try {
      exec(`matugen -m ${mode} -t ${schema} image ${wallpaper}`);
      this.logger.info('Theme applied successfully');
    } catch (error) {
      this.logger.error('Failed to apply theme:', error);
    }
  }
}
