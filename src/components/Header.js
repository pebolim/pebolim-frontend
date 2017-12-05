import React from 'react';

import { Link } from "react-router-dom";
import { Image } from 'semantic-ui-react';


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
            <li><a>{JSON.parse(localStorage.getItem('user')).nickname}</a></li>
            <li><a onClick={() => {localStorage.removeItem('token');localStorage.removeItem('user');window.location.assign("/home")}}>Logout</a></li>
        </ul>
    );
}

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    render() {
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