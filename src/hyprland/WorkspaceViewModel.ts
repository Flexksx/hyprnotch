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
      this.logger.debug("Workspaces updated");
      return this.hyprland
        .get_workspaces()
        .sort((a: Hyprland.Workspace, b: Hyprland.Workspace) => {
          return a.get_id() - b.get_id();
        });
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
    return bind(this.hyprland, "workspaces").as(() => {
      this.logger.debug("Per monitor workspaces updated");
      return this.hyprland
        .get_workspaces()
        .filter((workspace: Hyprland.Workspace) => {
          return workspace.get_monitor().get_model() === monitorModel;
        });
    });
  }
}
