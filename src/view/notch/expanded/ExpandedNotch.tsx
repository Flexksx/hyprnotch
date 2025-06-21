import { bind } from "astal";
import TimeService from "../../../time/TimeService";
import SettingsMenu from "./SettingsMenu";
import NotchStateViewModel from "../../../notch/state/NotchStateViewModel";
import NotchContentViewModel from "../../../notch/content/NotchContentViewModel";
import SoundSettingsNotch from "../sound_settings/SoundSettingsNotch";
import { NotchContentState } from "../../../notch/content/NotchContentState";

type ExpandedNotchProps = {
  notchStateViewModel: NotchStateViewModel;
};

function Time() {
  return (
    <box className="expanded_notch_time">
      <label>
        {bind(TimeService.getInstance().getTime()).as((time) => {
          return time.slice(0, 10);
        })}
      </label>
      <label>
        {bind(TimeService.getInstance().getTime()).as((time) => {
          return time.slice(10, 20);
        })}
      </label>
    </box>
  );
}

export default function ExpandedNotch(props: ExpandedNotchProps) {
  const notchContentViewModel = new NotchContentViewModel();
  return (
    <box
      className={"expanded_notch"}
      child={
        <box
          children={[
            <>
              <box
                vertical={true}
                children={[
                  <>
                    <SettingsMenu
                      notchContentViewModel={notchContentViewModel}
                    />
                    <box
                      child={notchContentViewModel
                        .getNotchContentState()
                        .as((state) => {
                          switch (state) {
                            case NotchContentState.SOUND_SETTINGS:
                              return <SoundSettingsNotch />;
                            case NotchContentState.DEFAULT:
                              return <Time />;
                          }
                        })}
                    />
                  </>,
                ]}
              />
            </>,
          ]}
        ></box>
      }
    ></box>
  );
}
