import { createState, With } from 'ags';
import { Astal, Gdk, Gtk } from 'ags/gtk4';
import app from 'ags/gtk4/app';

const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

enum NotchMode {
  PREVIEW = 'preview',
  DASHBOARD = 'dashboard'
}

export default function Notch({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
  const [currentMode, setCurrentMode] = createState<NotchMode>(
    NotchMode.PREVIEW
  );

  function CompactNotch() {
    return (
      <button
        class="notch-compact"
        onClicked={() => {
          setCurrentMode(NotchMode.DASHBOARD);
        }}
      >
        <image iconName="star-large-symbolic" pixelSize={16} />
      </button>
    );
  }

  function DashboardNotch() {
    return (
      <button
        onClicked={() => {
          setCurrentMode(NotchMode.PREVIEW);
        }}
      >
        <image iconName="go-previous-symbolic" pixelSize={16} />
        <label>Dashboard Notch</label>
      </button>
    );
  }
  return (
    <window
      visible
      class={currentMode.as(currentMode => `notch-container ${currentMode}`)}
      name="HyprnotchNotch"
      vexpand={false}
      gdkmonitor={gdkmonitor}
      heightRequest={currentMode.as(mode =>
        mode === NotchMode.PREVIEW ? 32 : 128
      )}
      widthRequest={currentMode.as(mode =>
        mode === NotchMode.PREVIEW ? 128 : 256
      )}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP}
      application={app}
    >
      <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
        <With value={currentMode}>
          {mode => {
            switch (mode) {
              case NotchMode.PREVIEW:
                return <CompactNotch />;
              case NotchMode.DASHBOARD:
                return <DashboardNotch />;
              default:
                return <CompactNotch />;
            }
          }}
        </With>
      </box>
    </window>
  );
}
