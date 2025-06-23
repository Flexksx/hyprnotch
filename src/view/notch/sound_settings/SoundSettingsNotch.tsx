import NotchStateViewModel from "../../../notch/state/NotchStateViewModel";

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
            <label
              label="Adjust your sound settings here."
              className="sound_settings_description"
            />,
          ]}
        />
      }
    /p>
  );
}
