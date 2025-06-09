import Tray from "gi://AstalTray";
import Logger from "../logger/Logger";
import { bind, Binding } from "astal";

export class SystemTrayViewModel {
  private readonly tray = Tray.get_default();
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor() {}

  public getTrayItems(): Binding<Tray.TrayItem[]> {
    this.logger.debug("Getting tray items");
    return bind(this.tray, "items");
  }
}
