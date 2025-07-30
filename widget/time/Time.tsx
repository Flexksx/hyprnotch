import { Gtk } from 'ags/gtk4';
import TimeViewModel from '../../lib/time/TimeViewModel';
import { getInstance } from '../../lib/di';

const timeViewModel = getInstance(TimeViewModel);
const clock = timeViewModel.getTimePoll();

export default function Time() {
  return (
    <box class="time-container">
      <menubutton class="time-button">
        <label label={clock.as(clock => clock.slice(10, 19))} />
        <popover class="time-popover">
          <Gtk.Calendar />
        </popover>
      </menubutton>
    </box>
  );
}
