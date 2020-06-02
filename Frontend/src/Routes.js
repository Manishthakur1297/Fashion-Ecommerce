import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
// import Card1 from './components/Card1';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                {/* <Route path="/products/" exact component={Card1} /> */}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
