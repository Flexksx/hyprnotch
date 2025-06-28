import { Astal, Gdk, Gtk } from "astal/gtk3";
import { NotificationViewModel } from "./NotificationViewModel";
import AstalNotifd from "gi://AstalNotifd";

const notificationViewModel = new NotificationViewModel();
const onNewNotification = (
  notifdClient: AstalNotifd.Notifd,
  notificationId: number
) => {
  const notification =
    notificationViewModel.getNotificationById(notificationId);
};
type NewNotificationPopupProps = {
  notification: AstalNotifd.Notification;
};
function NewNotificationPopup(props: NewNotificationPopupProps) {
  return <box className={"new_notification_popup"} child={<box />} />;
}

export function NotificationsPopup() {
  return (
    <box
      className={"notification_popup"}
      vexpand={true}
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
