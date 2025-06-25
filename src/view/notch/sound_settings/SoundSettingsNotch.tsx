import { bind } from "astal";
import { IconSource } from "../../../lib/icons/IconUtils";
import Logger from "../../../logger/Logger";
import MediaViewModel from "../../../media/MediaViewModel";
import NotchStateViewModel from "../../../notch/state/NotchStateViewModel";
import WirePlumberViewModel from "../../../sound/WirePlumberViewModel";

const wirePlumberViewModel = new WirePlumberViewModel();
const logger = new Logger("SoundSettingsNotch");
function SoundMuteButton() {
  const onButtonClick = () => {
    if (wirePlumberViewModel.getDefaultSpeakerVolume().get() > 0) {
      wirePlumberViewModel.muteDefaultSpeaker();
    } else {
      wirePlumberViewModel.unmuteDefaultSpeaker();
    }
  };
  return (
    <button
      className={wirePlumberViewModel.getDefaultSpeakerVolume().as((volume) => {
        let className = "icon_button";
        if (volume === 0) {
          logger.debug("Volume is muted");
          return className + " disabled";
        } else {
          logger.debug("Volume is unmuted");
          return className;
        }
      })}
      child={wirePlumberViewModel.getDefaultSpeakerVolume().as((volume) => {
        if (volume === 0) {
          logger.debug("Volume is muted, showing mute icon");
          return (
            <IconSource
              iconName="audio-volume-muted-symbolic"
              className="sound_slider_icon"
            />
          );
        }
        return (
          <IconSource
            iconName="audio-volume-high-symbolic"
            className="sound_slider_icon"
          />
        );
      })}
      onButtonReleaseEvent={onButtonClick}
    />
  );
}

function SoundSlider() {
  const onSliderChange = (value: number) => {
    wirePlumberViewModel.setDefaultSpeakerVolume(value);
  };
  const onVolumeButtonClick = () => {
    if (wirePlumberViewModel.getDefaultSpeakerVolume().get() > 0) {
      wirePlumberViewModel.muteDefaultSpeaker();
    } else {
      wirePlumberViewModel.unmuteDefaultSpeaker();
    }
  };
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
              logger.debug("Current volume:", volume);
              return volume * 100;
            }
          )}
          onDragged={(self) => onSliderChange(self.get_value() / 100)}
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
