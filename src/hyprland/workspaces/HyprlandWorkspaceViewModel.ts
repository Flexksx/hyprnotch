import Hyprland from 'gi://AstalHyprland';
import Logger from '../../logger/Logger';
import { bind, Binding, Variable } from 'astal';

export default class HyprlandWorkspaceViewModel {
  private static instances: Map<number, HyprlandWorkspaceViewModel> = new Map();

  private hyprland = Hyprland.get_default();
  private workspaceVariable: Variable<Hyprland.Workspace> = new Variable(null!);
  private workspaceId: number = 0;
  private logger: Logger;

  private constructor(workspaceId: number) {
    this.logger = new Logger(`HyprlandWorkspaceViewModel-${workspaceId}`);
    this.logger.debug(`Creating view model for workspace ${workspaceId}`);
    this.workspaceId = workspaceId;
    const workspace = this.hyprland.get_workspace(workspaceId);
    if (!workspace) {
      this.logger.error(`Workspace with ID ${workspaceId} not found`);
      throw new Error(`Workspace with ID ${workspaceId} not found`);
    }
    this.updateWorkspaceVariable();
    this.setupUpdateListenerForSignal('client_added');
    this.setupUpdateListenerForSignal('client_removed');
    this.setupUpdateListenerForSignal('client_moved');
  }

  public static getInstance(workspaceId: number): HyprlandWorkspaceViewModel {
    if (!this.instances.has(workspaceId)) {
      this.instances.set(
        workspaceId,
        new HyprlandWorkspaceViewModel(workspaceId)
      );
    }
    return this.instances.get(workspaceId)!;
  }

  public static destroyInstance(workspaceId: number): void {
    this.instances.delete(workspaceId);
  }

  public getClients(): Binding<Hyprland.Client[]> {
    return bind(this.workspaceVariable.get(), 'clients').as(clients => {
      this.logger.debug(
        `Clients for workspace ${this.workspaceId}: ${clients
          .map(client => client.get_class())
          .toString()}`
      );
      return clients;
    });
  }

  private updateWorkspaceVariable(): void {
    this.workspaceVariable.set(this.hyprland.get_workspace(this.workspaceId));
    this.logger.debug(
      `Updated workspace variable for workspace ${this.workspaceId}`
    );
  }

  private setupUpdateListenerForSignal(signalName: string): void {
    this.hyprland.connect(signalName, () => {
      this.updateWorkspaceVariable();
      this.logger.debug(
        `Workspace variable updated for workspace ${this.workspaceId} on signal ${signalName}`
      );
    });
  }
}
