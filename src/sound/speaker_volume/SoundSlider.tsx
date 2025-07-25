import WirePlumberViewModel from '../WirePlumberViewModel';
import SoundMuteButton from './SoundMuteButtonProps';

type SoundSliderProps = {
  initialValue: number;
};
export default function SoundSlider({ initialValue }: SoundSliderProps) {
  const wirePlumberViewModel = WirePlumberViewModel.getInstance();
  return (
    <box
      vertical={true}
      cssName="sound_slider"
      children={[
        <slider
          vertical={true}
          inverted={true}
          min={0}
          max={100}
          value={initialValue}
          onDragged={self => {
            const volumeToSet = self.get_value() / 100;
            wirePlumberViewModel.setDefaultSpeakerVolume(volumeToSet);
          }}
        />,
        <SoundMuteButton wirePlumberViewModel={wirePlumberViewModel} />
      ]}
    />
  );
}
