import { Astal, Gtk } from "astal/gtk3";
import WirePlumberViewModel from "../WirePlumberViewModel";
import Wp from "gi://AstalWp";
import { Binding } from "astal";

const wirePlumberViewModel = new WirePlumberViewModel();

export default function OutputDeviceSelector() {
  return (
    <box
      orientation={Gtk.Orientation.VERTICAL}
      children={wirePlumberViewModel.getSpeakers().as((speakers) => {
        speakers = speakers ? speakers : [];
        const defaultSpeakerBinding: Binding<Wp.Endpoint> =
          wirePlumberViewModel.getDefaultSpeaker();
        return speakers.map((speaker) => (
          <button
            className={defaultSpeakerBinding.as((defaultSpeaker) => {
              let className = "icon_button large output_device_button";
              if (
                defaultSpeaker &&
                defaultSpeaker.get_id() === speaker.get_id()
              ) {
                className += " selected";
              }
              return className;
            })}
            onClick={() => {
              wirePlumberViewModel.setDefaultSpeaker(speaker);
            }}
            child={<label label={speaker.get_description().slice(0, 20)} />}
          />
        ));
      })}
    />
  );
}
