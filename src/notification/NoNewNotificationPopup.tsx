import Gtk from "gi://Gtk?version=3.0";
import { NotificationViewModel } from "./NotificationViewModel";
import Logger from "../logger/Logger";
const DND_ON = "󰂛";
const DND_OFF = "󰂚"; // Assuming you have an icon for DND off

const notificationViewModel = new NotificationViewModel();

export function NoNewNotificationPopup() {
  const logger = new Logger("NoNewNotificationPopup");
  return (
    <box
      className={"no_notification"}
      vexpand={true}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      child={notificationViewModel.getIsDoNotDisturb().as((isDoNotDisturb) => {
        return (
          <button
            cursor={"pointer"}
            className="icon_button xsmall"
            onButtonPressEvent={() => {}}
            child={
              <label
                label={notificationViewModel
                  .getIsDoNotDisturb()
                  .as((isDoNotDisturb) => {
                    return isDoNotDisturb ? DND_ON : DND_OFF;
                  })}
              />
            }
          />
        );
      })}
    />
  );
}
