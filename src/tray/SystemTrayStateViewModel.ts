import { Variable } from "astal";
import { SystemTrayState } from "./SystemTrayState";

export default class SystemTrayStateViewModel {
  private systemTrayState: Variable<SystemTrayState>;

  constructor() {
    this.systemTrayState = Variable(SystemTrayState.NORMAL);
  }

  getSystemTrayState(): Variable<SystemTrayState> {
    return this.systemTrayState;
  }

  setSystemTrayState(state: SystemTrayState): void {
    this.systemTrayState.set(state);
  }
}
