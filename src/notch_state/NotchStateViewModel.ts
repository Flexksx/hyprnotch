import { bind, Binding, Variable } from "astal";
import { NotchState } from "./NotchState";

export default class NotchStateViewModel {
  private notchState: Variable<NotchState> = Variable<NotchState>(
    NotchState.NORMAL
  );
  constructor() {}
  public getNotchState(): Binding<NotchState> {
    return bind(this.notchState).as(() => {
      return this.notchState.get();
    });
  }

  public setNotchState(state: NotchState): void {
    this.notchState.set(state);
  }
}
