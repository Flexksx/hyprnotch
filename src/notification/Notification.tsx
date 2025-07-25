import { NewNotificationViewModel } from './NewNotificationViewModel';

export function NotificationsPopup() {
  const newNotificationViewModel = new NewNotificationViewModel();
  return (
    <box
      cssName={newNotificationViewModel
        .getHasNewNotification()
        .as(hasNewNotification => {
          let className = 'notification_bar';
          if (hasNewNotification) {
            className += ' has_new_notification';
          }
          return className;
        })}
      vexpand={true}
      hexpand={true}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
      child={newNotificationViewModel.getResultingWidget()}
    />
  );
}
