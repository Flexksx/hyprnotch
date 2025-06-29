import { bind } from "astal";
import Logger from "../logger/Logger";
import WirePlumberViewModel from "./WirePlumberViewModel";

const wirePlumberViewModel = new WirePlumberViewModel();
const logger = new Logger("SoundSettingsNotch");

function SoundMuteButton() {
  return (
    <button
      className={wirePlumberViewModel.getDefaultSpeakerVolume().as((volume) => {
        let className = "icon_button";
        return volume === 0
          ? (className += " disabled")
          : (className += " enabled");
      })}
      child={<icon icon={wirePlumberViewModel.getDefaultSpeakerVolumeIcon()} />}
      onButtonReleaseEvent={() => {
        wirePlumberViewModel.getDefaultSpeakerVolume().get() > 0
          ? wirePlumberViewModel.muteDefaultSpeaker()
          : wirePlumberViewModel.unmuteDefaultSpeaker();
      }}
    />
  );
}

function SoundSlider() {
  return (
    <box
      vertical={true}
      className="sound_slider"
      children={[
        <SoundMuteButton />,
        <slider
          vertical={true}
          inverted={true}
          className="sound_slider_control"
          min={0}
          max={100}
          value={bind(wirePlumberViewModel.getDefaultSpeakerVolume()).as(
            (volume) => {
              const volumeAsPercentage = volume * 100;
              logger.debug("Current volume:", volumeAsPercentage);
              return volumeAsPercentage;
            }
          )}
          onDragged={(self) => {
            const volumeToSet = self.get_value() / 100;
            logger.debug("Setting volume to:", volumeToSet);
            wirePlumberViewModel.setDefaultSpeakerVolume(volumeToSet);
          }}
        />,
      ]}
    />
  );
}
export default function SoundSettingsNotch() {
  return (
    <box
      className="sound_settings_notch"
      child={
        <box
          className="sound_settings_notch_content"
          vertical={true}
          children={[
            <label label="Sound Settings" className="sound_settings_label" />,
            <SoundSlider />,
          ]}
        />
      }
    />
  );
}
