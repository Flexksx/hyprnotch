// This file imports all singleton ViewModels to ensure they are registered
// Import all your singleton ViewModels here
import HyprlandWorkspacesViewModel from '../hyprland/HyprlandWorkspacesViewModel';
import SystemTrayViewModel from '../tray/SystemTrayViewModel';
import TimeViewModel from '../time/TimeViewModel';
import MediaViewModel from '../media/MediaViewModel';
import BatteryViewModel from '../system/BatteryViewModel';
// Add more singleton imports as you create them
// import SomeOtherViewModel from '../path/to/SomeOtherViewModel';

/**
 * Initialize all singletons by importing their modules
 * This ensures all @SingletonViewModel decorators are executed
 */
export function initializeSingletons() {
  console.log('All singletons initialized');
}
