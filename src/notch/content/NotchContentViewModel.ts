
import { bind, Binding, Variable } from "astal";
import Logger from "../../logger/Logger";
import { NotchContentState } from "./NotchContentState";

export default class NotchContentViewModel {
    private logger: Logger = new Logger(this.constructor.name);
    private notchContentState: Variable<NotchContentState> = Variable<NotchContentState>(
        NotchContentState.DEFAULT
    );
    private stateChangeTimeout: number | null = null;

    constructor() { }

    public getNotchContentState(): Binding<NotchContentState> {
        return bind(this.notchContentState).as(() => {
            return this.notchContentState.get();
        });
    }
    public setNotchContentState(state: NotchContentState): void {
        this.logger.info(`Setting notch state to: ${state}`);
        this.notchContentState.set(state);
    }
}
