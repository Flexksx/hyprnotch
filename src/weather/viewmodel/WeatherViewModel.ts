import { Variable, execAsync, interval } from "astal";
import WeatherService from "../service/WeatherService";
import { Weather } from "../model/Weather";
import { WeatherBuilder } from "../model/WeatherBuilder";

export class WeatherViewModel {
  private weatherService: WeatherService;
  private weatherVariable: Variable<Weather>;

  constructor() {
    this.weatherService = new WeatherService();
    const plainWeatherObj = new WeatherBuilder()
      .withLastUpdatedEpoch("")
      .withLastUpdated("")
      .withTempCelsius("Loading")
      .withTempFahrenheit("Loading")
      .withIsDay(false)
      .withConditionText("Loading")
      .withConditionIcon("Loading")
      .withConditionCode(0)
      .build();

    this.weatherVariable = Variable<Weather>(plainWeatherObj);
    this.refreshWeather();
    this.pollWeatherUpdate();
  }

  public async pollWeatherUpdate(): Promise<void> {
    interval(60000, async () => {
      this.refreshWeather();
    }).start();
  }

  public async refreshWeather(): Promise<void> {
    try {
      const weather = await this.weatherService.fetchWeather();
      if (weather) {
        this.weatherVariable.set(weather);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }

  public getWeatherVariable(): Variable<Weather> {
    return this.weatherVariable;
  }
}
