import React from 'react';
import {Switch, Route} from "react-router-dom";

import Home from './Home';
import Login from './Login';
import CreateGame from './Games/CreateGame';
import GamesByUser from './Games/GamesByUser';
import PlayerLobby from './Games/Lobbys/PlayerLobby';

export default class Main extends React.Component {
    render(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/game/create" component={CreateGame} /> 
                <Route path="/game/:id/lobby" component={PlayerLobby} />                 
                <Route path="/player/:id/games" component={GamesByUser} />
            </Switch>           
        );
    }

} 
