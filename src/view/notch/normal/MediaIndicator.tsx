import Logger from "../../../logger/Logger";
import MediaViewModel from "../../../media/MediaViewModel";
export default function MediaIndicator() {
  const mediaViewModel = new MediaViewModel();
  const logger = new Logger("MediaIndicator");

  return (
    <box
      className="normal_notch_media_icon"
      child={
        <box
          className={mediaViewModel
            .getSpotifyAvailable()
            .as((spotifyAvailable) => {
              return spotifyAvailable
                ? "normal_notch_media_indicator spotify"
                : "normal_notch_media_indicator";
            })}
          child={
            <label
              label={mediaViewModel.getPlayers().as((players) => {
                return players[0].get_identity();
              })}
            ></label>
          }
        ></box>
      }
    ></box>
  );
}
