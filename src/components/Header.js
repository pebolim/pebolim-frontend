import React from 'react';

import { Link } from "react-router-dom";
import { Flag, Button, Icon, Image } from 'semantic-ui-react';


import '../styles/header.css';

function LoginButton(props) {
    return (
        <ul className="nav-right">
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
        </ul>
    );
}

function LogoutButton(props) {
    return (
        <ul className="nav-right">
            <li><a onClick={() => {localStorage.removeItem('token');window.location.reload()}}>Logout</a></li>
        </ul>
    );
}

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            isLoggedIn: false
        }

        this.state = { isLoggedIn: null };
    }

    render() {
        console.log(localStorage.getItem('token'));
        let log = null;
        if (localStorage.getItem('token') != null) {
            log = <LogoutButton />;
        } else {
            log = <LoginButton />;
        }
        return (
            <header>
                <div className="nav">
                    <ul className="nav-main">
                        <li>
                            <Image src={require('../assets/images/logoPEBOLIM.png')} size='mini' />
                        </li>
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/game/create'>Create Game</Link></li>
                    </ul>
                    {log}
                </div>
            </header>
        );
    }
}