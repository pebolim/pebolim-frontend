import React from 'react';
import {Switch, Route} from "react-router-dom";

import Home from './Home';
import Login from './Login';

export default class Main extends React.Component {
    render(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
            </Switch>           
        );
    }

} 
