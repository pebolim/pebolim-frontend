import React from 'react';
import {Switch, Route} from "react-router-dom";

import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import CreateGame from './Games/CreateGame';
import GamesByUser from './Games/GamesByUser';
import PlayerLobby from './Games/Lobbys/PlayerLobby';
import UserDetails from './User/UserDetails';

export default class Main extends React.Component {
    render(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />
                <Route path="/game/create" component={CreateGame} /> 
                <Route path="/game/:id/lobby" component={PlayerLobby} />                 
                <Route path="/player/games" component={GamesByUser} />
                <Route path="/user/details" component={UserDetails} />
            </Switch>           
        );
    }

} 
