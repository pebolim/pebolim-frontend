import React from 'react';

import { Link } from "react-router-dom";
import { Image, Responsive, Button, Icon, Sidebar, Menu } from 'semantic-ui-react';


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
            <li><a onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.assign("/home") }}>Logout</a></li>
        </ul>
    );
}

export default class Header extends React.Component {
    state = {
        user: {},
        visible: false
    }
    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        let log = null;
        if (localStorage.getItem('token') != null) {
            log = <LogoutButton />;
        } else {
            log = <LoginButton />;
        }
        return (
            <div>
                <Responsive minWidth={740}>
                    <header>
                        <div className="nav">
                            <ul className="nav-main">
                                <li>
                                    <Image src={require('../assets/images/logoPEBOLIM.png')} size='mini' />
                                </li>
                                <li><Link to='/home'>Home</Link></li>
                                <li><Link to='/game/create'>Create Game</Link></li>
                                <li><Link to='/team/create'>Create Team</Link></li>
                            </ul>
                            {log}
                        </div>
                    </header>
                </Responsive>
                <Responsive maxWidth={739}>
                    <header>
                        <div className="nav">
                            <ul className="nav-main">
                                <li>
                                    <a onClick={this.toggleVisibility}><Icon name="sidebar" size="large" /></a>
                                    <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
                                        <Menu.Item style={{cursor:"auto"}}>
                                            <Image centered src={require('../assets/images/logoPEBOLIM.png')} size='mini' />
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link to='/home' style={{cursor:"pointer"}}>Home</Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link to='/game/create' style={{cursor:"pointer"}}>Create Game</Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link to='/team/create' style={{cursor:"pointer"}}>Create Team</Link>
                                        </Menu.Item>
                                        <Menu.Item onClick={this.toggleVisibility}>
                                            <Icon name="close"/>
                                        </Menu.Item>
                                    </Sidebar>
                                </li>
                            </ul>
                        </div>
                    </header>
                </Responsive>
            </div>
        );
    }
}