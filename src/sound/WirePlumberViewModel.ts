import Wp from "gi://AstalWp";
import { bind, Binding } from "astal";
import Logger from "../logger/Logger";

export default class WirePlumberViewModel {
  private wireplumber: Wp.Wp | null = Wp.get_default();
  private lastDefaultSpeakerVolumeBeforeMute: number | null = null;
  private logger = new Logger(this.constructor.name);
  public getWirePlumber(): Wp.Wp {
    if (!this.wireplumber) {
      throw new Error("WirePlumber is not initialized.");
    }
    return this.wireplumber;
  }
  public getAudio(): Binding<Wp.Audio> {
    return bind(this.getWirePlumber(), "audio").as((audio) => {
      if (!audio) {
        throw new Error("Audio is not available in WirePlumber.");
      }
      return audio;
    });
  }
  public getVideo(): Binding<Wp.Video> {
    return bind(this.getWirePlumber(), "video");
  }
  public getSpeakers(): Binding<Wp.Endpoint[] | null> {
    return this.getAudio().as((audio) => {
      const speakers = bind(audio, "speakers");
      if (!speakers) {
        throw new Error("No speakers found in WirePlumber audio.");
      }
      return speakers.get();
    });
  }
  public getDefaultSpeaker(): Binding<Wp.Endpoint> {
    return this.getAudio().as((audio) => {
      const defaultSpeaker = bind(audio, "defaultSpeaker");
      if (!defaultSpeaker) {
        throw new Error("Default speaker is not set.");
      }
      return defaultSpeaker.get();
    });
  }

  public getDefaultSpeakerVolume(): Binding<number> {
    return this.getDefaultSpeaker().as((speaker) => {
      if (!speaker) {
        throw new Error("Default speaker is not set.");
      }
      return bind(speaker, "volume").get();
    });
  }

  public getDefaultSpeakerVolumeIcon(): Binding<string> {
    const defaultSpeaker = this.getDefaultSpeaker().get();
    return bind(defaultSpeaker, "volumeIcon");
  }
  public setDefaultSpeakerVolume(volume: number): void {
    const defaultSpeaker = this.getDefaultSpeaker().get();
    defaultSpeaker.set_volume(volume);
  }

  public muteDefaultSpeaker(): void {
    const defaultSpeaker = this.getDefaultSpeaker().get();

    this.lastDefaultSpeakerVolumeBeforeMute = defaultSpeaker.get_volume();
    defaultSpeaker.set_volume(0);
  }

  public unmuteDefaultSpeaker(): void {
    const defaultSpeaker = this.getDefaultSpeaker().get();

    if (this.lastDefaultSpeakerVolumeBeforeMute !== null) {
      defaultSpeaker.set_volume(this.lastDefaultSpeakerVolumeBeforeMute);
      this.lastDefaultSpeakerVolumeBeforeMute = null;
    } else {
      throw new Error("No previous volume to restore.");
    }
  }
  public setDefaultSpeaker(speaker: Wp.Endpoint) {
    this.logger.debug(
      `Setting default speaker to: ${speaker.get_description()}`
    );
    speaker.set_is_default(true);
  }
}
