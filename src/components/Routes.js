import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from './Products.js';
import Basket from './Basket.js';
import Checkout from './Checkout.js';



export default (
    <Switch>

        <Route component={Products} exact path="/" />
        <Route component={Basket} path='/basket' />
        <Route component={Checkout} path="/checkout" />



    </Switch>
)