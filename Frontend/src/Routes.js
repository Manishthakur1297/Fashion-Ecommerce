import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                {/* <Route path="/shop" exact component={Shop} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} /> */}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
