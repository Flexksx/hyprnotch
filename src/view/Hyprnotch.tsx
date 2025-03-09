import { App, Astal, Gdk } from "astal/gtk3";
import { bind } from "astal";
import HoverViewModel from "../viewmodel/HoverViewModel";
import ExpandedNotch from "./expanded/ExpandedNotch";
import NormalNotch from "./normal/NormalNotch";

export default function Hyprnotch(gdkmonitor: Gdk.Monitor) {
  const hoverViewModel = new HoverViewModel();

  const setHovered = () => hoverViewModel.isHovered.set(true);
  const setNotHovered = () => hoverViewModel.isHovered.set(false);

  return (
    <window
      className="hyprnotch"
      namespace="hyprnotch"
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.TOP}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
    >
      <button
        onHover={setHovered}
        onHoverLost={setNotHovered}
        className="hyprnotch-button-hover-area"
      >
        {bind(hoverViewModel.isHovered).as((isNotchHovered) => {
          if (isNotchHovered) {
            log(
              `hyprnotch hovered on monitor ${gdkmonitor.get_manufacturer()}`
            );
            return <ExpandedNotch />;
          } else {
            log(
              `hyprnotch on monitor ${gdkmonitor.get_manufacturer()} is unhovered`
            );
            return <NormalNotch />;
          }
        })}
      </button>
    </window>
  );
}
