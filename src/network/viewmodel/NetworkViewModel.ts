import { bind, Binding } from "astal";
import Network from "gi://AstalNetwork";
import Logger from "../../logger/Logger";
import NM from "gi://NM";

export default class NetworkViewModel {
  private network: Network.Network = Network.get_default();
  private logger: Logger = new Logger("NetworkViewModel");
  constructor() {}

  public getWifi(): Network.Wifi {
    const wifi = this.network.get_wifi();
    if (!wifi) {
      this.logger.error("No wifi found");
      throw new Error("No wifi found");
    }
    return wifi;
  }

  public getActiveWifiConnection(): Binding<NM.ActiveConnection> {
    const wifi = this.getWifi();
    return bind(wifi, "active_connection");
  }

  public hasActiveWifiConnection(): Binding<boolean> {
    return this.getActiveWifiConnection().as((activeConnection) => {
      return activeConnection !== null;
    });
  }
}
