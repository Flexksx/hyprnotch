import { Variable, Binding, bind } from "astal";
import Logger from "../../logger/Logger";
import { NotificationMenuContentState } from "../Notification";

export default class MinimizedNotificationMenuContentViewModel {
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
