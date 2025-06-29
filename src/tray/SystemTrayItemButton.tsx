import SystemTrayStateViewModel from "./SystemTrayStateViewModel";
import Tray from "gi://AstalTray";
import { SystemTrayViewModel } from "./SystemTrayViewModel";
import { Binding, timeout } from "astal";

const SYSTEM_TRAY_ITEM_TIMEOUT = 10000; // 30 seconds

function getTrayItemClass(
  viewModel: SystemTrayViewModel,
  item: any
): Binding<string> {
  /* const classes = ["system_tray_item"];

  if (focusedItem && focusedItem.get_title() === item.get_title()) {
    classes.push("active");
  } else {
    classes.push("notch");
  }

  if (index === 0) classes.push("first");
  if (index === items.length - 1) classes.push("last");

  return classes.join(" "); */
  return viewModel.getFocusedTrayItem().as((focused) => {
    let classes = "system_tray_item";
    if (focused && focused.get_title() === item.get_title()) {
      classes += " active";
    } else {
      classes += " notch";
    }
    if (viewModel.getTrayItems().get().indexOf(item) === 0) {
      classes += " first";
    }
    if (
      viewModel.getTrayItems().get().indexOf(item) ===
      viewModel.getTrayItems().get().length - 1
    ) {
      classes += " last";
    }

    return classes;
  });
}

const onSystemTrayItemClicked = (
  systemTrayViewModel: SystemTrayViewModel,
  item: Tray.TrayItem
) => {
  const currentlyFocused = systemTrayViewModel.getFocusedTrayItem().get();
  if (currentlyFocused && currentlyFocused.get_title() === item.get_title()) {
    systemTrayViewModel.setFocusedTrayItem(null);
  } else {
    systemTrayViewModel.setFocusedTrayItem(item);
    timeout(SYSTEM_TRAY_ITEM_TIMEOUT, () =>
      systemTrayViewModel.setFocusedTrayItem(null)
    );
  }
};

type SystemTrayItemButtonProps = {
  systemTrayViewModel: SystemTrayViewModel;
  item: Tray.TrayItem;
};

export default function SystemTrayItemButton(props: SystemTrayItemButtonProps) {
  const { systemTrayViewModel, item } = props;
  return (
    <button
      cursor={"pointer"}
      hexpand={true}
      className={getTrayItemClass(systemTrayViewModel, item)}
      onButtonPressEvent={() =>
        onSystemTrayItemClicked(systemTrayViewModel, item)
      }
      onHover={() => systemTrayViewModel.refreshTrayItem(item)}
      child={<icon icon={item.get_icon_name() || "unknown"} />}
    />
  );
}
