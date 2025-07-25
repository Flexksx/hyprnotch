import BatteryViewModel from './BatteryViewModel';
import Logger from '../../logger/Logger';
import { IconSource } from '../../lib/icons/IconUtils';

function BatteryLevelCircularProgress() {
  const logger = new Logger('BatteryLevelCircularProgress');
  const batteryViewModel = new BatteryViewModel();
  return (
    <circularprogress
      cssName={'battery_level_circular_progress'}
      rounded={true}
      value={batteryViewModel.getBatteryPercentage().as(percentage => {
        logger.debug(`Battery percentage: ${percentage}`);
        return percentage;
      })}
      startAt={0}
      endAt={1}
      child={<icon icon={batteryViewModel.getBatteryIcon()} />}
    />
  );
}

export default function SystemDetailsBarModule() {
  const logger = new Logger('SystemDetails');
  const batteryViewModel = new BatteryViewModel();
  logger.debug('SystemDetails component created');
  return (
    <box
      valign={Gtk.Align.START}
      halign={Gtk.Align.END}
      cssName="system_details_container"
      children={[<BatteryLevelCircularProgress />]}
    />
  );
}
