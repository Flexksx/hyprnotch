import Logger from "../../logger/Logger";
import { WorkspaceViewModel } from "../../hyprland/WorkspaceViewModel";
import Hyprland from "gi://AstalHyprland";
import { Gdk, Gtk } from "astal/gtk3";
import { IconSource } from "../../lib/icons/IconUtils";
import { bind } from "astal";

interface WorkspacesBarProps {
  gdkmonitor: Gdk.Monitor;
}

type WorkspaceButtonProps = {
  workspace: Hyprland.Workspace;
  workspaceViewModel: WorkspaceViewModel;
  logger: Logger;
};

function WorkspaceButton({
  workspace,
  workspaceViewModel,
  logger,
}: WorkspaceButtonProps) {
  return (
    <button
      className={workspaceViewModel
        .getFocusedWorkspace()
        .as((focusedWorkspace: Hyprland.Workspace) => {
          return (
            "workspace_button " +
            (focusedWorkspace.get_id() === workspace.get_id() ? "focused" : "")
          );
        })}
      child={<WorkspaceButtonContent workspace={workspace} />}
      onClick={() => {
        logger.debug(
          `Pressing button for workspace ${workspace.get_id()}, switching to it`
        );
        workspaceViewModel.switchToWorkspace(workspace.get_id());
      }}
    />
  );
}

type WorkspaceButtonContentProps = {
  workspace: Hyprland.Workspace;
};

function WorkspaceButtonContent({ workspace }: WorkspaceButtonContentProps) {
  return workspace.get_clients().length === 0 ? (
    <EmptyWorkspaceContent workspace={workspace} />
  ) : (
    <WorkspaceClientsContent workspace={workspace} />
  );
}

type EmptyWorkspaceContentProps = {
  workspace: Hyprland.Workspace;
};

function EmptyWorkspaceContent({ workspace }: EmptyWorkspaceContentProps) {
  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      child={<label label={workspace.get_name()} />}
    />
  );
}

type WorkspaceClientsContentProps = {
  workspace: Hyprland.Workspace;
};

function WorkspaceClientsContent({ workspace }: WorkspaceClientsContentProps) {
  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      children={bind(workspace, "clients").as((clients) =>
        clients.map((client) => <WorkspaceClientIcon client={client} />)
      )}
    />
  );
}

type WorkspaceClientIconProps = {
  client: Hyprland.Client;
};

function WorkspaceClientIcon({ client }: WorkspaceClientIconProps) {
  return (
    <box
      className="workspace_client_icon"
      child={<IconSource iconName={client.get_class()} />}
    />
  );
}

type WorkspaceListProps = {
  workspaces: Hyprland.Workspace[];
  workspaceViewModel: WorkspaceViewModel;
  logger: Logger;
};

function WorkspaceList({
  workspaces,
  workspaceViewModel,
  logger,
}: WorkspaceListProps) {
  return (
    <box
      children={workspaces.map((workspace: Hyprland.Workspace) => (
        <WorkspaceButton
          workspace={workspace}
          workspaceViewModel={workspaceViewModel}
          logger={logger}
        />
      ))}
    />
  );
}

type WorkspacesBarContainerProps = WorkspacesBarProps & {
  workspaceViewModel: WorkspaceViewModel;
  logger: Logger;
  workspacesBinding: any;
};

function WorkspacesBarContainer({
  workspaceViewModel,
  logger,
  workspacesBinding,
}: WorkspacesBarContainerProps) {
  return (
    <box
      vexpand={false}
      hexpand={false}
      className="workspaces_bar_container"
      child={
        <box
          className={"workspaces_bar"}
          children={workspacesBinding.as((workspaces: Hyprland.Workspace[]) => (
            <WorkspaceList
              workspaces={workspaces}
              workspaceViewModel={workspaceViewModel}
              logger={logger}
            />
          ))}
        />
      }
    />
  );
}

export default function WorkspacesBar(props: WorkspacesBarProps) {
  const workspaceViewModel: WorkspaceViewModel = new WorkspaceViewModel();
  const logger = new Logger("WorkspacesBar");
  const gdkmonitor: Gdk.Monitor = props.gdkmonitor;

  logger.debug(
    `WorkspacesBar created on monitor ${gdkmonitor.get_manufacturer()}`
  );

  const workspacesBinding = gdkmonitor.get_model()
    ? workspaceViewModel.getPerMonitorWorkspaces(gdkmonitor)
    : workspaceViewModel.getWorkspaces();

  return (
    <WorkspacesBarContainer
      gdkmonitor={gdkmonitor}
      workspaceViewModel={workspaceViewModel}
      logger={logger}
      workspacesBinding={workspacesBinding}
    />
  );
}

// Export individual components for reuse
export {
  WorkspaceButton,
  WorkspaceButtonContent,
  EmptyWorkspaceContent,
  WorkspaceClientsContent,
  WorkspaceClientIcon,
  WorkspaceList,
  WorkspacesBarContainer,
};
