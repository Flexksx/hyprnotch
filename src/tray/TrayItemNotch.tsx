import { bind, Gio, Variable } from "astal";
import { TrayItemNotchProps } from "./SystemTray";
import { Gdk, Gtk } from "astal/gtk3";
import {
  isMiddleClick,
  isPrimaryClick,
  isSecondaryClick,
} from "../lib/events/mouse";
import AstalTray from "gi://AstalTray";

function getTrayItemNotchClassName(focusedItem: any | null): string {
  if (!focusedItem) {
    return "system_tray_bar_notch";
  }
  return "system_tray_bar_notch focused";
}

interface MenuEntryProps {
  item: AstalTray.TrayItem;
}

const MenuEntry = ({ item }: MenuEntryProps): JSX.Element => {
  return (
    <button
      className="system_tray_bar_notch_entry"
      cursor="pointer"
      onClick={(self, event) => {
        if (isPrimaryClick(event)) {
          item.activate(0, 0);
        }

        if (isSecondaryClick(event)) {
          const menuModel = item.get_menu_model();
          const actionGroup = item.get_action_group();

          if (menuModel && actionGroup) {
            const menu = Gtk.Menu.new_from_model(menuModel);
            menu.insert_action_group("dbusmenu", actionGroup);
            menu.popup_at_widget(
              self,
              Gdk.Gravity.NORTH_WEST,
              Gdk.Gravity.SOUTH_WEST,
              null
            );
          }
        }
      }}
      child={
        <box
          className="system_tray_bar_notch_content"
          vertical={true}
          children={[
            <label
              label={bind(item, "title").as(
                (title) => title || item.get_tooltip()?.title || ""
              )}
            />,
            <label
              label={bind(item, "tooltip").as(
                (tooltip) => tooltip?.description || ""
              )}
            />,
          ]}
        />
      }
    />
  );
};

export default function TrayItemNotch(props: TrayItemNotchProps) {
  const { systemTrayViewModel } = props;
  const focusedItem = systemTrayViewModel.getFocusedTrayItem();

  return (
    <box
      className={focusedItem.as(getTrayItemNotchClassName)}
      vertical={true}
      child={focusedItem.as((item) => {
        if (!item || !item.get_menu_model()) {
          return <box />;
        }
        return <MenuEntry item={item} />;
      })}
    />
  );
}
