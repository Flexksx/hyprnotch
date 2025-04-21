import { bind, Binding } from "astal";
import Hyprland from "gi://AstalHyprland";

export default class FocusedClientViewModel {
  private hyprland = Hyprland.get_default();

  constructor() {}

  public getFocusedClient(): Binding<Hyprland.Client> {
    return bind(this.hyprland, "focused_client");
  }
}
