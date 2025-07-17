import Logger from '../logger/Logger';
import { SystemTrayViewModel } from './SystemTrayViewModel';
import { bind } from 'astal';
import TrayItemNotch from './TrayItemNotch';
import { Gtk } from 'astal/gtk3';
import SystemTrayItemButton from './SystemTrayItemButton';
import animations from '../lib/material/animations';

const logger = new Logger('TrayItemNotch');
const systemTrayViewModel = new SystemTrayViewModel();

export function SystemTray() {
  return (
    <box
      className={bind(systemTrayViewModel.getFocusedTrayItem()).as(
        (focusedTrayItem) => {
          return (
            'system_tray_constant_background' +
            (focusedTrayItem ? ' focused' : '')
          );
        },
      )}
      child={
        <box
          className={bind(systemTrayViewModel.getFocusedTrayItem()).as(
            (focusedTrayItem) => {
              return 'system_tray' + (focusedTrayItem ? ' focused' : '');
            },
          )}
          vertical={true}
          halign={Gtk.Align.END}
          valign={Gtk.Align.START}
          children={[
            <box
              className={'system_tray_items_list'}
              children={systemTrayViewModel
                .getTrayItems()
                .as((items) =>
                  items
                    .filter((item) => item.get_title() !== null)
                    .map((item, index) => (
                      <SystemTrayItemButton
                        systemTrayViewModel={systemTrayViewModel}
                        item={item}
                      />
                    )),
                )}
            />,
            <revealer
              transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
              transitionDuration={animations.expressive.fast_effects.duration}
              revealChild={systemTrayViewModel
                .getFocusedTrayItem()
                .as((focusedTrayItem) => {
                  return focusedTrayItem !== null;
                })}
              child={
                <TrayItemNotch systemTrayViewModel={systemTrayViewModel} />
              }
            />,
          ]}
        />
      }
    />
  );
}
