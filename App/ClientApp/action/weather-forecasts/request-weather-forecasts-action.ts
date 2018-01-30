import { Action } from "statex/react";
import { WeatherForecast, WeatherForecasts } from "../../state";

export class RequestWeatherForecastsAction extends Action {
    constructor(public startDateIndex: number) { super(); }
}
