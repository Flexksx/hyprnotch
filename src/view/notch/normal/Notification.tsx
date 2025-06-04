import { NotchState } from "../../../notch_state/NotchState";
import NotchStateViewModel from "../../../notch_state/NotchStateViewModel";
import {
  NotificationViewModel,
  NotificationState,
} from "../../../notification/NotificationViewModel";
const notchStateViewModel = NotchStateViewModel.getInstance();
export default function Notifications() {
  const notificationViewModel = new NotificationViewModel();

  const handleNotificationClick = () => {
    console.log("Notification button clicked!");
  };

  return (
    <button
      onButtonPressEvent={handleNotificationClick}
      className={notificationViewModel
        .getCurrentNotificationState()
        .as((state) => {
          switch (state) {
            case NotificationState.NONE:
              return "normal_notch_notification";
            case NotificationState.HAS_NOTIFICATIONS:
              return "normal_notch_notification has_notifications";
            case NotificationState.NEW_NOTIFICATION:
              notchStateViewModel.setNotchState(NotchState.NEW_NOTIFICATION);
          }
        })}
    />
  );
}
