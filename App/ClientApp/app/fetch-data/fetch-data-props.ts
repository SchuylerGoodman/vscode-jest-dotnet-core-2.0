import { data } from "statex/react";

import { AppState, WeatherForecast } from "../../state";

export class FetchDataProps {

    @data((state: AppState) => (state.weatherForecasts || { isLoading: true }).isLoading)
    public isLoading: boolean;

    @data((state: AppState) => (state.weatherForecasts || { forecasts: [] }).forecasts)
    public forecasts?: WeatherForecast[];

    @data((state: AppState) => (state.weatherForecasts || { startDateIndex: undefined }).startDateIndex)
    public startDateIndex?: number;
}
