import WirePlumberViewModel from "../WirePlumberViewModel";
import SoundMuteButton from "./SoundMuteButtonProps";

type SoundSliderProps = {
  initialValue?: number;
  wirePlumberViewModel: WirePlumberViewModel;
};
export default function SoundSlider(props: SoundSliderProps) {
  return (
    <box
      vertical={true}
      className="sound_slider"
      children={[
        <slider
          vertical={true}
          inverted={true}
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
