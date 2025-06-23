import NotchStateViewModel from "../../../notch/state/NotchStateViewModel";

function SoundSlider() {
  return (
    <box className="sound_slider">
      <label label="Volume" className="sound_slider_label" />
      <slider
        vertical={true}
        className="sound_slider_control"
        min={0}
        max={100}
        value={50}
      />
    </box>
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
