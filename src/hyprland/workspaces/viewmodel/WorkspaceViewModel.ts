import { bind, Binding, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";
import Logger from "../../../logger/Logger";
import WorkspaceService from "../service/WorkspaceService";

export class WorkspaceViewModel {
  private workspaceService: WorkspaceService;
  private hyprland = Hyprland.get_default();
  private logger: Logger = new Logger("WorkspaceViewModel");
  public workspaces: Variable<Hyprland.Workspace[]>;
  public activeWorkspace: Variable<Hyprland.Workspace>;

  constructor() {
    this.logger.debug("WorkspaceViewModel created");
    this.workspaceService = new WorkspaceService();
    this.logger = new Logger("WorkspaceViewModel");
    this.workspaces = Variable<Hyprland.Workspace[]>(
      this.workspaceService.getWorkspaces()
    );
    this.activeWorkspace = Variable<Hyprland.Workspace>(
      this.workspaceService.getFocusedWorkspace()
    );
  }

  public getWorkspaces(): Binding<Hyprland.Workspace[]> {
    return bind(this.hyprland, "workspaces").as(() => {
      this.logger.debug("Workspaces updated");
      return this.workspaceService.getWorkspaces().sort((a, b) => {
        return a.get_id() - b.get_id();
      });
    });
  }

  public getFocusedWorkspace(): Binding<Hyprland.Workspace> {
    return bind(this.hyprland, "focused_workspace").as(() => {
      return this.workspaceService.getFocusedWorkspace();
    });
  }

  public switchToWorkspace(workspaceId: number): void {
    this.logger.debug(`Switching to workspace ${workspaceId}`);
    this.workspaceService.switchToWorkspace(workspaceId);
  }
}
