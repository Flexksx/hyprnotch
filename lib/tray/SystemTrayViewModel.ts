import { Accessor, createBinding } from 'ags';
import Logger from '../../src/logger/Logger';
import AstalTray from 'gi://AstalTray';
import { SingletonViewModel } from '../di';

@SingletonViewModel
export default class SystemTrayViewModel {
  private readonly tray = AstalTray.get_default();
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor() {}

  public getTrayItems() {
    return createBinding(this.getTray(), 'items');
  }

  public refreshTrayItem(item: AstalTray.TrayItem): void {
    this.logger.debug(
      'Refreshing tray item',
      item.get_title(),
      item.get_tooltip()?.description,
      item.get_icon_name()
    );
    item.about_to_show();
  }
  private getTray() {
    if (!this.tray) {
      throw new Error('AstalTray is not available');
    }
    return this.tray;
  }
}
