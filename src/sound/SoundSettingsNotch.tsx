import { bind } from "astal";
import Logger from "../logger/Logger";
import WirePlumberViewModel from "./WirePlumberViewModel";

type SoundMuteButtonProps = { wirePlumberViewModel: WirePlumberViewModel };

function SoundMuteButton(props: SoundMuteButtonProps) {
  return (
    <button
      className={props.wirePlumberViewModel
        .getDefaultSpeakerVolume()
        .as((volume) => {
          let className = "icon_button sound_mute_button xsmall";
          return volume === 0
            ? (className += " outlined")
            : (className += " filled");
        })}
      child={
        <icon icon={props.wirePlumberViewModel.getDefaultSpeakerVolumeIcon()} />
      }
      onButtonReleaseEvent={() => {
        props.wirePlumberViewModel.getDefaultSpeakerVolume().get() > 0
          ? props.wirePlumberViewModel.muteDefaultSpeaker()
          : props.wirePlumberViewModel.unmuteDefaultSpeaker();
      }}
    />
  );
}

type SoundSliderProps = {
  initialValue?: number;
  wirePlumberViewModel: WirePlumberViewModel;
};

function SoundSlider(props: SoundSliderProps) {
  return (
    <box
      vertical={true}
      className="sound_slider"
      children={[
        <slider
          vertical={true}
          inverted={true}
          className="sound_slider_control"
          min={0}
          max={100}
          value={props.initialValue}
          onDragged={(self) => {
            const volumeToSet = self.get_value() / 100;
            props.wirePlumberViewModel.setDefaultSpeakerVolume(volumeToSet);
          }}
        />,
        <SoundMuteButton wirePlumberViewModel={props.wirePlumberViewModel} />,
      ]}
    />
  );
}
export default function SoundSettingsNotch() {
  const wirePlumberViewModel = new WirePlumberViewModel();
  const logger = new Logger("SoundSettingsNotch");

  return (
    <box
      className="sound_settings_notch"
      child={
        <box
          className="sound_settings_notch_content"
          vertical={true}
          children={[
            <label label="Sound Settings" className="sound_settings_label" />,
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
