import Hyprland from "gi://AstalHyprland";
export default class WorkspaceService {
  private hyprland = Hyprland.get_default();

  public getWorkspaces(): Hyprland.Workspace[] {
    return this.hyprland.get_workspaces();
  }
  public getFocusedWorkspace(): Hyprland.Workspace {
    return this.hyprland.get_focused_workspace();
  }
  public switchToWorkspace(workspaceId: number): void {
    this.hyprland.get_workspace(workspaceId).focus();
  }
}
