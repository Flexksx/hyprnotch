import { createBinding, createState, For, With } from 'ags';
import MediaViewModel from '../../lib/media/MediaViewModel';
import AstalMpris from 'gi://AstalMpris';
import { Gtk } from 'ags/gtk4';
import AstalApps from 'gi://AstalApps';
import Mpris from 'gi://AstalMpris';

const mediaViewModel = new MediaViewModel();
const apps = new AstalApps.Apps();

enum PlayerState {
  PREVIEW = 'preview',
  REVEALED = 'revealed'
}
const [currentState, setCurrentState] = createState<PlayerState>(
  PlayerState.PREVIEW
);
const [currentPlayer, setCurrentPlayer] = createState<Mpris.Player | null>(
  null
);
setCurrentPlayer(mediaViewModel.getPlayers().get()[0]);
function CurrentPlayerButton() {
  return (
    <button
      heightRequest={20}
      onClicked={() => {
        if (currentPlayer.get()) {
          if (currentState.get() === PlayerState.PREVIEW) {
            setCurrentState(PlayerState.REVEALED);
          } else {
            setCurrentState(PlayerState.PREVIEW);
          }
        }
      }}
    >
      <box>
        {' '}
        <For each={mediaViewModel.getPlayers()}>
          {player => {
            const [app] = apps.exact_query(player.entry);
            return <image visible={!!app.iconName} iconName={app?.iconName} />;
          }}
        </For>
        <revealer
          heightRequest={20}
          revealChild={currentState.as(state => state === PlayerState.REVEALED)}
          transitionType={Gtk.RevealerTransitionType.CROSSFADE}
          onNotifyChildRevealed={() => {
            print('Child revealed');
          }}
        >
          <RevealedPlayer player={currentPlayer.get()!} />
        </revealer>
      </box>
    </button>
  );
}
function RevealedPlayer({ player }: { player: Mpris.Player }) {
  return (
    <box class="revealed-player">
      <button
        class="revealed-player-close"
        onClicked={() => {
          setCurrentState(PlayerState.PREVIEW);
        }}
      >
        <image iconName="close" />
      </button>
      <image file={createBinding(player, 'coverArt')} pixelSize={64} />
    </box>
  );
}

export default function MediaPlayer() {
  return (
    <box class="media-player">
      <CurrentPlayerButton />
    </box>
  );
}
