import { createBinding, createState, With } from 'ags';
import MediaViewModel from '../../lib/media/MediaViewModel';
import { Gtk } from 'ags/gtk4';
import AstalApps from 'gi://AstalApps';
import Mpris from 'gi://AstalMpris';
import Logger from '../../src/logger/Logger';

const mediaViewModel = new MediaViewModel();
const apps = new AstalApps.Apps();
const LOG = new Logger('MediaPlayer');

enum MediaPlayerMode {
  COMPACT = 'compact',
  FULL = 'full'
}

const [currentState, setCurrentState] = createState<MediaPlayerMode>(
  MediaPlayerMode.COMPACT
);

function CompactMediaPlayer() {
  return (
    <button
      onClicked={() => {
        setCurrentState(MediaPlayerMode.FULL);
      }}
    >
      <With value={mediaViewModel.getCurrentPlayer()}>
        {player => {
          if (!player) {
            return (
              <box>
                <image iconName={'music-note-outline-symbolic'} />
              </box>
            );
          }
          const [app] = apps.exact_query(player.entry);
          return (
            <image
              visible={!!app.iconName}
              iconName={app?.iconName}
              pixelSize={16}
            />
          );
        }}
      </With>
    </button>
  );
}
function FullMediaPlayer() {
  const player = mediaViewModel.getCurrentPlayer().get() || new Mpris.Player();
  return (
    <button
      onClicked={() => {
        setCurrentState(MediaPlayerMode.COMPACT);
      }}
    >
      <label>{player.title || 'No Player Active'}</label>
      {player.coverArt && (
        <image file={createBinding(player, 'coverArt')} pixelSize={64} />
      )}
    </button>
  );
}

export default function MediaPlayer() {
  return (
    <stack
      visibleChildName={currentState}
      vhomogeneous={false}
      interpolateSize={true}
      hhomogeneous={false}
      class="media-player"
      transitionType={Gtk.StackTransitionType.CROSSFADE}
      transitionDuration={150}
      valign={Gtk.Align.CENTER}
    >
      <box $type="named" name={MediaPlayerMode.COMPACT}>
        <CompactMediaPlayer />
      </box>
      <box $type="named" name={MediaPlayerMode.FULL}>
        <FullMediaPlayer />
      </box>
    </stack>
  );
}
