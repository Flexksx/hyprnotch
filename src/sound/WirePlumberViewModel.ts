import Wp from 'gi://AstalWp';
import { bind, Binding, timeout } from 'astal';
import Logger from '../logger/Logger';

export default class WirePlumberViewModel {
  private static instance: WirePlumberViewModel | null = null;

  private wireplumber: Wp.Wp | null;
  private lastDefaultSpeakerVolumeBeforeMute: number | null = null;
  private logger = new Logger(this.constructor.name);

  private _audio: Binding<Wp.Audio>;
  private _defaultSpeaker: Binding<Wp.Endpoint>;
  private _speakers: Binding<Wp.Endpoint[]>;

  private constructor() {
    this.wireplumber = Wp.get_default();
    if (!this.wireplumber) {
      throw new Error('WirePlumber is not initialized.');
    }

    this._audio = bind(this.wireplumber, 'audio');
    this._defaultSpeaker = this._audio.as(audio =>
      bind(audio, 'defaultSpeaker').get()
    );
    this._speakers = this._audio.as(
      audio => bind(audio, 'speakers').get() || []
    );
  }

  public static getInstance(): WirePlumberViewModel {
    if (!this.instance) {
      this.instance = new WirePlumberViewModel();
    }
    return this.instance;
  }

  public getWirePlumber(): Wp.Wp {
    if (!this.wireplumber) {
      throw new Error('WirePlumber is not initialized.');
    }
    return this.wireplumber;
  }

  public getAudio(): Binding<Wp.Audio> {
    return this._audio;
  }

  public getVideo(): Binding<Wp.Video> {
    return bind(this.getWirePlumber(), 'video');
  }

  public getSpeakers(): Binding<Wp.Endpoint[]> {
    return this._speakers;
  }

  public getDefaultSpeaker(): Binding<Wp.Endpoint> {
    this.logger.debug(
      'Getting default speaker which is: ',
      this._defaultSpeaker.get()?.get_description()
    );
    return this._defaultSpeaker;
  }

  public getDefaultSpeakerVolume(): Binding<number> {
    return this._defaultSpeaker.as(speaker => bind(speaker, 'volume').get());
  }

  public getDefaultSpeakerVolumeIcon(): Binding<string> {
    return this._defaultSpeaker.as(speaker =>
      bind(speaker, 'volumeIcon').get()
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
    speaker.set_is_default(true);
    this.logger.debug(
      'Set default speaker to: ',
      speaker.get_description(),
      ' with ID: ',
      speaker.get_id(),
      ' default speaker ID is: ',
      this.getDefaultSpeaker().get()?.get_description()
    );
  }
}
