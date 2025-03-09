import { Variable, execAsync, interval } from "astal";

export default class WeatherService {
  private static instance: WeatherService;
  private weatherVariable = Variable<any>(null); // Holds weather data
  private weatherIntervalInstance: any = null;
  private location: string = "Chisinau";

  private constructor() {
    this.startWeatherUpdates();
  }

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  public getWeather(): Variable<any> {
    return this.weatherVariable;
  }

  private startWeatherUpdates(): void {
    this.fetchWeather();
    this.weatherIntervalInstance = interval(10 * 60 * 1000, () =>
      this.fetchWeather()
    );
  }

  private async fetchWeather(): Promise<void> {
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

      this.weatherVariable.set(weatherData); // Update the variable with new weather data
    } catch (error) {
      console.error("Weather API fetch error:", error);
      this.weatherVariable.set(null);
    }
  }
}
