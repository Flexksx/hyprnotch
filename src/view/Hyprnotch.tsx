import { App, Astal, Gdk } from "astal/gtk3";
import { bind } from "astal";
import ExpandedNotch from "./notch/expanded/ExpandedNotch";
import NormalNotch from "./notch/normal/NormalNotch";
import Logger from "../logger/Logger";
import HoverViewModel from "../hover/HoverViewModel";
import NotchStateViewModel from "../notch_state/NotchStateViewModel";
import { NotchState } from "../notch_state/NotchState";

export default function Hyprnotch(gdkmonitor: Gdk.Monitor) {
  const notchStateViewModel = new NotchStateViewModel();

  const logger: Logger = new Logger("Hyprnotch");
  logger.debug(`Hyprnotch created on monitor ${gdkmonitor.get_manufacturer()}`);

  return (
    <window
      className="hyprnotch"
      namespace="hyprnotch"
      gdkmonitor={gdkmonitor}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      child={
        <centerbox
          centerWidget={
            <button
              onHover={() =>
                notchStateViewModel.setNotchState(NotchState.HOVERED)
              }
              onHoverLost={() =>
                notchStateViewModel.setNotchState(NotchState.NORMAL)
              }
              className="hyprnotch-button-hover-area"
              child={notchStateViewModel.getNotchState().as((notchState) => {
                switch (notchState) {
                  case NotchState.NORMAL:
                    return <NormalNotch />;
                  case NotchState.HOVERED:
                    return <ExpandedNotch />;
                }
              })}
            />
          }
        ></centerbox>
      }
    />
  );
}
