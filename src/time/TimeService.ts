import { Variable } from "astal";

export default class TimeService {
  private static instance: TimeService;
  private timeVariable = Variable<string>("").poll(1000, "date");

  private constructor() {} // Private constructor to prevent direct instantiation

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
