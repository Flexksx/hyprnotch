import NetworkViewModel from './NetworkViewModel';
const WIFI_ON_ICON = '󰤨';
const WIFI_OFF_ICON = '󰤧';

export function WifiIndicator() {
  const networkViewModel = new NetworkViewModel();
  return (
    <button
      cssName={networkViewModel
        .hasActiveWifiConnection()
        .as(hasActiveWifiConnection => {
          return hasActiveWifiConnection
            ? 'normal_notch_wifi_indicator connected'
            : 'normal_notch_wifi_indicator disconnected';
        })}
      child={
        <label
          label={networkViewModel
            .hasActiveWifiConnection()
            .as(hasActiveWifiConnection => {
              return hasActiveWifiConnection ? WIFI_ON_ICON : WIFI_OFF_ICON;
            })}
        ></label>
      }
    />
  );
}
