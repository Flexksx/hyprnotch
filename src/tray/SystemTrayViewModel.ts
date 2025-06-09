import Tray from "gi://AstalTray";
import Logger from "../logger/Logger";
import { bind, Binding, Variable } from "astal";

export class SystemTrayViewModel {
  private readonly tray = Tray.get_default();
  private readonly logger: Logger = new Logger(this.constructor.name);
  private focusedTrayItem: Variable<Tray.TrayItem | null> = new Variable(null);

  constructor() {}

  public getTrayItems(): Binding<Tray.TrayItem[]> {
    this.logger.debug("Getting tray items");
    return bind(this.tray, "items");
  }
  public getFocusedTrayItem(): Binding<Tray.TrayItem | null> {
    this.logger.debug("Getting focused tray item");
    return bind(this.focusedTrayItem);
  }

  public setFocusedTrayItem(item: Tray.TrayItem | null): void {
    if (!item) {
      this.logger.debug("Clearing focused tray item");
      this.focusedTrayItem.set(null);
    } else {
      this.logger.debug("Focusing tray item", item.get_title());
      this.focusedTrayItem.set(item);
    }
  }
}
