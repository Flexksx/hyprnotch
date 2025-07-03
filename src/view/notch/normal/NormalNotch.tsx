import { bind } from "astal/binding";
import TimeService from "../../../time/TimeService";
import MediaViewModel from "../../../media/MediaViewModel";
function MediaIndicator() {
  const mediaViewModel = new MediaViewModel();

  return (
    <box
      className="normal_notch_media_icon"
      child={
        <box
          className={"normal_notch_media_indicator"}
          child={
            <label
              label={mediaViewModel.getPlayers().as((players) => {
                if (players.length === 0) {
                  return "No Media";
                }
                return players[0].get_identity();
              })}
            ></label>
          }
        ></box>
      }
    ></box>
  );
}

function Time() {
  return (
    <box
      className="normal_notch_time"
      children={[
        <label>
          {bind(TimeService.getInstance().getTime()).as((time) => {
            return time.slice(10, 16);
          })}
        </label>,
      ]}
    ></box>
  );
}

export default function NormalNotch() {
  return (
    <centerbox
      className={"normal_notch"}
      startWidget={<Time />}
      centerWidget={<label label={"Hyprnotch"} />}
      endWidget={
        <box
          children={[
            <box
              vertical={true}
              // children={[<BluetoothButton />, <WifiIndicator />]}
            />,

            <box vertical={true} children={[<MediaIndicator />]} />,
          ]}
        />
      }
    ></centerbox>
  );
}
