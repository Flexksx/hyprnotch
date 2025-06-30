import { bind, Binding, timeout, Variable } from "astal";
import { NotificationViewModel } from "./NotificationViewModel";
import { Gtk } from "astal/gtk3";
import Logger from "../logger/Logger";
export default class NewNotificationWidgetViewModel {
  private logger = new Logger(this.constructor.name);
  private notificationViewModel = new NotificationViewModel();
  private onNoNewNotificationWidget: Gtk.Widget;
  private onNewNotificationWidget: Gtk.Widget;

  private resultingWidgetVariable = new Variable<Gtk.Widget>(null!);

  constructor(
    onNoNewNotificationWidget: Gtk.Widget,
    onNewNotificationWidget: Gtk.Widget
  ) {
    this.onNoNewNotificationWidget = onNoNewNotificationWidget;
    this.onNewNotificationWidget = onNewNotificationWidget;
    this.resultingWidgetVariable.set(this.onNoNewNotificationWidget);
    this.setupNewNotificationListener();
  }

  public static builder(): NewNotificationWidgetViewModelBuilder {
    return new NewNotificationWidgetViewModelBuilder();
  }

  public getWidget(): Binding<Gtk.Widget> {
    return bind(this.resultingWidgetVariable);
  }

  private setupNewNotificationListener(): void {
    this.notificationViewModel.connectNewNotificationCallback(
      (notificationClient, notificationId) => {
        const notification =
          this.notificationViewModel.getNotificationById(notificationId);
        const notificationTimeout = notification.get_expire_timeout();

        this.logger.debug(
          `New notification received: ${notification.get_app_name()} with timeout ${notificationTimeout}`
        );
        this.resultingWidgetVariable.set(this.onNewNotificationWidget);
        timeout(notificationTimeout, () => {
          this.logger.debug(
            `Notification with ID ${notificationId} has expired`
          );
          this.resultingWidgetVariable.set(this.onNoNewNotificationWidget);
        });
      }
    );
  }
}
class NewNotificationWidgetViewModelBuilder {
  onNoNewNotificationWidget!: Gtk.Widget;
  onNewNotificationWidget!: Gtk.Widget;
  withOnNoNewNotificationWidget(
    onNoNewNotificationWidget: Gtk.Widget
  ): NewNotificationWidgetViewModelBuilder {
    this.onNoNewNotificationWidget = onNoNewNotificationWidget;
    return this;
  }
  withOnNewNotificationWidget(
    onNewNotificationWidget: Gtk.Widget
  ): NewNotificationWidgetViewModelBuilder {
    this.onNewNotificationWidget = onNewNotificationWidget;
    return this;
  }
  build(): NewNotificationWidgetViewModel {
    return new NewNotificationWidgetViewModel(
      this.onNoNewNotificationWidget,
      this.onNewNotificationWidget
    );
  }
}
