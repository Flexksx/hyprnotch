import { Astal, Gdk } from 'ags/gtk4';

export default function BarContainerBackground({
  gdkmonitor
}: {
  gdkmonitor: Gdk.Monitor;
}) {
  return (
    <window
      visible
      class="hyprnotch-bar-container-background-window"
      name="hyprnotchBarContainerBackground"
      gdkmonitor={gdkmonitor}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
    >
      <box class="hyprnotch-bar-container-background"></box>
    </window>
  );
}
