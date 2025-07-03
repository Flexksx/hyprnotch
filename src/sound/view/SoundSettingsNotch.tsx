import { bind } from "astal";
import Logger from "../../logger/Logger";
import WirePlumberViewModel from "../WirePlumberViewModel";
import SoundSlider from "../speaker_volume/SoundSlider";

export default function SoundSettingsNotch() {
  const wirePlumberViewModel = new WirePlumberViewModel();
  const logger = new Logger("SoundSettingsNotch");

  return (
    <box
      className="sound_settings_notch"
      child={
        <box
          children={[
            <SoundSlider
              wirePlumberViewModel={wirePlumberViewModel}
              initialValue={
                wirePlumberViewModel.getDefaultSpeakerVolume().get() * 100
              }
            />,
          ]}
        />
      }
    />
  );
}
