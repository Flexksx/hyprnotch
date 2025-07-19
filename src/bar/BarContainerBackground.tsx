import { App, Astal, Gdk } from 'astal/gtk3';
export default function BarContainerBackground(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      className="hyprnotch"
      namespace="hyprnotch"
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={App}
      gdkmonitor={gdkmonitor}
      child={<box className="hyprnotch_bar_container_background" />}
    />
  );
}
