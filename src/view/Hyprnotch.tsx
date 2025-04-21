import { App, Astal, Gdk } from "astal/gtk3";
import { bind } from "astal";
import ExpandedNotch from "./expanded/ExpandedNotch";
import NormalNotch from "./normal/NormalNotch";
import Logger from "../logger/Logger";
import HoverViewModel from "../hover/viewmodel/HoverViewModel";

export default function Hyprnotch(gdkmonitor: Gdk.Monitor) {
  const hoverViewModel = new HoverViewModel();

  const setHovered = () => hoverViewModel.isHovered.set(true);
  const setNotHovered = () => hoverViewModel.isHovered.set(false);

  const logger: Logger = new Logger("Hyprnotch");
  logger.debug(`Hyprnotch created on monitor ${gdkmonitor.get_manufacturer()}`);

  return (
    <window
      className="hyprnotch"
      namespace="hyprnotch"
      gdkmonitor={gdkmonitor}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      child={
        <centerbox
          centerWidget={
            <button
              onClicked={() => {
                logger.debug(
                  `hyprnotch clicked on monitor ${gdkmonitor.get_manufacturer()}`
                );
                hoverViewModel.isHovered.set(!hoverViewModel.isHovered.get());
              }}
              className="hyprnotch-button-hover-area"
              child={bind(hoverViewModel.isHovered).as((isNotchHovered) => {
                if (isNotchHovered) {
                  logger.debug(
                    `hyprnotch hovered on monitor ${gdkmonitor.get_manufacturer()}`
                  );
                  return <ExpandedNotch />;
                } else {
                  logger.debug(
                    `hyprnotch on monitor ${gdkmonitor.get_manufacturer()} is unhovered`
                  );
                  return <NormalNotch />;
                }
              })}
            />
          }
        ></centerbox>
      }
    />
  );
}
