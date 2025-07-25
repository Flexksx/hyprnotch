export default class TimeService {
  private static instance: TimeService;
  private timeVariable = Variable<string>('').poll(1000, 'date');

  private constructor() {}
  public static getInstance(): TimeService {
    if (!TimeService.instance) {
      TimeService.instance = new TimeService();
    }
    return TimeService.instance;
  }

  public getTime(): Variable<string> {
    return this.timeVariable;
  }
}
