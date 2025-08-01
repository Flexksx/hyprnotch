import { bind, Binding } from 'astal';
import Bluetooth from 'gi://AstalBluetooth';
import Logger from '../../logger/Logger';

export default class BluetoothViewModel {
  private static instance: BluetoothViewModel | null = null;

  private bluetooth: Bluetooth.Bluetooth = Bluetooth.get_default();
  private logger: Logger = new Logger(this.constructor.name);

  private constructor() {}

  public static getInstance(): BluetoothViewModel {
    if (!this.instance) {
      this.instance = new BluetoothViewModel();
    }
    return this.instance;
  }

  public getDevices(): Binding<Bluetooth.Device[]> {
    return bind(this.bluetooth, 'devices');
  }
  public getAdapters(): Binding<Bluetooth.Adapter[]> {
    return bind(this.bluetooth, 'adapters');
  }
  public getIsPowered(): Binding<boolean> {
    return bind(this.bluetooth, 'is_powered');
  }
  public toggle(): void {
    this.bluetooth.toggle();
    this.logger.info(
      'Toggling bluetooth state to ' + this.getIsPowered().get()
    );
  }
}
