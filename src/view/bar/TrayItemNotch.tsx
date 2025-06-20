import { bind, Gio, Variable } from "astal";
import { TrayItemNotchProps } from "./SystemTray";
import { Gdk, Gtk } from "astal/gtk3";
import {
  isMiddleClick,
  isPrimaryClick,
  isSecondaryClick,
} from "../../lib/events/mouse";
import AstalTray from "gi://AstalTray";

function getTrayItemNotchClassName(
  focusedItem: any | null,
  trayItems: any[]
): string {
  const baseTrayNotchClass = "system_tray_bar_notch";
  if (!focusedItem) {
    return baseTrayNotchClass;
  }

  const focusedIndex = trayItems.findIndex(
    (item) => item.get_title() === focusedItem.get_title()
  );

  let notchClass = baseTrayNotchClass;
  if (focusedItem.get_title() === "HyprNotch") {
    notchClass += " hyprnotch-focused";
  } else {
    notchClass += " focused";
    if (focusedIndex === 0) {
      notchClass += " first";
    } else if (focusedIndex === trayItems.length - 1) {
      notchClass += " last";
    }
  }
  return notchClass;
}

const createMenu = (
  menuModel: Gio.MenuModel,
  actionGroup: Gio.ActionGroup | null
) => {
  const menu = Gtk.Menu.new_from_model(menuModel);
  menu.insert_action_group("dbusmenu", actionGroup);
  return menu;
};

interface MenuEntryProps {
  item: AstalTray.TrayItem;
  child?: JSX.Element;
}

const MenuEntry = ({ item, child }: MenuEntryProps): JSX.Element => {
  let menu: Gtk.Menu;

  const entryBinding = Variable.derive(
    [bind(item, "menuModel"), bind(item, "actionGroup")],
    (menuModel, actionGroup) => {
      if (menuModel === null) {
        return console.error(`Menu Model not found for ${item.id}`);
      }
      if (actionGroup === null) {
        return console.error(`Action Group not found for ${item.id}`);
      }

      menu = createMenu(menuModel, actionGroup);
    }
  );

  return (
    <button
      cursor={"pointer"}
      onClick={(self, event) => {
        if (isPrimaryClick(event)) {
          item.activate(0, 0);
        }

        if (isSecondaryClick(event)) {
          menu?.popup_at_widget(
            self,
            Gdk.Gravity.NORTH,
            Gdk.Gravity.SOUTH,
            null
          );
        }
      }}
      child={child}
      onDestroy={() => {
        menu?.destroy();
        entryBinding.drop();
      }}
    />
  );
};

export default function TrayItemNotch(props: TrayItemNotchProps) {
  const systemTrayViewModel = props.systemTrayViewModel;
  const trayItemBinding = systemTrayViewModel.getFocusedTrayItem();
  return (
    <box
      className={trayItemBinding.as((focusedItem) => {
        const trayItems = systemTrayViewModel.getTrayItems().get();
        return getTrayItemNotchClassName(focusedItem, trayItems);
      })}
      vertical={true}
      children={[
        <box
          child={trayItemBinding.as((focusedItem) => {
            if (!focusedItem) {
              return <box />;
            }
            const menuModel = focusedItem.get_menu_model();
            if (!menuModel) {
              return <box />;
            }
            const menuModelItemCount = menuModel.get_n_items();
            return (
              <MenuEntry
                item={focusedItem}
                child={
                  <box
                    className="system_tray_bar_notch_content"
                    child={<label label={focusedItem.get_title()} />}
                  />
                }
              />
            );
          })}
        />,
      ]}
    />
  );
}
