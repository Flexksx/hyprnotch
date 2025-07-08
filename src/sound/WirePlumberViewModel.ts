import Wp from "gi://AstalWp";
import { bind, Binding } from "astal";
import Logger from "../logger/Logger";

export default class WirePlumberViewModel {
  private wireplumber: Wp.Wp;
  private lastDefaultSpeakerVolumeBeforeMute: number | null = null;
  private logger = new Logger(this.constructor.name);

  private _audio: Binding<Wp.Audio>;
  private _defaultSpeaker: Binding<Wp.Endpoint>;
  private _speakers: Binding<Wp.Endpoint[]>;

  constructor() {
    this.wireplumber = Wp.get_default();
    if (!this.wireplumber) {
      throw new Error("WirePlumber is not initialized.");
    }

    this._audio = bind(this.wireplumber, "audio");
    this._defaultSpeaker = this._audio.as((audio) =>
      bind(audio, "defaultSpeaker").get()
    );
    this._speakers = this._audio.as(
      (audio) => bind(audio, "speakers").get() || []
    );
  }

  public getWirePlumber(): Wp.Wp {
    return this.wireplumber;
  }

  public getAudio(): Binding<Wp.Audio> {
    return this._audio;
  }

  public getVideo(): Binding<Wp.Video> {
    return bind(this.wireplumber, "video");
  }

  public getSpeakers(): Binding<Wp.Endpoint[]> {
    return this._speakers;
  }

  public getDefaultSpeaker(): Binding<Wp.Endpoint> {
    return this._defaultSpeaker;
  }

  public getDefaultSpeakerVolume(): Binding<number> {
    return this._defaultSpeaker.as((speaker) => bind(speaker, "volume").get());
  }

  public getDefaultSpeakerVolumeIcon(): Binding<string> {
    return this._defaultSpeaker.as((speaker) =>
      bind(speaker, "volumeIcon").get()
    );
  }

  public setDefaultSpeakerVolume(volume: number): void {
    const defaultSpeaker = this._defaultSpeaker.get();
    if (defaultSpeaker) {
      defaultSpeaker.set_volume(volume);
    }
  }

  public muteDefaultSpeaker(): void {
    const defaultSpeaker = this._defaultSpeaker.get();
    if (defaultSpeaker) {
      this.lastDefaultSpeakerVolumeBeforeMute = defaultSpeaker.get_volume();
      defaultSpeaker.set_volume(0);
    }
  }

  public unmuteDefaultSpeaker(): void {
    const defaultSpeaker = this._defaultSpeaker.get();
    if (defaultSpeaker && this.lastDefaultSpeakerVolumeBeforeMute !== null) {
      defaultSpeaker.set_volume(this.lastDefaultSpeakerVolumeBeforeMute);
      this.lastDefaultSpeakerVolumeBeforeMute = null;
    }
  }

  public setDefaultSpeaker(speaker: Wp.Endpoint): void {
    this.logger.debug(
      `Setting default speaker to: ${speaker.get_description()}`
    );
    speaker.set_is_default(true);
  }
}
