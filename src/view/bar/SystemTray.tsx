import { SystemTrayViewModel } from "../../tray/SystemTrayViewModel";
import { IconSource } from "../../utils/IconUtils";

function TrayItemIcon({ item }: { item: any }) {
  return (
    <IconSource
      iconThemePath={item.iconThemePath}
      iconName={item.iconName}
      iconPixmap={item.iconPixmap}
      fallbackIcon="application-x-executable-symbolic"
      className="tray-item"
    />
  );
}

export function SystemTray() {
  const systemTrayViewModel = new SystemTrayViewModel();
  return (
    <box
      className={"system_tray_bar_container"}
      child={
        <box
          className={"system_tray_bar"}
          children={systemTrayViewModel.getTrayItems().as((items) => {
            return items.map((item) => {
              return (
                <button
                  className={"system_tray_item"}
                  child={<TrayItemIcon item={item} />}
                  onClick={() => {}}
                />
              );
            });
          })}
        />
      }
    />
  );
}
