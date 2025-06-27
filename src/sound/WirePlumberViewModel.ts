import Wp from "gi://AstalWp";
import { bind, Binding } from "astal";

export default class WirePlumberViewModel {
    private wireplumber: Wp.Wp | null = Wp.get_default();
    private lastDefaultSpeakerVolumeBeforeMute: number | null = null;

    public getAudio(): Binding<Wp.Audio> {
        if (!this.wireplumber) {
            throw new Error("WirePlumber is not initialized.");
        }
        return bind(this.wireplumber, "audio");
    }
    public getVideo(): Binding<Wp.Video> {
        if (!this.wireplumber) {
            throw new Error("WirePlumber is not initialized.");
        }
        return bind(this.wireplumber, "video");
    }
    public getSpeakers(): Binding<Wp.Endpoint[]> {
        if (!this.wireplumber) {
            throw new Error("WirePlumber is not initialized.");
        }
        return bind(this.getAudio().get(), "speakers");
    }
    public getDefaultSpeaker(): Binding<Wp.Endpoint> {
        if (!this.wireplumber) {
            throw new Error("WirePlumber is not initialized.");
        }
        return bind(this.getAudio().get(), "defaultSpeaker");
    }

    public getDefaultSpeakerVolume(): Binding<number> {
        const defaultSpeaker = this.getDefaultSpeaker().get();

        return bind(defaultSpeaker, "volume");
    }

    public getDefaultSpeakerVolumeIcon(): Binding<string> {
        const defaultSpeaker = this.getDefaultSpeaker().get();
        return bind(defaultSpeaker, "volumeIcon");
    }
    public setDefaultSpeakerVolume(volume: number): void {
        const defaultSpeaker = this.getDefaultSpeaker().get();
        if (!defaultSpeaker) {
            throw new Error("No default speaker set.");
        }
        else {
            defaultSpeaker.set_volume(volume);
        }
    }

    public muteDefaultSpeaker(): void {
        const defaultSpeaker = this.getDefaultSpeaker().get();
        if (!defaultSpeaker) {
            throw new Error("No default speaker set.");
        }
        this.lastDefaultSpeakerVolumeBeforeMute = defaultSpeaker.get_volume();
        defaultSpeaker.set_volume(0);
    }

    public unmuteDefaultSpeaker(): void {
        const defaultSpeaker = this.getDefaultSpeaker().get();
        if (!defaultSpeaker) {
            throw new Error("No default speaker set.");
        }
        if (this.lastDefaultSpeakerVolumeBeforeMute !== null) {
            defaultSpeaker.set_volume(this.lastDefaultSpeakerVolumeBeforeMute);
            this.lastDefaultSpeakerVolumeBeforeMute = null;
        } else {
            throw new Error("No previous volume to restore.");
        }
    }
}
