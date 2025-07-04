import { Gtk } from "astal/gtk3";
import WirePlumberViewModel from "../WirePlumberViewModel";
import Wp from "gi://AstalWp";

const getSpeakerButtonClassName = (
  wirePlumberViewModel: WirePlumberViewModel,
  speaker: Wp.Endpoint
) => {
  return wirePlumberViewModel.getDefaultSpeaker().as((defaultSpeaker) => {
    let className = "output_device_button";
    if (defaultSpeaker && defaultSpeaker.get_id() === speaker.get_id()) {
      className += " selected";
    }
    return className;
  });
};

export default function OutputDeviceSelector() {
  const wirePlumberViewModel = new WirePlumberViewModel();
  return (
    <scrollable
      kineticScrolling={true}
      borderWidth={0}
      shadowType={Gtk.ShadowType.NONE}
      className={"output_devices_scrollable"}
      child={
        <box
          orientation={Gtk.Orientation.VERTICAL}
          children={wirePlumberViewModel.getSpeakers().as((speakers) => {
            speakers = speakers ? speakers : [];
            return speakers.map((speaker) => (
              <button
                className={getSpeakerButtonClassName(
                  wirePlumberViewModel,
                  speaker
                )}
                onClick={() => {
                  wirePlumberViewModel.setDefaultSpeaker(speaker);
                }}
                child={<label label={speaker.get_description().slice(0, 20)} />}
              />
            ));
          })}
        />
      }
    />
  );
}
