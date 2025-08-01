import { createBinding, With } from 'ags';
import { getInstance } from '../../lib/di';
import SystemTrayViewModel from '../../lib/tray/SystemTrayViewModel';

import AstalTray from 'gi://AstalTray';
import Logger from '../../src/logger/Logger';
import { Astal, Gtk } from 'ags/gtk4';

const systemTrayViewModel = getInstance(SystemTrayViewModel);
const LOG = new Logger('SystemTray');

const initTrayItem = (btn: Gtk.MenuButton, item: AstalTray.TrayItem) => {
  btn.menuModel = item.menuModel;
  btn.insert_action_group('dbusmenu', item.actionGroup);
  item.connect('notify::action-group', () => {
    btn.insert_action_group('dbusmenu', item.actionGroup);
  });
};

const SystemTrayButtonIcon = ({ item }: { item: AstalTray.TrayItem }) => {
  const gicon = item.get_gicon();
  if (gicon) {
    return (
      <image
        gicon={createBinding(item, 'gicon')}
        iconSize={Gtk.IconSize.INHERIT}
      />
    );
  }
  const itemIcon = item.get_icon_name();
  if (itemIcon) {
    return (
      <image
        iconName={createBinding(item, 'iconName')}
        iconSize={Gtk.IconSize.INHERIT}
      />
    );
  }
  return (
    <image iconName={'applications-other'} iconSize={Gtk.IconSize.INHERIT} />
  );
};

const SystemTrayButton = ({ item }: { item: AstalTray.TrayItem }) => {
  return (
    <menubutton
      class={'system-tray-button'}
      label={item.get_title()}
      $={self => initTrayItem(self, item)}
      onNotifyCursor={() => {
        systemTrayViewModel.refreshTrayItem(item);
      }}
    >
      <SystemTrayButtonIcon item={item} />
    </menubutton>
  );
};

export default function SystemTray() {
  return (
    <box>
      <With
        value={systemTrayViewModel
          .getTrayItems()
          .as(trayItems =>
            trayItems.filter((item: AstalTray.TrayItem) =>
              item.get_action_group()
            )
          )}
      >
        {(trayItems: AstalTray.TrayItem[]) => (
          <box
            class="system-tray-button-list"
            halign={Gtk.Align.CENTER}
            valign={Gtk.Align.CENTER}
            spacing={4}
          >
            {trayItems.map((item: AstalTray.TrayItem) => (
              <SystemTrayButton item={item} />
            ))}
          </box>
        )}
      </With>
    </box>
  );
}
