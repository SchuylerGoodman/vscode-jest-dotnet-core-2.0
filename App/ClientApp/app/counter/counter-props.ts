import { data } from "statex/react";

import { AppState } from "../../state";

export class CounterProps {

    @data((state: AppState) => (state.counter || { count: 0 }).count)
    public count?: number;
}
