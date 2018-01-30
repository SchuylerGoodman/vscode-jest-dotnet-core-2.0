import { Action } from "statex/react";
import { WeatherForecast, WeatherForecasts } from "../../state";

export class ReceiveWeatherForecastsAction extends Action {
    constructor(
        public startDateIndex: number,
        public forecasts: WeatherForecast[],
    ) {
        super();
    }
}
