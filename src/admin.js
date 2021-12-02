import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Data from './data';
import Home from './Home';
import Tutorial from './tutorial';
export default function Admin(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = {Home}></Route>
                <Route exact path = "/moneyball@2607/mbtpremiere" component = {Data}></Route>
                <Route exact path = "/tutorial_how-to-install-metamask-and-add-Binance-smart-chain-and-MBT-coin" component = {Tutorial}></Route>
            </Switch>
        </BrowserRouter>
    )
}