import nerdfonts from '../../lib/icons/nerdfonts';
import ThemeSelection from '../../matugen/ThemeSelection';
import WirePlumberViewModel from '../../sound/WirePlumberViewModel';
import { NotchState } from '../NotchState';
import NotchStateViewModel from '../NotchStateViewModel';

type ExpandedNotchButtonProps = {
  notchStateViewModel: NotchStateViewModel;
};

const ThemePaletteButton = ({
  notchStateViewModel
}: ExpandedNotchButtonProps) => {
  return (
    <button
      cssName="icon_button xsmall"
      label={nerdfonts.icons.pallette.outline}
      onClick={() => {
        const currentState = notchStateViewModel.getNotchState().get();
        if (currentState === NotchState.THEME_SELECTION) {
          notchStateViewModel.setNotchState(NotchState.NORMAL);
        } else {
          notchStateViewModel.setNotchState(NotchState.THEME_SELECTION);
        }
      }}
    />
  );
};

const SoundSettingsButton = ({
  notchStateViewModel
}: ExpandedNotchButtonProps) => {
  const wirePlumberViewModel = WirePlumberViewModel.getInstance();
  return (
    <button
      cssName="icon_button xsmall"
      child={<icon icon={wirePlumberViewModel.getDefaultSpeakerVolumeIcon()} />}
      onClick={() => {
        const currentState = notchStateViewModel.getNotchState().get();
        if (currentState === NotchState.SOUND_SETTINGS) {
          notchStateViewModel.setNotchState(NotchState.NORMAL);
        } else {
          notchStateViewModel.setNotchState(NotchState.SOUND_SETTINGS);
        }
      }}
    />
  );
};

type SettingsMenuProps = { notchStateViewModel: NotchStateViewModel };

export default function SettingsMenu(props: SettingsMenuProps) {
  return (
    <box
      cssName="settings_menu"
      child={
        <box
          children={[
            <SoundSettingsButton
              notchStateViewModel={props.notchStateViewModel}
            />,
            <ThemePaletteButton
              notchStateViewModel={props.notchStateViewModel}
            />,
            <button cssName={'icon_button xsmall'} label={'Option 3'} />
          ]}
        ></box>
      }
    ></box>
  );
}
