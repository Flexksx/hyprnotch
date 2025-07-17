import { App, Astal, Gdk } from "astal/gtk3";
import ExpandedNotch from "./notch/expanded/ExpandedNotch";
import NormalNotch from "./notch/normal/NormalNotch";
import Logger from "../logger/Logger";
import NotchStateViewModel from "../notch/state/NotchStateViewModel";
import { NotchState } from "../notch/state/NotchState";
import SoundSettingsNotch from "../sound/SoundSettingsNotch";

export type HyprnotchProps = {
  gdkmonitor: Gdk.Monitor;
};

export default function Hyprnotch(props: HyprnotchProps) {
  const notchStateViewModel = new NotchStateViewModel();
  const { gdkmonitor } = props;

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
                  ? notchStateViewModel.setNotchState(NotchState.EXPANDED)
                  : notchStateViewModel.setNotchState(NotchState.NORMAL);
              }}
              className={notchStateViewModel
                .getNotchState()
                .as((notchState) => "hyprnotch-button-area " + notchState)}
              child={notchStateViewModel.getNotchState().as((notchState) => {
                switch (notchState) {
                  case NotchState.SOUND_SETTINGS:
                    return <SoundSettingsNotch />;
                  case NotchState.EXPANDED:
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
