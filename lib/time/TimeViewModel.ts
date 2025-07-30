import { createPoll } from 'ags/time';
import { SingletonViewModel } from '../di';

@SingletonViewModel
export default class TimeViewModel {
  private readonly clock = createPoll('', 1000, 'date');

  getTimePoll() {
    return this.clock;
  }
}
