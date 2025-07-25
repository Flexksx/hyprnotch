import { Accessor, createBinding } from 'ags';
import Logger from '../logger/Logger';
import AstalTray from 'gi://AstalTray';

export class SystemTrayViewModel {
  private readonly tray = AstalTray.get_default();
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor() {}

  public getTrayItems(): Binding<Tray.TrayItem[]> {
    return bind(this.tray, 'items');
  }
  public getFocusedTrayItem(): Accessor<Tray.TrayItem | null> {
    return createBinding(this.focusedTrayItem);
  }

  public setFocusedTrayItem(item: Tray.TrayItem | null): void {
    if (!item) {
      this.logger.debug('Clearing focused tray item');
      this.focusedTrayItem.set(null);
    } else {
      this.logger.debug('Focusing tray item', item.get_title());
      this.focusedTrayItem.set(item);
    }
  }

  public refreshTrayItem(item: Tray.TrayItem): void {
    this.logger.debug(
      'Refreshing tray item',
      item.get_title(),
      item.get_tooltip()?.description,
      item.get_icon_name()
    );
    item.about_to_show();
  }
}
