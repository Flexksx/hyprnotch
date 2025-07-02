import { Variable, timeout, Binding, bind } from "astal";
import Gtk from "gi://Gtk?version=3.0";
import Logger from "../logger/Logger";
import { NewNotificationPopup } from "./NewNotificationPopup";
import { NoNewNotificationPopup } from "./NoNewNotificationPopup";
import { NotificationViewModel } from "./NotificationViewModel";

export class NewNotificationViewModel {
  private notificationViewModel = new NotificationViewModel();
  private resultingWidgetVariable = new Variable<Gtk.Widget>(null!);
  private isShowingNewNotification = new Variable<boolean>(false);
  private logger = new Logger(this.constructor.name);
  private static DEFAULT_NOTIFICATION_TIMEOUT = 5000;
  constructor() {
    this.resultingWidgetVariable.set(<NoNewNotificationPopup />);
    this.setupNewNotificationListener();
  }

  private setupNewNotificationListener(): void {
    this.notificationViewModel.connectNewNotificationCallback(
      (notificationClient, notificationId) => {
        const notification =
          this.notificationViewModel.getNotificationById(notificationId);

        this.isShowingNewNotification.set(true);
        this.resultingWidgetVariable.set(
          <NewNotificationPopup notification={notification} />
        );
        const notificationTimeout =
          notification.get_expire_timeout() > 0
            ? notification.get_expire_timeout()
            : NewNotificationViewModel.DEFAULT_NOTIFICATION_TIMEOUT;

        this.logger.debug(
          `New notification received: ${notification.get_app_name()} with timeout ${notificationTimeout}`
        );
        timeout(notificationTimeout, () => {
          this.isShowingNewNotification.set(false);
          this.resultingWidgetVariable.set(<NoNewNotificationPopup />);
        });
      }
    );
  }

  public getResultingWidget(): Binding<Gtk.Widget> {
    return bind(this.resultingWidgetVariable);
  }
  public getIsShowingNewNotification(): Binding<boolean> {
    return bind(this.isShowingNewNotification);
  }
}
