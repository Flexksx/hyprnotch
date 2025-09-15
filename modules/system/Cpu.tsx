import { exec } from 'ags/process';
import { createPoll } from 'ags/time';
import Logger from '../../lib/Logger';
import MaterialIcon from '../../lib/theme/MaterialIcon';

const LOG = new Logger('Cpu');

const fetchCpuUsage = (): string => {
  const bashResponse = exec(['bash', '-c', "top -bn1 | grep 'Cpu(s)'"]);
  const cpuLine = bashResponse.trim();
  const cpuUsageMatch = cpuLine.match(/(\d+\.\d+)\s*id/);
  if (cpuUsageMatch && cpuUsageMatch[1]) {
    const idleCpu = parseFloat(cpuUsageMatch[1]);
    return Math.round(100 - idleCpu).toString();
  }
  LOG.debug('Failed to parse CPU usage from top command output.');
  return '0';
};
const cpuUsage = createPoll('0', 2500, () => {
  return fetchCpuUsage();
});

export default function Cpu() {
  return (
    <box>
      <MaterialIcon className="cpu-icon" iconName="memory" />
      <label label={cpuUsage} />
    </box>
  );
}
