import * as React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { inject } from "statex/react";

import { RequestWeatherForecastsAction } from "../../action";
import { AppState, WeatherForecast, WeatherForecasts } from "../../state";
import { FetchDataProps } from "./fetch-data-props";

@inject(FetchDataProps)
export class FetchData extends React.Component<
    FetchDataProps & RouteComponentProps<{ startDateIndex: string }>,
    WeatherForecasts> {

    constructor() {
        super();
    }

    public componentWillMount() {
        const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        (new RequestWeatherForecastsAction(startDateIndex)).dispatch();
    }

    public componentWillReceiveProps(nextProps: FetchDataProps & RouteComponentProps<{ startDateIndex: string }>) {
        const startDateIndex = parseInt(nextProps.match.params.startDateIndex, 10) || 0;
        (new RequestWeatherForecastsAction(startDateIndex)).dispatch();
    }

    public render() {
        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {this.renderForecastsTable()}
            {this.renderPagination()}
        </div>;
    }

    private renderForecastsTable() {
        const forecasts = (this.props.forecasts || []);

        return <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map((forecast) =>
                    <tr key={forecast.dateFormatted}>
                        <td>{forecast.dateFormatted}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>,
                )}
            </tbody>
        </table>;
    }

    private renderPagination() {
        const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

        return <p className="clearfix text-center">
            <Link className="btn btn-default pull-left" to={`/fetchdata/${prevStartDateIndex}`}>Previous</Link>
            <Link className="btn btn-default pull-right" to={`/fetchdata/${nextStartDateIndex}`}>Next</Link>
            {this.props.isLoading ? <span>Loading...</span> : []}
        </p>;
    }
}
