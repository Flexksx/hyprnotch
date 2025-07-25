import Hyprland from 'gi://AstalHyprland';
import Logger from '../../logger/Logger';
import HyprlandWorkspaceViewModel from './HyprlandWorkspaceViewModel';
import { createBinding } from 'ags';
import { Gdk } from 'ags/gtk4';

export class HyprlandWorkspacesViewModel {
  private static instance: HyprlandWorkspacesViewModel | null = null;

  private hyprland = Hyprland.get_default();
  private logger: Logger = new Logger('WorkspaceViewModel');

  private constructor() {
    this.logger = new Logger('WorkspaceViewModel');
    this.logger.debug('WorkspaceViewModel created');
  }

  public static getInstance(): HyprlandWorkspacesViewModel {
    if (!this.instance) {
      this.instance = new HyprlandWorkspacesViewModel();
    }
    return this.instance;
  }

  public getWorkspaces() {
    return createBinding(this.hyprland, 'workspaces').as(workspaces => {
      const sortedWorkspaces = workspaces.sort(
        (a: Hyprland.Workspace, b: Hyprland.Workspace) => {
          return a.get_id() - b.get_id();
        }
      );
      this.logger.debug(
        'Hyprland workspaces updated to: ',
        sortedWorkspaces
          .map((workspace: Hyprland.Workspace) => {
            return workspace.get_name();
          })
          .toString()
      );
      if (sortedWorkspaces.length === 0) {
        this.logger.warn('No workspaces found in Hyprland');
      }
      return sortedWorkspaces;
    });
  }

  public getFocusedWorkspace() {
    return createBinding(this.hyprland, 'focused_workspace');
  }

  public switchToWorkspace(workspaceId: number): void {
    if (!workspaceId) {
      this.logger.error('Invalid workspace ID provided for switching');
      return;
    }
    if (this.hyprland.get_focused_workspace().get_id() === workspaceId) {
      this.logger.debug(
        `Workspace ${workspaceId} is already focused, no action taken`
      );
      return;
    }
    this.logger.info(`Switching to workspace ${workspaceId}`);
    this.hyprland.get_workspace(workspaceId).focus();
  }

  public getPerMonitorWorkspaces(monitor: Gdk.Monitor) {
    return this.getWorkspaces().as((workspaces: Hyprland.Workspace[]) => {
      const hyprlandMonitors = this.getHyprland().get_monitors();
      const targetHyprlandMonitor = this.getHyprland().get_monitor(monitor);

      if (!targetHyprlandMonitor) {
        this.logger.warn(
          'Could not find matching Hyprland monitor for GDK monitor'
        );
        return [];
      }

      return workspaces.filter(
        (workspace: Hyprland.Workspace) =>
          workspace.get_monitor().get_id() === targetHyprlandMonitor.get_id()
      );
    });
  }

  public getWorkspaceViewModelById(
    workspaceId: number
  ): HyprlandWorkspaceViewModel {
    return HyprlandWorkspaceViewModel.getInstance(workspaceId);
  }
  private getHyprland(): Hyprland.Hyprland {
    if (!this.hyprland) {
      this.logger.error('Hyprland instance is not initialized');
      throw new Error('Hyprland instance is not initialized');
    }
    return this.hyprland;
  }
}
