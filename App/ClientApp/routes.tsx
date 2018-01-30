import * as React from "react";
import { Route } from "react-router-dom";
import { Counter, FetchData, Home, Layout } from "./app";

export const routes = <Layout>
    <Route exact path="/" component={ Home } />
    <Route path="/counter" component={ Counter } />
    <Route path="/fetchdata/:startDateIndex?" component={ FetchData } />
</Layout>;
