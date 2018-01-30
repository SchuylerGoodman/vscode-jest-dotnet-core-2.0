import { addTask, fetch } from "domain-task";
import { Observable, Observer } from "rxjs/Rx";
import { action, ReplaceableState, store } from "statex/react";

import * as Actions from "../action/";
import { AppState, WeatherForecast } from "../state";

@store()
export class Store {

    @action()
    public increment(state: AppState, action: Actions.IncrementAction): AppState {
        let count = 0;
        if (state.counter) {
            count = state.counter.count;
        }

        return {
            counter: { count: count + 1 },
        };
    }

    @action()
    public decrement(state: AppState, action: Actions.DecrementAction): AppState {
        let count = 0;
        if (state.counter) {
            count = state.counter.count;
        }

        return {
            counter: { count: count - 1 },
        };
    }

    @action()
    public requestWeatherForecasts(state: AppState, action: Actions.RequestWeatherForecastsAction): AppState {

        const load = state.weatherForecasts && action.startDateIndex !== state.weatherForecasts.startDateIndex;
        if (load) {

            // Fetch the data from the API
            const fetchTask = fetch(`api/SampleData/WeatherForecasts?startDateIndex=${action.startDateIndex}`)
                    .then((response) => response.json() as Promise<WeatherForecast[]>)
                    .then((data) => {

                        // Dispatch a receive forecasts action on completion
                        const receiveAction = new Actions.ReceiveWeatherForecastsAction(action.startDateIndex, data);
                        receiveAction.dispatch();
                    });

            addTask(fetchTask);
        }

        return {
            weatherForecasts: {
                isLoading: load,
                startDateIndex: action.startDateIndex,
            },
        } as AppState;
    }

    @action()
    public receiveWeatherForecasts(
        state: AppState,
        action: Actions.ReceiveWeatherForecastsAction,
        ): Observable<AppState> {

        return Observable.create((observer: Observer<AppState>) => {

            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (state.weatherForecasts && state.weatherForecasts.startDateIndex === action.startDateIndex) {
                observer.next({
                    weatherForecasts: {
                        forecasts: action.forecasts,
                        isLoading: false,
                        startDateIndex: action.startDateIndex,
                    },
                } as AppState);
            } else {
                observer.next(state);
            }

            observer.complete();
        }).share();
    }
}
