import Astal from 'gi://Astal?version=4.0';
import AstalNotifd from 'gi://AstalNotifd?version=0.1';

type NewNotificationPopupProps = {
  notification: AstalNotifd.Notification | null;
};

const NotificationImage = (notification: AstalNotifd.Notification) => {
  return (
    <icon icon={notification.get_image()} cssName="notification_app_icon" />
  );
};

export function NewNotificationPopup(props: NewNotificationPopupProps) {
  const notification = props.notification;
  if (!notification) {
    return <NoNewNotificationPopup />;
  }
  return (
    <box
      cssName={'new_notification_card_preview'}
      vexpand={true}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      child={
        <box
          children={[
            notification.get_image() ? (
              // <icon icon={notification.get_app_icon()} />
              NotificationImage(notification)
            ) : (
              <icon icon={'notification'} />
            ),
            <label label={notification.get_summary()} />
          ]}
        />
      }
    />
  );
}
