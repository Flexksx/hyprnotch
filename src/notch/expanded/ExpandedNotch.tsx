import { bind } from 'astal';
import SettingsMenu from './SettingsMenu';
import NotchStateViewModel from '../NotchStateViewModel';
import TimeService from '../../time/TimeService';

type ExpandedNotchProps = {
  notchStateViewModel: NotchStateViewModel;
};

function Time() {
  return (
    <box className="expanded_notch_time">
      <label>
        {bind(TimeService.getInstance().getTime()).as(time => {
          return time.slice(0, 10);
        })}
      </label>
      <label>
        {bind(TimeService.getInstance().getTime()).as(time => {
          return time.slice(10, 20);
        })}
      </label>
    </box>
  );
}

export default function ExpandedNotch(props: ExpandedNotchProps) {
  return (
    <box
      className={'expanded_notch'}
      child={
        <box
          children={[
            <>
              <box
                vertical={true}
                children={[
                  <>
                    <SettingsMenu
                      notchStateViewModel={props.notchStateViewModel}
                    />
                    <box child={<Time />} />
                  </>
                ]}
              />
            </>
          ]}
        ></box>
      }
    ></box>
  );
}
