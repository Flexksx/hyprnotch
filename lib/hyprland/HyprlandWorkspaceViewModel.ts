import { Accessed, createBinding } from 'ags';
import Logger from '../../src/logger/Logger';
import Hyprland from 'gi://AstalHyprland';

export default class HyprlandWorkspaceViewModel {
  private static instances: Map<number, HyprlandWorkspaceViewModel> = new Map();

  private hyprland = Hyprland.get_default();
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

  public getClients() {
    return createBinding(this.getHyprland(), 'clients');
  }

  private setupUpdateListenerForSignal(signalName: string): void {
    this.hyprland.connect(signalName, () => {
      this.logger.debug(
        `Workspace variable updated for workspace ${this.workspaceId} on signal ${signalName}`
      );
    });
  }

  private getHyprland(): Hyprland.Hyprland {
    if (!this.hyprland) {
      this.logger.error('Hyprland instance is not initialized');
      throw new Error('Hyprland instance is not initialized');
    }
    return this.hyprland;
  }
}
