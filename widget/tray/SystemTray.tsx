import { With } from 'ags';
import { getInstance } from '../../lib/di';
import SystemTrayViewModel from '../../lib/tray/SystemTrayViewModel';
import AstalTray from 'gi://AstalTray?version=0.1';

const systemTrayViewModel = getInstance(SystemTrayViewModel);

const getMissingHardcodedIcons = (item: AstalTray.TrayItem) => {
  const trayItemsIdNamesMap: Record<string, { icon: string }> = {
    chrome_status_icon_1: { icon: 'slack' },
    openrgb: { icon: 'openrgb' }
  };
  return trayItemsIdNamesMap[item.get_title()]?.icon || item.get_icon_name();
};

const SystemTrayButton = ({ item }: { item: AstalTray.TrayItem }) => {
  const itemIconName = item.get_icon_name() || getMissingHardcodedIcons(item);
  return (
    <button
      label={item.get_title()}
      iconName={itemIconName || 'applications-other'}
      onNotifyCursor={() => {
        systemTrayViewModel.refreshTrayItem(item);
      }}
    />
  );
};

export default function SystemTray() {
  return (
    <box>
      <With value={systemTrayViewModel.getTrayItems()}>
        {trayItems => (
          <box>
            {trayItems.map(item => (
              <SystemTrayButton item={item} />
            ))}
          </box>
        )}
      </With>
    </box>
  );
}
