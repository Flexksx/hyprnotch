import AstalNotifd from 'gi://AstalNotifd?version=0.1';
import Gtk from 'gi://Gtk?version=3.0';
import { NoNewNotificationPopup } from './NoNewNotificationPopup';

type NewNotificationPopupProps = {
  notification: AstalNotifd.Notification | null;
};

const NotificationImage = (notification: AstalNotifd.Notification) => {
  return (
    <icon icon={notification.get_image()} className="notification_app_icon" />
  );
};

export function NewNotificationPopup(props: NewNotificationPopupProps) {
  const notification = props.notification;
  if (!notification) {
    return <NoNewNotificationPopup />;
  }
  return (
    <box
      className={'new_notification_card_preview'}
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
            <label label={notification.get_summary()} />,
          ]}
        />
      }
    />
  );
}
