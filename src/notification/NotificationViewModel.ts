import { bind, Binding, Variable } from "astal";
import Notifd from "gi://AstalNotifd";

export enum NotificationState {
  NONE = "none",
  HAS_NOTIFICATIONS = "has_notifications",
  NEW_NOTIFICATION = "new_notification",
}

export class NotificationViewModel {
  private notifid = Notifd.get_default();
  private currentState = Variable<NotificationState>(NotificationState.NONE);
  private transitionTimer: number | null = null;

  constructor() {
    this.initializeState();
    this.setupNotificationListener();
  }

  private initializeState() {
    const notifications = this.notifid.get_notifications();
    if (notifications.length > 0) {
      this.currentState.set(NotificationState.HAS_NOTIFICATIONS);
    } else {
      this.currentState.set(NotificationState.NONE);
    }
  }

  private setupNotificationListener() {
    this.notifid.connect("notified", () => {
      this.handleNewNotification();
    });

    this.notifid.connect("resolved", () => {
      this.updateStateBasedOnCount();
    });
  }

  private handleNewNotification() {
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
    }

    this.currentState.set(NotificationState.NEW_NOTIFICATION);

    this.transitionTimer = setTimeout(() => {
      this.updateStateBasedOnCount();
      this.transitionTimer = null;
    }, 2000);
  }

  private updateStateBasedOnCount() {
    const notifications = this.notifid.get_notifications();
    if (notifications.length > 0) {
      this.currentState.set(NotificationState.HAS_NOTIFICATIONS);
    } else {
      this.currentState.set(NotificationState.NONE);
    }
  }

  public getNotifications(): Binding<Notifd.Notification[]> {
    return bind(this.notifid, "notifications");
  }

  public getCurrentNotificationState(): Binding<NotificationState> {
    return bind(this.currentState);
  }
}
