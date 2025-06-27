import { Astal } from "astal/gtk3";
import { NotificationViewModel } from "./NotificationViewModel";

const notificationViewModel = new NotificationViewModel();
type NotificationPopupProps = {};
function NotificationPopup(props: NotificationPopupProps) {}
export default function Notification() {
  notificationViewModel.connectNewNotificationCallback((self, id) => {
    console.log(`New notification received with ID: ${id}`);
  });
  return (
    <window
      namespace={"hyprnotch_notifications_popup"}
      className="notification_popup"
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      child={
        <box
          child={notificationViewModel
            .getNotifications()
            .as((notifications) => {
              const firstNotification = notifications[0];
              return (
                <box
                  child={<label label={firstNotification.get_summary()} />}
                />
              );
            })}
        />
      }
    />
  );
}
