import { Gdk } from "astal/gtk3";
import BatteryViewModel from "../../battery/BatteryViewModel";
import Logger from "../../logger/Logger";

function BatteryLevelCircularProgress() {
  const batteryViewModel = new BatteryViewModel();
  const logger = new Logger("BatteryLevelCircularProgress");
  logger.debug("BatteryLevelCircularProgress component created");
  logger.debug(
    `Battery percentage: ${batteryViewModel.getBatteryPercentage().get()}`
  );

  return (
    <circularprogress
      className={"battery_level_circular_progress"}
      value={batteryViewModel.getBatteryPercentage()}
      startAt={0.0}
      endAt={1.0}
    />
  );
}

export default function SystemDetails(monitor: Gdk.Monitor) {
  const logger = new Logger("SystemDetails");
  const batteryViewModel = new BatteryViewModel();
  logger.debug("SystemDetails component created");
  return (
    <box
      className="system_details_container"
      children={[
        <circularprogress
          className={"battery_level_circular_progress"}
          value={batteryViewModel.getBatteryPercentage()}
          startAt={0.0}
          endAt={1.0}
        />,
      ]}
    />
  );
}
