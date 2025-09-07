import { exec } from 'ags/process';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

export default class ThemeController {
  private static commandName: string = 'theme';
  private static darkmanCommandName: string = 'darkman';
  public setTheme(mode: ThemeMode): void {
    exec([ThemeController.darkmanCommandName, 'set', mode]);
  }
  public setThemeByImage(mode: ThemeMode, image: string): void {
    exec([ThemeController.commandName, mode, image]);
  }
}
