import { App, Astal, Gdk } from 'astal/gtk3';
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
