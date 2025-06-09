import { SystemTrayViewModel } from "../../tray/SystemTrayViewModel";
import { IconSource } from "../../utils/IconUtils";
import Tray from "gi://AstalTray";

let isSystemTrayNotch;

type TrayItemIconProps = {
  item: Tray.TrayItem;
};

function TrayItemIcon(props: TrayItemIconProps) {
  const { item } = props;
  return (
    <IconSource
      iconThemePath={item.get_icon_theme_path()}
      iconName={item.get_icon_name()}
      fallbackIcon="application-x-executable-symbolic"
      className="tray-item"
    />
  );
}

const focusOnTrayItem = (item: Tray.TrayItem | null) => {};

export function SystemTray() {
  const systemTrayViewModel = new SystemTrayViewModel();
  return (
    <box
      className="system_tray_bar_notch_container"
      vertical={true}
      children={[
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
                      onHover={() => {
                        focusOnTrayItem(item);
                      }}
                      onHoverLost={() => {
                        focusOnTrayItem(null);
                      }}
                    />
                  );
                });
              })}
            />
          }
        />,
        <box className="system_tray_bar_notch" />,
      ]}
    />
  );
}
