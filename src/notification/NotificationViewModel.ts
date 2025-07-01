import { bind, Binding, Variable } from "astal";
import Notifd from "gi://AstalNotifd";

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

  public getNotifications(
    sort: boolean | null = true
  ): Binding<Notifd.Notification[]> {
    return bind(this.notifid, "notifications").as((notifications) => {
      if (sort) {
        notifications = notifications.sort((a, b) => {
          return b.get_time() - a.get_time();
        });
      }
      return notifications;
    });
  }

  public connectNewNotificationCallback(
    callback: (self: Notifd.Notifd, id: number) => void
  ) {
    this.notifid.connect("notified", (self, id) => {
      callback(self, id);
    });
  }

  public getNotificationById(id: number): Notifd.Notification {
    return this.notifid.get_notification(id);
  }

  public getIsDoNotDisturb(): Binding<boolean> {
    return bind(this.notifid, "dontDisturb");
  }

  public setDoNotDisturb(value: boolean) {
    this.notifid.set_dont_disturb(value);
  }
}
