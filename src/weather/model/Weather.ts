import { WeatherCondition } from "./WeatherCondition";
export class Weather {
  private lastUpdatedEpoch: string;
  private lastUpdated: string;
  private tempCelsius: string;
  private tempFahrenheit: string;
  private isDay: boolean;
  private condition: WeatherCondition;
  constructor(
    lastUpdatedEpoch: string,
    lastUpdated: string,
    tempCelsius: string,
    tempFahrenheit: string,
    isDay: boolean,
    condition: WeatherCondition
  ) {
    this.lastUpdatedEpoch = lastUpdatedEpoch;
    this.lastUpdated = lastUpdated;
    this.tempCelsius = tempCelsius;

    this.tempFahrenheit = tempFahrenheit;
    this.isDay = isDay;
    this.condition = condition;
  }

  getLastUpdatedEpoch(): string {
    return this.lastUpdatedEpoch;
  }
  getLastUpdated(): string {
    return this.lastUpdated;
  }
  getTempCelsius(): string {
    return this.tempCelsius;
  }
  getTempFahrenheit(): string {
    return this.tempFahrenheit;
  }
  getIsDay(): boolean {
    return this.isDay;
  }
  getCondition(): WeatherCondition {
    return this.condition;
  }
  getConditionText(): string {
    return this.condition.getText();
  }
  getConditionIcon(): string {
    return this.condition.getIcon();
  }
  getConditionCode(): number {
    return this.condition.getCode();
  }
}
