import { Astal, Gdk, Gtk } from "astal/gtk3";
import { NotificationViewModel } from "./NotificationViewModel";
import AstalNotifd from "gi://AstalNotifd";
import { Variable } from "astal";
import NewNotificationWidgetViewModel from "./NewNotificationWidgetViewModel";

const notificationViewModel = new NotificationViewModel();
const newNotificationWidgetViewModel = NewNotificationWidgetViewModel.builder()
  .withOnNewNotificationWidget(<NewNotificationPopup notification={null} />)
  .withOnNoNewNotificationWidget(<NoNewNotificationPopup />)
  .build();

const onNewNotification = (
  notifdClient: AstalNotifd.Notifd,
  notificationId: number
) => {
  const notification =
    notificationViewModel.getNotificationById(notificationId);
};

type NewNotificationPopupProps = {
  notification: AstalNotifd.Notification | null;
};

function NewNotificationPopup(props: NewNotificationPopupProps) {
  const notification = props.notification;
  if (!notification) {
    return <NoNewNotificationPopup />;
  }
  return (
    <box
      className={"notification_popup"}
      vexpand={true}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
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

function NoNewNotificationPopup() {
  return (
    <box
      className={"notification_popup"}
      vexpand={true}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
      child={
        <box>
          <icon icon={"notification"} />
          <label label={"No new notifications"} />
        </box>
      }
    />
  );
}

export function NotificationsPopup() {
  return (
    <box
      className={"notification_popup"}
      vexpand={true}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
      child={newNotificationWidgetViewModel.getWidget().as((widget) => widget)}
    />
  );
}
