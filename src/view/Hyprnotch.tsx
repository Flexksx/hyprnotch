import { App, Astal, Gdk } from "astal/gtk3";
import { bind } from "astal";
import ExpandedNotch from "./notch/expanded/ExpandedNotch";
import NormalNotch from "./notch/normal/NormalNotch";
import Logger from "../logger/Logger";
import HoverViewModel from "../hover/HoverViewModel";
import NotchStateViewModel from "../notch_state/NotchStateViewModel";
import { NotchState } from "../notch_state/NotchState";
import NotifiedNotch from "./notch/notification/NotifiedNotch";

export default function Hyprnotch(gdkmonitor: Gdk.Monitor) {
  const notchStateViewModel = NotchStateViewModel.getInstance();

  const logger: Logger = new Logger("Hyprnotch");
  logger.debug(`Hyprnotch created on monitor ${gdkmonitor.get_manufacturer()}`);

  return (
    <window
      className="hyprnotch"
      namespace="hyprnotch"
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.TOP}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      child={
        <centerbox
          centerWidget={
            <button
              onButtonPressEvent={() => {
                notchStateViewModel.getNotchState().get() === NotchState.NORMAL
                  ? notchStateViewModel.setNotchState(NotchState.HOVERED)
                  : notchStateViewModel.setNotchState(NotchState.NORMAL);
              }}
              className="hyprnotch-button-area"
              child={notchStateViewModel.getNotchState().as((notchState) => {
                switch (notchState) {
                  case NotchState.NORMAL:
                    return <NormalNotch />;
                  case NotchState.HOVERED:
                    return <ExpandedNotch />;
                  case NotchState.NEW_NOTIFICATION:
                    return <NotifiedNotch />;
                }
              })}
            />
          }
        ></centerbox>
      }
    />
  );
}
