import { NotchContentState } from "../../../notch/content/NotchContentState";
import NotchContentViewModel from "../../../notch/content/NotchContentViewModel";
import { NotchState } from "../../../notch/state/NotchState";
import NotchStateViewModel from "../../../notch/state/NotchStateViewModel";
import WirePlumberViewModel from "../../../sound/WirePlumberViewModel";

const SPEAKER_ICON = "🔊";
const BLUETOOTH_ICON = "\udb80\udcaf";

type SoundSettingsButtonProps = {
  notchContentViewModel: NotchContentViewModel;
};

const toggleSoundSettings = (notchContentViewModel: NotchContentViewModel) => {
  const currentState = notchContentViewModel.getNotchContentState().get();
  if (currentState === NotchContentState.SOUND_SETTINGS) {
    notchContentViewModel.setNotchContentState(NotchContentState.DEFAULT);
  } else {
    notchContentViewModel.setNotchContentState(
      NotchContentState.SOUND_SETTINGS
    );
  }
};

function SoundSettingsButton(props: SoundSettingsButtonProps) {
  const wirePlumberViewModel = new WirePlumberViewModel();
  return (
    <button
      className="icon_button xsmall"
      child={<icon icon={wirePlumberViewModel.getDefaultSpeakerVolumeIcon()} />}
      onClick={() => toggleSoundSettings(props.notchContentViewModel)}
    />
  );
}

type SettingsMenuProps = { notchContentViewModel: NotchContentViewModel };

export default function SettingsMenu(props: SettingsMenuProps) {
  return (
    <box
      className="settings_menu"
      child={
        <box
          children={[
            <SoundSettingsButton
              notchContentViewModel={props.notchContentViewModel}
            />,
            <button className={"icon_button xsmall"} label={"Option 2"} />,
            <button className={"icon_button xsmall"} label={"Option 3"} />,
          ]}
        ></box>
      }
    ></box>
  );
}
