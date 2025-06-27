import { bind, Binding, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";

export enum NotificationState {
  NONE = "none",
  HAS_NOTIFICATIONS = "has_notifications",
  NEW_NOTIFICATION = "new_notification",
}

export class NotificationViewModel {
  private notifid = Notifd.get_default();
  private hasNewNotification = Variable<boolean>(false);
  private transitionTimer: number | null = null;

  constructor() {
    this.notifid.connect("notified", () => {
      this.handleNewNotification();
    });

  }





  private handleNewNotification() {
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
    }
    this.hasNewNotification.set(true);
  }

  public getNotifications(sort: boolean | null = true): Binding<Notifd.Notification[]> {
    return bind(this.notifid, "notifications").as((notifications) => {
      if (sort) {
        notifications = notifications.sort((a, b) => {
          return b.get_time() - a.get_time();
        });
      }
      return notifications;
    });
  }




  public connectNewNotificationCallback(callback: (self: Notifd.Notifd, id: number) => void) {
    this.notifid.connect("notified", (self, id) => { callback(self, id); });
  }


}