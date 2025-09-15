import { createBinding, With } from 'ags';
import { Gtk } from 'ags/gtk4';
import MaterialIcon from '../../lib/theme/MaterialIcon';
import AstalBattery from 'gi://AstalBattery';

const battery = AstalBattery.get_default();

const batteryPercentage = createBinding(battery, 'percentage')
  .as(percentage => percentage * 100)
  .as(Math.round);

const isCharging = createBinding(battery, 'charging');

export default function Battery() {
  return (
    <With value={batteryPercentage}>
      {percentage => (
        <box
          class="battery-box"
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
        >
          <With value={isCharging}>
            {isCharging => (
              <MaterialIcon
                className="battery-icon"
                iconName={
                  percentage >= 80
                    ? 'battery_full'
                    : percentage >= 60
                    ? isCharging
                      ? 'battery_charging_60'
                      : 'battery_5_bar'
                    : percentage >= 40
                    ? isCharging
                      ? 'battery_charging_50'
                      : 'battery_4_bar'
                    : percentage >= 20
                    ? isCharging
                      ? 'battery_charging_30'
                      : 'battery_3_bar'
                    : isCharging
                    ? 'battery_charging_outline'
                    : 'battery_alert'
                }
              />
            )}
          </With>
          <label label={`${percentage}%`} class="battery-percentage-label" />
        </box>
      )}
    </With>
  );
}
