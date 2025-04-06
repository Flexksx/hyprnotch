import { Variable, execAsync, interval } from "astal";
import { Weather } from "../model/Weather";
import { WeatherBuilder } from "../model/WeatherBuilder";

export default class WeatherService {
  private apiKey: string;
  private location: string;

  constructor(
    apiKey: string = "7e10c82932714b21932134017230909",
    location: string = "Chisinau"
  ) {
    this.apiKey = apiKey;
    this.location = location;
  }

  public async fetchWeather(): Promise<Weather | undefined> {
    try {
      const formattedLocation = this.location.replaceAll(" ", "%20");
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${formattedLocation}&days=1&aqi=no&alerts=no`;

      const response = await execAsync(`curl "${url}"`);
      if (typeof response !== "string") {
        throw new Error("Invalid response format");
      }

      const weatherData = JSON.parse(response);
      if (weatherData.error) {
        throw new Error(weatherData.error.message);
      }

      const current = weatherData.current;
      const condition = current.condition;
      const weather = new WeatherBuilder()
        .withLastUpdatedEpoch(current.last_updated_epoch)
        .withLastUpdated(current.last_updated)
        .withTempCelsius(current.temp_c)
        .withTempFahrenheit(current.temp_f)
        .withIsDay(current.is_day)
        .withConditionText(condition.text)
        .withConditionIcon(condition.icon)
        .withConditionCode(condition.code)
        .build();
      return weather;
    } catch (error) {
      console.error("Weather API fetch error:", error);
      return undefined;
    }
  }
}
