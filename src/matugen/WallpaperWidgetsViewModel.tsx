import WallpapersViewModel from './WallpapersViewModel';
import Logger from '../logger/Logger';
import { Gtk } from 'ags/gtk4';
export default class WallpaperWidgetsViewModel {
  private wallpapersViewModel = WallpapersViewModel.getInstance();
  private logger: Logger = new Logger(this.constructor.name);
  private wallpaperWidgets: Binding<Gtk.Widget[]>;
  private static instance: WallpaperWidgetsViewModel;

  private constructor() {
    this.logger.debug('WallpaperWidgetsViewModel created');
    this.wallpaperWidgets = this.wallpapersViewModel
      .getWallpaperPaths()
      .as(wallpaperPaths =>
        wallpaperPaths.map(path => (
          <icon cssName="wallpaper-widget" icon={path} />
        ))
      );
  }

  public static getInstance(): WallpaperWidgetsViewModel {
    if (!this.instance) {
      this.instance = new WallpaperWidgetsViewModel();
    }
    return this.instance;
  }

  public getWallpaperWidgets(
    offset: number = 0,
    limit: number = 3
  ): Binding<Gtk.Widget[]> {
    return this.wallpaperWidgets.as(widgets => {
      this.logger.debug(
        'Getting wallpaper widgets with offset:',
        offset,
        'and limit:',
        limit
      );
      return widgets.slice(offset, offset + limit);
    });
  }
}
