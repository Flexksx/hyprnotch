import NetworkViewModel from "../../../../network/NetworkViewModel";

export default function WifiIndicator() {
  const networkViewModel = new NetworkViewModel();
  return (
    <box
      className="normal_notch_wifi_icon"
      child={
        <box
          className={networkViewModel
            .hasActiveWifiConnection()
            .as((hasActiveWifiConnection) => {
              return hasActiveWifiConnection
                ? "normal_notch_wifi_indicator connected"
                : "normal_notch_wifi_indicator disconnected";
            })}
          child={
            <label
              label={networkViewModel
                .hasActiveWifiConnection()
                .as((hasActiveWifiConnection) => {
                  return hasActiveWifiConnection ? "󰤨" : "󰤩";
                })}
            ></label>
          }
        ></box>
      }
    ></box>
  );
}
