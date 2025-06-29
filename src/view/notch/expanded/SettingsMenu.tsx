import { NotchState } from "../../../notch/state/NotchState";
import NotchStateViewModel from "../../../notch/state/NotchStateViewModel";
import WirePlumberViewModel from "../../../sound/WirePlumberViewModel";

const SPEAKER_ICON = "🔊";
const BLUETOOTH_ICON = "\udb80\udcaf";

type SoundSettingsButtonProps = {
  notchStateViewModel: NotchStateViewModel;
};

const toggleSoundSettings = (notchStateViewModel: NotchStateViewModel) => {
  const currentState = notchStateViewModel.getNotchState().get();
  if (currentState === NotchState.SOUND_SETTINGS) {
    notchStateViewModel.setNotchState(NotchState.NORMAL);
  } else {
    notchStateViewModel.setNotchState(NotchState.SOUND_SETTINGS);
  }
};

function SoundSettingsButton(props: SoundSettingsButtonProps) {
  const wirePlumberViewModel = new WirePlumberViewModel();
  return (
    <button
      className="icon_button xsmall"
      child={<icon icon={wirePlumberViewModel.getDefaultSpeakerVolumeIcon()} />}
      onClick={() => toggleSoundSettings(props.notchStateViewModel)}
    />
  );
}

type SettingsMenuProps = { notchStateViewModel: NotchStateViewModel };

export default function SettingsMenu(props: SettingsMenuProps) {
  return (
    <box
      className="settings_menu"
      child={
        <box
          children={[
            <SoundSettingsButton
              notchStateViewModel={props.notchStateViewModel}
            />,
            <button className={"icon_button xsmall"} label={"Option 2"} />,
            <button className={"icon_button xsmall"} label={"Option 3"} />,
          ]}
        ></box>
      }
    ></box>
  );
}
