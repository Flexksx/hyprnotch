import Battery from "gi://AstalBattery";
import Logger from "../../logger/Logger";
import { bind, Binding } from "astal";

export default class BatteryViewModel {
    private logger = new Logger(this.constructor.name);
    private battery = Battery.get_default();

    public getBatteryPercentage(): Binding<number> {
        return bind(this.battery, "percentage");
    }

    public getBatteryState(): Binding<Battery.State> {
        return bind(this.battery, "state");
    }

    public getBatteryIcon(): Binding<string> {
        return bind(this.battery, "icon_name");
    }

}