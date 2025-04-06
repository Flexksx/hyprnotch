import { Weather } from "./Weather";
import { WeatherCondition } from "./WeatherCondition";

export class WeatherBuilder {
  private lastUpdatedEpoch: string | undefined;
  private lastUpdated: string | undefined;
  private tempCelsius: string | undefined;
  private tempFahrenheit: string | undefined;
  private isDay: boolean | undefined;
  private conditionText: string | undefined;
  private conditionIcon: string | undefined;
  private conditionCode: number | undefined;

  withLastUpdatedEpoch(lastUpdatedEpoch: string): WeatherBuilder {
    this.lastUpdatedEpoch = lastUpdatedEpoch;
    return this;
  }
  withLastUpdated(lastUpdated: string): WeatherBuilder {
    this.lastUpdated = lastUpdated;
    return this;
  }
  withTempCelsius(tempCelsius: string): WeatherBuilder {
    this.tempCelsius = tempCelsius;
    return this;
  }
  withTempFahrenheit(tempFahrenheit: string): WeatherBuilder {
    this.tempFahrenheit = tempFahrenheit;
    return this;
  }
  withIsDay(isDay: boolean): WeatherBuilder {
    this.isDay = isDay;
    return this;
  }
  withConditionText(conditionText: string): WeatherBuilder {
    this.conditionText = conditionText;
    return this;
  }
  withConditionIcon(conditionIcon: string): WeatherBuilder {
    this.conditionIcon = conditionIcon;
    return this;
  }
  withConditionCode(conditionCode: number): WeatherBuilder {
    this.conditionCode = conditionCode;
    return this;
  }
  build(): Weather {
    return new Weather(
      this.lastUpdatedEpoch ?? "",
      this.lastUpdated ?? "",
      this.tempCelsius ?? "",
      this.tempFahrenheit ?? "",
      this.isDay ?? false,
      new WeatherCondition(
        this.conditionText ?? "",
        this.conditionIcon ?? "",
        this.conditionCode ?? 0
      )
    );
  }
}
