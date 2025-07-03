import { bind, Binding, Variable } from "astal";
import { NotificationMenuContentState } from "./NotificationMenuContentState";

export default class NotificationMenuContentViewModel {
  private state = Variable<NotificationMenuContentState>(
    NotificationMenuContentState.MINIMIZED
  );
  public setState(state: NotificationMenuContentState) {
    this.state.set(state);
  }
  public getState(): Binding<NotificationMenuContentState> {
    return bind(this.state);
  }
}
