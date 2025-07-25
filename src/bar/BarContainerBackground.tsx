import { Astal, Gdk } from 'ags/gtk4';
import Logger from '../logger/Logger';

type BarContainerBackgroundProps = {
  monitor: Gdk.Monitor;
};
const logger = new Logger('BarContainerBackground');
export default function BarContainerBackground({
  monitor
}: BarContainerBackgroundProps) {
  return (
    <window
      gdkmonitor={monitor}
      cssName="hyprnotch"
      namespace="hyprnotch"
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
    >
      <box cssName="hyprnotch_bar_container_background" />
    </window>
  );
}
