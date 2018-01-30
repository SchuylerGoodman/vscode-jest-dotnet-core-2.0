import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { inject } from "statex/react";

import { DecrementAction, IncrementAction } from "../../action";
import { CounterProps } from "./counter-props";

@inject(CounterProps)
export class Counter extends React.Component<CounterProps & RouteComponentProps<any>, {}> {

    public render() {

        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong>{this.props.count}</strong></p>

            <button onClick={() => { this.increment(); }}>Increment</button>
        </div>;
    }

    private increment = () => {
        new IncrementAction().dispatch();
    }

    private decrement = () => {
        new DecrementAction().dispatch();
    }
}
