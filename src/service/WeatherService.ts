import { execAsync } from "astal";

export default class WeatherService {
  private static instance: WeatherService;
  private apiKey: string;
  private location: string;

  private constructor(apiKey: string, location: string) {
    this.apiKey = apiKey;
    this.location = location;
  }

  public static getInstance(apiKey: string, location: string): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService(apiKey, location);
    }
    return WeatherService.instance;
  }

  public async fetchWeather(): Promise<any> {
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

      return weatherData;
    } catch (error) {
      console.error("Weather API fetch error:", error);
      return null;
    }
  }
}
