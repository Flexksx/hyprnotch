import Hyprland from 'gi://AstalHyprland';
import Logger from '../../src/logger/Logger';
import HyprlandWorkspaceViewModel from '../../src/hyprland/workspaces/HyprlandWorkspaceViewModel';
import { Gdk } from 'ags/gtk4';
import { Accessor, createBinding } from 'ags';
import { SingletonViewModel } from '../di';

@SingletonViewModel
export default class HyprlandWorkspacesViewModel {
  private hyprland = Hyprland.get_default();
  private logger: Logger = new Logger('WorkspaceViewModel');

  constructor() {
    this.logger = new Logger('WorkspaceViewModel');
    this.logger.debug('WorkspaceViewModel created');
  }

  public getWorkspaces(): Accessor<Hyprland.Workspace[]> {
    return createBinding(this.hyprland, 'workspaces').as(() => {
      const workspaces = this.hyprland
        .get_workspaces()
        .sort((a: Hyprland.Workspace, b: Hyprland.Workspace) => {
          return a.get_id() - b.get_id();
        });
      if (workspaces.length === 0) {
        this.logger.warn('No workspaces found in Hyprland');
      }
      return workspaces;
    });
  }

  public getFocusedWorkspace(): Accessor<Hyprland.Workspace> {
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

  public getPerMonitorWorkspaces(
    gdkMonitor: Gdk.Monitor
  ): Accessor<Hyprland.Workspace[]> {
    return this.getWorkspaces().as((workspaces: Hyprland.Workspace[]) => {
      const hyprlandMonitors = this.hyprland.get_monitors();
      const targetHyprlandMonitor = hyprlandMonitors.find(monitor => {
        const gdkDisplayName = gdkMonitor.get_display()?.get_name() || '';
        const hyprlandDisplayName = monitor.get_name() || '';

        if (
          gdkDisplayName &&
          hyprlandDisplayName &&
          gdkDisplayName === hyprlandDisplayName
        ) {
          return true;
        }

        return (
          monitor.get_make() === gdkMonitor.get_manufacturer() &&
          monitor.get_model() === gdkMonitor.get_model() &&
          monitor.get_x() === gdkMonitor.get_geometry().x &&
          monitor.get_y() === gdkMonitor.get_geometry().y
        );
      });

      if (!targetHyprlandMonitor) {
        this.logger.warn(
          'Could not find matching Hyprland monitor for GDK monitor'
        );
        return [];
      }

      return workspaces.filter((workspace: Hyprland.Workspace) => {
        const workspaceMonitor = workspace.get_monitor();
        if (!workspaceMonitor) {
          this.logger.warn(`Workspace ${workspace.get_id()} has no monitor`);
          return false;
        }
        return workspaceMonitor.get_id() === targetHyprlandMonitor.get_id();
      });
    });
  }

  public getWorkspaceViewModelById(
    workspaceId: number
  ): HyprlandWorkspaceViewModel {
    return HyprlandWorkspaceViewModel.getInstance(workspaceId);
  }
}
