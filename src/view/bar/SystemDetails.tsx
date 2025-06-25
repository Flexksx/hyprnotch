import { Astal, Gdk } from "astal/gtk3";
import BatteryViewModel from "../../battery/BatteryViewModel";
import Logger from "../../logger/Logger";
import { IconSource } from "../../lib/icons/IconUtils";

function BatteryLevelCircularProgress() {
  const logger = new Logger("BatteryLevelCircularProgress");
  const batteryViewModel = new BatteryViewModel();
  return (
    <circularprogress
      className={"battery_level_circular_progress"}
      value={batteryViewModel.getBatteryPercentage().as((percentage) => {
        logger.debug(`Battery percentage: ${percentage}`);
        return percentage * 100.0;
      })}
      startAt={0}
      endAt={100}
      child={
        <IconSource iconName="battery-symbolic" className="battery_icon" />
      }
    />
  );
}

type SystemDetailsBarModuleProps = {
  monitor: Gdk.Monitor;
};

function SystemDetailsBarModule(props: SystemDetailsBarModuleProps) {
  const logger = new Logger("SystemDetails");
  const batteryViewModel = new BatteryViewModel();
  logger.debug("SystemDetails component created");
  return (
    <box
      className="system_details_container"
      children={[<BatteryLevelCircularProgress />]}
    />
  );
}

export default function SystemDetails(monitor: Gdk.Monitor) {
  return (
    <window
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      child={<SystemDetailsBarModule monitor={monitor} />}
    />
  );
}
