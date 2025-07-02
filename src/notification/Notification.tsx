import { Gtk } from "astal/gtk3";
import { NotificationViewModel } from "./NotificationViewModel";
import { bind, Binding, Variable } from "astal";
import Logger from "../logger/Logger";

const notificationViewModel = new NotificationViewModel();

enum NotificationMenuContentState {
  MINIMIZED,
  OPEN,
}

enum MinimizedNotificationMenuContentState {
  NO_NOTIFICATIONS,
  HAS_NOTIFICATIONS,
  DO_NOT_DISTURB,
}

enum OpenNotificationMenuContentState {}

class MinimizedNotificationMenuContentViewModel {
  private state = Variable<NotificationMenuContentState>(
    NotificationMenuContentState.MINIMIZED
  );
  private logger = new Logger(this.constructor.name);

  constructor() {}

  public setState(state: NotificationMenuContentState) {
    this.state.set(state);
  }

  public getState(): Binding<NotificationMenuContentState> {
    return bind(this.state);
  }
}

class OpenNotificationMenuContentViewModel {
  private state = Variable<NotificationMenuContentState>(
    NotificationMenuContentState.OPEN
  );
  private logger = new Logger(this.constructor.name);
  constructor() {}
  public setState(state: NotificationMenuContentState) {
    this.state.set(state);
  }
  public getState(): Binding<NotificationMenuContentState> {
    return bind(this.state);
  }
}

export function NotificationsPopup() {
  return (
    <box
      className={"notification_bar"}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
      child={}
    />
  );
}
