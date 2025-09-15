import { Gtk } from 'ags/gtk4';
import { createBinding, With } from 'ags';
import { createPoll } from 'ags/time';
import { exec } from 'ags/process';
import MaterialIcon from '../../lib/theme/MaterialIcon';
import AstalBattery from 'gi://AstalBattery';

const battery = AstalBattery.get_default();
const batteryPercentage = createBinding(battery, 'percentage')
  .as(p => p * 100)
  .as(Math.round);
const isCharging = createBinding(battery, 'charging');

const fetchCpuUsage = (): string => {
  const bashResponse = exec(['bash', '-c', "top -bn1 | grep 'Cpu(s)'"]);
  const cpuLine = bashResponse.trim();
  const cpuUsageMatch = cpuLine.match(/(\d+\.\d+)\s*id/);
  if (cpuUsageMatch && cpuUsageMatch[1]) {
    const idleCpu = parseFloat(cpuUsageMatch[1]);
    return Math.round(100 - idleCpu).toString();
  }
  return '0';
};

const fetchRamUsage = (): string => {
  const bashResponse = exec(['bash', '-c', "free -m | grep 'Mem:'"]);
  const memLine = bashResponse.trim();
  const memUsageMatch = memLine.match(/Mem:\s+(\d+)\s+(\d+)/);
  if (memUsageMatch && memUsageMatch[1] && memUsageMatch[2]) {
    const totalMem = parseFloat(memUsageMatch[1]);
    const usedMem = parseFloat(memUsageMatch[2]);
    return Math.round((usedMem / totalMem) * 100).toString();
  }
  return '0';
};

const ramUsage = createPoll('0', 2500, () => fetchRamUsage());

const cpuUsage = createPoll('0', 2500, () => fetchCpuUsage());

export default function SystemInfo() {
  return (
    <With value={batteryPercentage}>
      {percentage => (
        <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
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
          <label label={' | '} />
          <box>
            <MaterialIcon className="cpu-icon" iconName="memory" />
            <label label={cpuUsage} />
          </box>
          <label label={' | '} />
          <box>
            <MaterialIcon className="ram-icon" iconName="memory_alt" />
            <label label={ramUsage} />
          </box>
        </box>
      )}
    </With>
  );
}
