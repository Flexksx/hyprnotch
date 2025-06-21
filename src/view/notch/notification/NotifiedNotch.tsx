import { NotificationViewModel } from "../../../notification/NotificationViewModel";
import { GLib } from "astal";
import { Astal } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import NotchStateViewModel from "../../../notch/state/NotchStateViewModel";
import { NotchState } from "../../../notch/state/NotchState";
const NOTIFICATION_TIMEOUT = 5000;
type NotificationImageProps = {
  notification: Notifd.Notification;
};

const isIcon = (icon: string) => !!Astal.Icon.lookup_icon(icon);

const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS);

function NotificationImage(props: NotificationImageProps) {
  const { notification: n } = props;

  if (n.image && fileExists(n.image)) {
    return (
      <box
        className="notification-image"
        css={`
          background-image: url("${n.image}");
          background-size: cover;
          background-position: center;
        `}
      />
    );
  }

  if (n.image && isIcon(n.image)) {
    return <icon className="notification-icon" icon={n.image} />;
  }

  if (n.appIcon || n.desktopEntry) {
    return (
      <icon
        className="notification-app-icon"
        icon={n.appIcon || n.desktopEntry}
      />
    );
  }

  return (
    <icon
      className="notification-fallback-icon"
      icon="dialog-information-symbolic"
    />
  );
}

function NotifiedGradientBorder() {
  return <box className="notified_gradient_border" />;
}

export default function NotifiedNotch() {
  const notificationViewModel = new NotificationViewModel();
  const notchStateViewModel = new NotchStateViewModel();

  const latestNotification = notificationViewModel
    .getNotifications()
    .as((notifications) => {
      return notifications.sort((a, b) => {
        return b.get_time() - a.get_time();
      })[0];
    })
    .get();

  setTimeout(() => {
    notchStateViewModel.setNotchState(NotchState.NORMAL);
  }, NOTIFICATION_TIMEOUT);

  return (
    <box className="notch_container">
      <centerbox
        className={"notified_notch"}
        startWidget={
          latestNotification ? (
            <NotificationImage notification={latestNotification} />
          ) : (
            <box />
          )
        }
        centerWidget={
          <label label={latestNotification?.summary || "No notifications"} />
        }
        endWidget={<box />}
      />
      <NotifiedGradientBorder />
    </box>
  );
}
