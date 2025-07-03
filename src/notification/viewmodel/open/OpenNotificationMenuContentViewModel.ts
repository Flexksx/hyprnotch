import { Variable, Binding, bind } from "astal";
import { NotificationMenuContentState } from "../NotificationMenuContentState";
import Logger from "../../../logger/Logger";

export default class OpenNotificationMenuContentViewModel {
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
