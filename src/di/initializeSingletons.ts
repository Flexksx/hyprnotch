// This file imports all singleton ViewModels to ensure they are registered
// Import all your singleton ViewModels here
import HyprlandWorkspacesViewModel from '../lib/hyprland/HyprlandWorkspacesViewModel';
import SystemTrayViewModel from '../../lib/tray/SystemTrayViewModel';
import TimeViewModel from '../../lib/time/TimeViewModel';
// Add more singleton imports as you create them
// import SomeOtherViewModel from '../path/to/SomeOtherViewModel';

/**
 * Initialize all singletons by importing their modules
 * This ensures all @SingletonViewModel decorators are executed
 */
export function initializeSingletons() {
  console.log('All singletons initialized');
}
