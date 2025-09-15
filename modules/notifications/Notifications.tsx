import { Astal, Gtk } from 'ags/gtk4';
import app from 'ags/gtk4/app';
import Notifd from 'gi://AstalNotifd';
import Hyprland from 'gi://AstalHyprland';
import { createBinding, createState, With } from 'ags';
import { timeout } from 'ags/time';
import Logger from '../../lib/Logger';
import Pango from 'gi://Pango?version=1.0';

const DEFAULT_EXPIRY = 3000; // 5 seconds
const LOG = new Logger('Notifications');

const notifd = Notifd.get_default();

const [hasNewNotification, setHasNewNotification] = createState(false);
const [notificationPopup, setNotificationPopup] =
  createState<Notifd.Notification | null>(null);

notifd.connect('notified', (notifd, notificationId) => {
  const notification = notifd
    .get_notifications()
    .find(n => n.id === notificationId);

  if (!notification) {
    LOG.error(`Notification with ID ${notificationId} not found.`);
    return;
  }

  let notificationTimeout = DEFAULT_EXPIRY;
  const notificationExpireTimeout = notification?.get_expire_timeout();
  if (notificationExpireTimeout && notificationExpireTimeout > 0) {
    notificationTimeout = notificationExpireTimeout;
  }

  setHasNewNotification(true);
  setNotificationPopup(notification);

  timeout(notificationTimeout, () => {
    setHasNewNotification(false);
    setNotificationPopup(null);
  });
});

const NotificationPopupLarge = ({
  notification
}: {
  notification: Notifd.Notification;
}) => {
  const image = notification.get_image();
  const appIcon = notification.get_app_icon();
  const notificationSummary = notification.get_summary();
  const notificationBody = notification.get_body();
  LOG.debug('Rendering notification:', {
    image: image,
    appIcon: appIcon,
    notificationSummary: notificationSummary,
    notificationBody: notificationBody
  });
  return (
    <box>
      {image ? (
        <image file={image} pixelSize={64} />
      ) : appIcon ? (
        <image iconName={appIcon} pixelSize={32} />
      ) : null}
      <box
        orientation={Gtk.Orientation.VERTICAL}
        halign={Gtk.Align.START}
        valign={Gtk.Align.START}
      >
        <label
          class="notification-popup-large-summary"
          useMarkup={true}
          label={notificationSummary}
          halign={Gtk.Align.START}
          xalign={0}
          maxWidthChars={40}
          wrap={true}
          wrapMode={Pango.WrapMode.WORD_CHAR}
          ellipsize={Pango.EllipsizeMode.NONE}
        />
        <label
          class="notification-popup-large-body"
          useMarkup={true}
          label={notificationBody}
          halign={Gtk.Align.START}
          xalign={0}
          maxWidthChars={40}
          wrap={true}
          wrapMode={Pango.WrapMode.WORD_CHAR}
          ellipsize={Pango.EllipsizeMode.NONE}
        />
      </box>
    </box>
  );
};

const NotificationPopupSmall = ({
  notification
}: {
  notification: Notifd.Notification;
}) => {
  const image = notification.get_image();
  const appIcon = notification.get_app_icon();
  const notificationSummary = notification.get_summary();
  const notificationBody =
    notification.get_body().length > 40
      ? notification.get_body().slice(0, 40) + '...'
      : notification.get_body();
  LOG.debug('Rendering notification:', {
    image: image,
    appIcon: appIcon,
    notificationSummary: notificationSummary,
    notificationBody: notificationBody
  });
  return (
    <box>
      {image ? (
        <image file={image} pixelSize={64} />
      ) : appIcon ? (
        <image iconName={appIcon} pixelSize={32} />
      ) : null}
      <box
        orientation={Gtk.Orientation.VERTICAL}
        halign={Gtk.Align.START}
        valign={Gtk.Align.START}
      >
        <label
          class="notification-popup-small-summary"
          useMarkup={true}
          label={notificationSummary}
          halign={Gtk.Align.START}
          ellipsize={Pango.EllipsizeMode.END}
        />
        <label
          class="notification-popup-small-body"
          useMarkup={true}
          label={notificationBody}
          halign={Gtk.Align.START}
          ellipsize={Pango.EllipsizeMode.END}
        />
      </box>
    </box>
  );
};

const NotificationsPopup = () => {
  return (
    <window
      class="notifications-popup"
      visible={hasNewNotification}
      anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP}
    >
      <box halign={Gtk.Align.END} valign={Gtk.Align.START}>
        <With value={notificationPopup}>
          {notification => {
            const [notificationPopupShowFull, setNotificationPopupShowFull] =
              createState(false);
            return notification ? (
              <button
                onClicked={() => setNotificationPopupShowFull(s => !s)}
                class={notificationPopupShowFull.as(
                  showFull =>
                    'notifications-popup-clickable' + (showFull ? ' large' : '')
                )}
              >
                <With value={notificationPopupShowFull}>
                  {showFull =>
                    showFull ? (
                      <NotificationPopupLarge notification={notification} />
                    ) : (
                      <box>
                        <NotificationPopupSmall notification={notification} />
                      </box>
                    )
                  }
                </With>
              </button>
            ) : null;
          }}
        </With>
      </box>
    </window>
  );
};

export default function Notifications() {
  return <NotificationsPopup />;
}
