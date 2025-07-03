import { Gtk } from "astal/gtk3";
import { NotificationViewModel } from "./NotificationViewModel";
import NotificationMenuContentViewModel from "./viewmodel/NotificationMenuContentViewModel";
import { NotificationMenuContentState } from "./viewmodel/NotificationMenuContentState";
import nerdfonts from "../lib/icons/nerdfonts";

const notificationViewModel = new NotificationViewModel();
const notificationMenuContentViewModel = new NotificationMenuContentViewModel();

export function NotificationsPopup() {
  return (
    <button
      className={"notification_bar"}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
      onButtonPressEvent={() => {
        notificationMenuContentViewModel.setState(
          notificationMenuContentViewModel.getState().get() ===
            NotificationMenuContentState.MINIMIZED
            ? NotificationMenuContentState.OPEN
            : NotificationMenuContentState.MINIMIZED
        );
      }}
      child={notificationMenuContentViewModel.getState().as((state) => {
        switch (state) {
          case NotificationMenuContentState.MINIMIZED:
            return (
              <box
                className={"minimized_notifications"}
                child={<label label={nerdfonts.notifications.bell} />}
              />
            );
          case NotificationMenuContentState.OPEN:
            return (
              <box
                className={"open_notifications"}
                child={
                  <label
                    label={
                      nerdfonts.notifications.bell_badge +
                      " See your notifications"
                    }
                  />
                }
              />
            );
        }
      })}
    />
  );
}
