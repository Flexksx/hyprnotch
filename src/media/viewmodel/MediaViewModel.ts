import Mpris from "gi://AstalMpris";
import Logger from "../../logger/Logger";
import Binding, { bind } from "astal/binding";
export default class MediaViewModel {
  private mpris: Mpris.Mpris = Mpris.get_default();
  private logger: Logger = new Logger("MediaViewModel");
  private spotify: Mpris.Player = Mpris.Player.new("spotify");
  private youtube: Mpris.Player = Mpris.Player.new("youtube");
  constructor() {}

  public getPlayers(): Mpris.Player[] {
    const players = this.mpris.get_players();
    if (!players) {
      this.logger.error("No players found");
      throw new Error("No players found");
    }
    return players;
  }
  public getSpotifyAvailable(): Binding<boolean> {
    return bind(this.spotify, "available");
  }
  public getYoutubeAvailable(): Binding<boolean> {
    return bind(this.youtube, "available");
  }
}
