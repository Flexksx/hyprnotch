import WirePlumberViewModel from '../WirePlumberViewModel';

export default function SoundMuteButton() {
  const wirePlumberViewModel = WirePlumberViewModel.getInstance();
  return (
    <button
      className={wirePlumberViewModel.getDefaultSpeakerVolume().as(volume => {
        let className = 'icon_button xsmall';
        return volume === 0
          ? (className += ' outlined')
          : (className += ' filled');
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
