import "bootstrap";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { initialize } from "statex/react";

import "./css/site.css";
import * as RoutesModule from "./routes";
import { INITIAL_STATE } from "./state";
import "./store";

let routes = RoutesModule.routes;

function renderApp() {

    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href")!;
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={ routes } basename={ baseUrl } />
        </AppContainer>,
        document.getElementById("react-app"),
    );
}

initialize(INITIAL_STATE, {
    domain: "Mango",
    hotLoad: false, // true,
});

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept("./routes", () => {
        routes = require<typeof RoutesModule>("./routes").routes;
        renderApp();
    });
}
