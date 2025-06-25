import { Astal, Gdk } from "astal/gtk3";
import BatteryViewModel from "../../battery/BatteryViewModel";
import Logger from "../../logger/Logger";
import { IconSource } from "../../lib/icons/IconUtils";

type BatteryLevelCircularProgressProps = { batteryViewModel: BatteryViewModel };

function BatteryLevelCircularProgress(
  props: BatteryLevelCircularProgressProps
) {
  const logger = new Logger("BatteryLevelCircularProgress");
  const batteryViewModel = new BatteryViewModel();
  return (
    <circularprogress
      rounded={true}
      value={batteryViewModel.getBatteryPercentage().as((percentage) => {
        logger.debug(`Battery percentage: ${percentage}`);
        return percentage;
      })}
      startAt={0}
      endAt={1}
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
      children={[
        <BatteryLevelCircularProgress batteryViewModel={batteryViewModel} />,
      ]}
    />
  );
}

export default function SystemDetails(monitor: Gdk.Monitor) {
  return (
    <window
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      child={<SystemDetailsBarModule monitor={monitor} />}
    />
  );
}
