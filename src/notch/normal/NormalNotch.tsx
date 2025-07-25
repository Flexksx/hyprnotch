import Logger from '../../logger/Logger';
import CavaViewModel from '../../media/cava/CavaViewModel';
import CavaVisualizer from '../../media/cava/CavaVisualizer';
import MediaViewModel from '../../media/MediaViewModel';
import TimeService from '../../time/TimeService';

const logger = new Logger('NormalNotch');
const mediaViewModel = new MediaViewModel();
const cavaViewModel = CavaViewModel.getInstance(5); // Use singleton instance

function MediaIndicator() {
  return (
    <box
      cssName="normal_notch_media_icon"
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      heightRequest={24}
      child={
        <CavaVisualizer
          cavaViewModel={cavaViewModel}
          maxBarHeight={20}
          minBarHeight={2}
        />
      }
    />
  );
}

function Time() {
  return (
    <box
      cssName="normal_notch_time"
      children={[
        <label
          label={bind(TimeService.getInstance().getTime()).as(time => {
            return time.slice(10, 16);
          })}
        />
      ]}
    />
  );
}

export default function NormalNotch() {
  return (
    <centerbox
      cssName={'normal_notch'}
      startWidget={<Time />}
      endWidget={
        <box
          children={[
            <box vertical={true} />,

            <box vertical={true} /* children={[<MediaIndicator />]} */ />
          ]}
        />
      }
    />
  );
}
