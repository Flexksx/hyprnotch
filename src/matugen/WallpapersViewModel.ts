import Logger from '../logger/Logger';

export default class WallpapersViewModel {
  private static readonly WALLPAPERS_PATH: string =
    '/home/ccretu/config/backrgrounds/';

  private static instance: WallpapersViewModel;
  private logger: Logger = new Logger(this.constructor.name);
  private wallpaperPaths: Variable<string[]> = new Variable([]);

  private constructor() {
    this.logger.debug('WallpapersViewModel created');
    this.identifyImagesRecursively();
  }
  public static getInstance(): WallpapersViewModel {
    if (!this.instance) {
      this.instance = new WallpapersViewModel();
    }
    return this.instance;
  }
  private identifyImagesRecursively() {
    this.logger.debug(
      'Identifying images in path:',
      WallpapersViewModel.WALLPAPERS_PATH
    );

    try {
      const output = exec([
        'find',
        WallpapersViewModel.WALLPAPERS_PATH,
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
      this.logger.debug(
        `Identified ${imagePaths.length} images in ${WallpapersViewModel.WALLPAPERS_PATH}`
      );
    } catch (error) {
      this.logger.error('Error identifying images:', error);
    }
  }
  public getWallpaperPaths(): Binding<string[]> {
    return bind(this.wallpaperPaths);
  }
  public getWallpaperPath(index: number): string | null {
    const paths = this.wallpaperPaths.get();
    return index >= 0 && index < paths.length ? paths[index] : null;
  }
  public getWallpaperCount(): number {
    return this.wallpaperPaths.get().length;
  }
  public setWallpaperPath(index: number, path: string): void {
    const paths = this.wallpaperPaths.get();
    if (index >= 0 && index < paths.length) {
      paths[index] = path;
      this.wallpaperPaths.set(paths);
    } else {
      this.logger.warn('Index out of bounds for wallpaper paths');
    }
  }
  public getSelectedWallpaper() {
    const paths = this.wallpaperPaths.get();
    return new Variable(paths.length > 0 ? paths[0] : null);
  }
}
