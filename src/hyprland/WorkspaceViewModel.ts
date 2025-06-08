import { bind, Binding, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";
import Logger from "../logger/Logger";

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
    this.logger.debug(`Switching to workspace ${workspaceId}`);
    this.hyprland.get_workspace(workspaceId).focus();
  }

  public getPerMonitorWorkspaces(
    monitorModel: string
  ): Binding<Hyprland.Workspace[]> {
    return this.getWorkspaces().as((workspaces: Hyprland.Workspace[]) => {
      this.logger.debug(
        `Filtering workspaces for monitor model: ${monitorModel}`
      );
      return workspaces.filter(
        (workspace: Hyprland.Workspace) =>
          workspace.get_monitor().get_model() === monitorModel
      );
    });
  }
}
