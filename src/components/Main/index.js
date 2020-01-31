
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Movies from "../Movies";
import MoviesOnly from "../MoviesOnly";

const Main = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Movies} />
            <Route path="/movies/:id" component={MoviesOnly} />
        </Switch>
    </BrowserRouter>
);

export default Main;