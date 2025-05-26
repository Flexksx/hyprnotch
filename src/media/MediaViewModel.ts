import Mpris from "gi://AstalMpris";
import Binding, { bind } from "astal/binding";
import Logger from "../logger/Logger";
export default class MediaViewModel {
  private mpris: Mpris.Mpris = Mpris.get_default();
  private logger: Logger = new Logger("MediaViewModel");
  private spotify: Mpris.Player = Mpris.Player.new("spotify");
  private youtube: Mpris.Player = Mpris.Player.new("youtube");

  constructor() {}

  public getPlayers(): Binding<Mpris.Player[]> {
    return bind(this.mpris, "players");
  }
  public getSpotifyAvailable(): Binding<boolean> {
    return bind(this.spotify, "available");
  }
  public getYoutubeAvailable(): Binding<boolean> {
    return bind(this.youtube, "available");
  }
}
