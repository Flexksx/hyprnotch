import { Variable, execAsync, interval } from "astal";
import WeatherService from "../service/WeatherService";
import { Weather } from "../model/Weather";
import { WeatherBuilder } from "../model/WeatherBuilder";
import Logger from "../../logger/Logger";

export class WeatherViewModel {
  private weatherService: WeatherService;
  private weatherVariable: Variable<Weather>;
  private logger: Logger = new Logger("WeatherViewModel");

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
      this.logger.debug("Polling weather update");
    });
  }

  public async refreshWeather(): Promise<void> {
    try {
      const weather = await this.weatherService.fetchWeather();
      if (weather) {
        this.weatherVariable.set(weather);
      }
    } catch (error) {
      this.logger.error("Error fetching weather data: ", error);
    }
  }

  public getWeatherVariable(): Variable<Weather> {
    return this.weatherVariable;
  }
}
