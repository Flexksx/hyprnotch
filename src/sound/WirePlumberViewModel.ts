import Wp from "gi://AstalWp";
import { bind, Binding } from "astal";

export default class WirePlumberViewModel {
    private wireplumber: Wp.Wp | null = Wp.get_default();

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
    public getDefaultSpeaker(): Binding<Wp.Endpoint | null> {
        if (!this.wireplumber) {
            throw new Error("WirePlumber is not initialized.");
        }
        return bind(this.getAudio().get(), "defaultSpeaker");
    }
}
