import NotchStateViewModel from './NotchStateViewModel';
import { NotchState } from './NotchState';
import SoundSettingsNotch from '../sound/SoundSettingsNotch';
import ExpandedNotch from './expanded/ExpandedNotch';
import NormalNotch from './normal/NormalNotch';
import ThemeSelection from '../matugen/ThemeSelection';
export type HyprnotchProps = {
  gdkmonitor: Gdk.Monitor;
};

export default function Hyprnotch(props: HyprnotchProps) {
  const notchStateViewModel = new NotchStateViewModel();

  return (
    <window
      cssName="hyprnotch"
      namespace="hyprnotch"
      anchor={Astal.WindowAnchor.TOP}
      exclusivity={Astal.Exclusivity.IGNORE}
      child={
        <centerbox
          centerWidget={
            <button
              onButtonPressEvent={() => {
                notchStateViewModel.getNotchState().get() === NotchState.NORMAL
                  ? notchStateViewModel.setNotchState(NotchState.EXPANDED)
                  : notchStateViewModel.setNotchState(NotchState.NORMAL);
              }}
              cssName={notchStateViewModel
                .getNotchState()
                .as(notchState => 'hyprnotch-button-area ' + notchState)}
              child={notchStateViewModel.getNotchState().as(notchState => {
                switch (notchState) {
                  case NotchState.SOUND_SETTINGS:
                    return <SoundSettingsNotch />;
                  case NotchState.THEME_SELECTION:
                    return <ThemeSelection />;
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
