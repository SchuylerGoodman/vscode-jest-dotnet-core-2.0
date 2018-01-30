import { AppState } from "./";
import { initialCounter } from "./counter";
import { initialWeatherForecasts } from "./weather-forecasts";

export const INITIAL_STATE: AppState = {
    counter: initialCounter,
    weatherForecasts: initialWeatherForecasts,
};
