import SystemTrayStateViewModel from './SystemTrayStateViewModel';
import Tray from 'gi://AstalTray';
import { SystemTrayViewModel } from './SystemTrayViewModel';

const SYSTEM_TRAY_ITEM_TIMEOUT = 10000; // 30 seconds

function getTrayItemClass(
  viewModel: SystemTrayViewModel,
  item: any
): Binding<string> {
  const existingTrayItems = viewModel
    .getTrayItems()
    .get()
    .filter(item => item.get_title());
  return viewModel.getFocusedTrayItem().as(focused => {
    let classes = 'system_tray_item';
    if (focused && focused.get_title() === item.get_title()) {
      classes += ' active';
    } else {
      classes += ' notch';
    }
    if (existingTrayItems.indexOf(item) === 0) {
      classes += ' first';
    }
    if (existingTrayItems.indexOf(item) === existingTrayItems.length - 1) {
      classes += ' last';
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
  const trayItemsIdNamesMap: Record<string, { icon: string }> = {};
  trayItemsIdNamesMap['chrome_status_icon_1'] = {
    icon: 'slack'
  };
  trayItemsIdNamesMap['openrgb'] = {
    icon: 'openrgb'
  };

  return (
    <button
      cursor={'pointer'}
      hexpand={true}
      cssName={getTrayItemClass(systemTrayViewModel, item)}
      onButtonPressEvent={() =>
        onSystemTrayItemClicked(systemTrayViewModel, item)
      }
      onHover={() => systemTrayViewModel.refreshTrayItem(item)}
      child={
        <icon
          icon={bind(item, 'iconName').as(iconName => {
            if (!iconName) {
              return trayItemsIdNamesMap[item.get_id()]?.icon || 'unknown';
            }
            return iconName;
          })}
        />
      }
    />
  );
}
