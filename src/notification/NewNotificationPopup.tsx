import AstalNotifd from "gi://AstalNotifd?version=0.1";
import Gtk from "gi://Gtk?version=3.0";
import { NoNewNotificationPopup } from "./NoNewNotificationPopup";

type NewNotificationPopupProps = {
  notification: AstalNotifd.Notification | null;
};

export function NewNotificationPopup(props: NewNotificationPopupProps) {
  const notification = props.notification;
  if (!notification) {
    return <NoNewNotificationPopup />;
  }
  return (
    <box
      className={"new_notification_card_preview"}
      vexpand={true}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      child={
        <box
          children={[
            notification.get_app_icon() ? (
              <icon icon={notification.get_app_icon()} />
            ) : (
              <icon icon={"notification"} />
            ),
            <label label={notification.get_summary()} />,
          ]}
        />
      }
    />
  );
}
