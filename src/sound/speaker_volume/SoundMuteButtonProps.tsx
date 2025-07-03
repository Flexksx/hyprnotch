import WirePlumberViewModel from "../WirePlumberViewModel";

type SoundMuteButtonProps = { wirePlumberViewModel: WirePlumberViewModel };

export default function SoundMuteButton(props: SoundMuteButtonProps) {
  return (
    <button
      className={props.wirePlumberViewModel
        .getDefaultSpeakerVolume()
        .as((volume) => {
          let className = "icon_button xsmall";
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
