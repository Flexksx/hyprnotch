import { bind, Binding, Variable } from "astal";
import { NotchState } from "./NotchState";
import Logger from "../logger/Logger";

export default class NotchStateViewModel {
  private static instance: NotchStateViewModel;
  private logger: Logger = new Logger("NotchStateViewModel");
  private notchState: Variable<NotchState> = Variable<NotchState>(
    NotchState.NORMAL
  );
  private stateChangeTimeout: number | null = null;

  private constructor() {}

  public static getInstance(): NotchStateViewModel {
    if (!NotchStateViewModel.instance) {
      NotchStateViewModel.instance = new NotchStateViewModel();
    }
    return NotchStateViewModel.instance;
  }

  public getNotchState(): Binding<NotchState> {
    return bind(this.notchState).as(() => {
      return this.notchState.get();
    });
  }
  public setNotchState(state: NotchState): void {
    this.logger.info(`Setting notch state to: ${state}`);
    this.notchState.set(state);
  }
}
