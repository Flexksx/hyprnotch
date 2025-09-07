import { createBinding } from 'ags';
import { SingletonViewModel } from '../di';
import Mpris from 'gi://AstalMpris';

@SingletonViewModel
export default class MediaViewModel {
  private mpris = Mpris.get_default();

  private getMpris() {
    if (!this.mpris) {
      throw new Error('Mpris is not available');
    }
    return this.mpris;
  }

  public getPlayers() {
    return createBinding(this.getMpris(), 'players');
  }
  public getCurrentPlayer() {
    return this.getPlayers().as(players => {
      return (
        players.find(
          player => player.playbackStatus === Mpris.PlaybackStatus.PLAYING
        ) || null
      );
    });
  }
}
