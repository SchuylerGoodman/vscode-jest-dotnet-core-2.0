import { WeatherForecast } from "./weather-forecast";

export class WeatherForecasts {
    public forecasts: WeatherForecast[];
    public isLoading: boolean;
    public startDateIndex?: number;
}

export const initialWeatherForecasts: WeatherForecasts = {
    forecasts: [],
    isLoading: false,
    startDateIndex: undefined,
};
