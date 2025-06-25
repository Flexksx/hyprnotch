import { bind, Binding, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";
import Logger from "../logger/Logger";
import { Gdk } from "astal/gtk3";

export class WorkspaceViewModel {
  private hyprland = Hyprland.get_default();
  private logger: Logger = new Logger("WorkspaceViewModel");

  constructor() {
    this.logger = new Logger("WorkspaceViewModel");
    this.logger.debug("WorkspaceViewModel created");
  }

  public getWorkspaces(): Binding<Hyprland.Workspace[]> {
    return bind(this.hyprland, "workspaces").as(() => {
      const workspaces = this.hyprland
        .get_workspaces()
        .sort((a: Hyprland.Workspace, b: Hyprland.Workspace) => {
          return a.get_id() - b.get_id();
        });
      this.logger.debug(
        "Hyprland workspaces updated to: ",
        workspaces
          .map((workspace: Hyprland.Workspace) => {
            return workspace.get_name();
          })
          .toString()
      );
      if (workspaces.length === 0) {
        this.logger.warn("No workspaces found in Hyprland");
      }
      return workspaces;
    });
  }

  public getFocusedWorkspace(): Binding<Hyprland.Workspace> {
    return bind(this.hyprland, "focused_workspace");
  }

  public switchToWorkspace(workspaceId: number): void {
    if (!workspaceId) {
      this.logger.error("Invalid workspace ID provided for switching");
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
  ): Binding<Hyprland.Workspace[]> {
    return this.getWorkspaces().as((workspaces: Hyprland.Workspace[]) => {
      this.logger.debug(
        `Filtering workspaces for Gdk Monitor: ${gdkMonitor.get_manufacturer()} ${gdkMonitor.get_model()} ${gdkMonitor.get_display().get_default_screen().get_monitor_plug_name(0)}`
      );
      return workspaces.filter(
        (workspace: Hyprland.Workspace) =>
          workspace.get_monitor().get_make() ===
          gdkMonitor.get_manufacturer()
          && workspace.get_monitor().get_model() ===
          gdkMonitor.get_model()

      );
    });
  }
}
