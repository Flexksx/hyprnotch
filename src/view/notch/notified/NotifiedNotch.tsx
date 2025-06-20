import { NotificationViewModel } from "../../../notification/NotificationViewModel";
import { GLib } from "astal";
import { Astal } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import NotchStateViewModel from "../../../notch_state/NotchStateViewModel";
import { NotchState } from "../../../notch_state/NotchState";
import { IconSource } from "../../../lib/icons/IconUtils";

const NOTIFICATION_TIMEOUT = 5000;

type NotificationImageProps = {
  notification: Notifd.Notification;
};

function NotificationImage(props: NotificationImageProps) {
  const { notification: n } = props;

  return (
    <IconSource
      iconThemePath={n.image}
      iconName={n.image || n.appIcon || n.desktopEntry}
      fallbackIcon="dialog-information-symbolic"
      className="notification"
    />
  );
}

function NotifiedGradientBorder() {
  return <box className="notified_gradient_border" />;
}

export type NotifiedNotchProps = {
  notchStateViewModel: NotchStateViewModel;
};

export default function NotifiedNotch(props: NotifiedNotchProps) {
  const notificationViewModel = new NotificationViewModel();
  const { notchStateViewModel } = props;

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
          <label label={latestNotification?.get_body() || "No notifications"} />
        }
        endWidget={<box />}
      />
      <NotifiedGradientBorder />
    </box>
  );
}
