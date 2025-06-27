import { Astal, Gdk, Gtk } from "astal/gtk3";
import { NotificationViewModel } from "./NotificationViewModel";

const notificationViewModel = new NotificationViewModel();
type NotificationPopupProps = {};
export function NotificationsPopup() {
  return (
    <box
      vexpand={false}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
      child={notificationViewModel.getNotifications().as((notifications) => {
        const firstNotification = notifications[0];
        return (
          <box child={<label label={firstNotification.get_summary()} />} />
        );
      })}
    />
  );
}

export function NotificationsWindow(gdkMonitor: Gdk.Monitor) {
  notificationViewModel.connectNewNotificationCallback((self, id) => {
    console.log(`New notification received with ID: ${id}`);
  });
  return (
    <window
      namespace={"hyprnotch_notifications_popup"}
      className="notification_popup"
      gdkmonitor={gdkMonitor}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      child={NotificationsPopup()}
    />
  );
}
