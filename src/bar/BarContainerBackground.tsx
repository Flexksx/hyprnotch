import { Astal, Gdk } from 'ags/gtk4';
import Logger from '../logger/Logger';

export default function BarContainerBackground({
  gdkmonitor
}: {
  gdkmonitor: Gdk.Monitor;
}) {
  return (
    <window
      visible
      gdkmonitor={gdkmonitor}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
    >
      <box
        class="hyprnotch-bar-container-background"
        css={`
          min-height: 32px;
        `}
      />
    </window>
  );
}
