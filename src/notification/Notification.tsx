import { Gtk } from "astal/gtk3";
import { NewNotificationViewModel } from "./NewNotificationViewModel";

export function NotificationsPopup() {
  const newNotificationViewModel = new NewNotificationViewModel();
  return (
    <box
      className={"notification_bar"}
      vexpand={true}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
      child={newNotificationViewModel.getResultingWidget()}
    />
  );
}
