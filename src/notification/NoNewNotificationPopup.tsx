import Gtk from 'gi://Gtk?';
import { NotificationViewModel } from './NotificationViewModel';
import Logger from '../logger/Logger';
const NOTIFICATIONS_READ_DND_ICON = 'indicator-notification-read-dnd';
const NOTIFICATIONS_UNREAD_DND_ICON = 'indicator-notification-unread-dnd';

const NOTIFICATIONS_READ_ICON = 'indicator-notification-read';
const NOTIFICATIONS_UNREAD_ICON = 'indicator-notification-unread';
const notificationViewModel = new NotificationViewModel();

export function NoNewNotificationPopup() {
  const logger = new Logger('NoNewNotificationPopup');
  return (
    <box
      cssName={'no_notification'}
      vexpand={true}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      child={notificationViewModel.getIsDoNotDisturb().as(isDoNotDisturb => {
        return (
          <button
            cursor={'pointer'}
            cssName="icon_button xsmall "
            onButtonPressEvent={() => {
              const isDoNotDisturb = notificationViewModel
                .getIsDoNotDisturb()
                .get();
              logger.debug(`Toggling Do Not Disturb mode: ${!isDoNotDisturb}`);
              notificationViewModel.setDoNotDisturb(!isDoNotDisturb);
            }}
            child={
              <icon
                icon={notificationViewModel
                  .getIsDoNotDisturb()
                  .as(isDoNotDisturb => {
                    const notificationsCount = notificationViewModel
                      .getNotifications()
                      .get().length;
                    if (isDoNotDisturb) {
                      return notificationsCount > 0
                        ? NOTIFICATIONS_UNREAD_DND_ICON
                        : NOTIFICATIONS_READ_DND_ICON;
                    } else {
                      return notificationsCount > 0
                        ? NOTIFICATIONS_UNREAD_ICON
                        : NOTIFICATIONS_READ_ICON;
                    }
                  })}
              />
            }
          />
        );
      })}
    />
  );
}
