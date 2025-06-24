import { IconSource } from "../../../lib/icons/IconUtils";
import MediaViewModel from "../../../media/MediaViewModel";
import NotchStateViewModel from "../../../notch/state/NotchStateViewModel";
import WirePlumberViewModel from "../../../sound/WirePlumberViewModel";

const wirePlumberViewModel = new WirePlumberViewModel();

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
        <button
          className="icon_button"
          child={
            <IconSource
              iconName="audio-volume-high-symbolic"
              className="sound_slider_icon"
            />
          }
          onButtonReleaseEvent={onVolumeButtonClick}
        />,
        <slider
          vertical={true}
          inverted={true}
          className="sound_slider_control"
          min={0}
          max={100}
          value={wirePlumberViewModel.getDefaultSpeakerVolume()}
          onDragged={(self) => onSliderChange(self.get_value())}
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
