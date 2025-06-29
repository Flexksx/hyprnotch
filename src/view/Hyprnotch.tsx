import { App, Astal, Gdk } from "astal/gtk3";
import ExpandedNotch from "./notch/expanded/ExpandedNotch";
import NormalNotch from "./notch/normal/NormalNotch";
import Logger from "../logger/Logger";
import NotchStateViewModel from "../notch/state/NotchStateViewModel";
import { NotchState } from "../notch/state/NotchState";
import NotifiedNotch from "./notch/notification/NotifiedNotch";
import SoundSettingsNotch from "../sound/SoundSettingsNotch";

export default function Hyprnotch(gdkmonitor: Gdk.Monitor) {
  const notchStateViewModel = new NotchStateViewModel();
  const logger: Logger = new Logger("Hyprnotch");

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
              className={notchStateViewModel
                .getNotchState()
                .as((notchState) => {
                  let classes = "hyprnotch-button-area";
                  /* if (notchState === NotchState.HOVERED) {
                    classes += " expanded";
                  } */
                  switch (notchState) {
                    case NotchState.HOVERED:
                      classes += " expanded";
                      break;
                    case NotchState.SOUND_SETTINGS:
                      classes += " sound_settings";
                      break;
                    case NotchState.NORMAL:
                      classes += " normal";
                      break;
                  }

                  return classes;
                })}
              child={notchStateViewModel.getNotchState().as((notchState) => {
                switch (notchState) {
                  case NotchState.SOUND_SETTINGS:
                    return <SoundSettingsNotch />;
                  case NotchState.HOVERED:
                    return (
                      <ExpandedNotch
                        notchStateViewModel={notchStateViewModel}
                      />
                    );
                  case NotchState.NORMAL:
                    return <NormalNotch />;
                }
              })}
            />
          }
        />
      }
    />
  );
}
