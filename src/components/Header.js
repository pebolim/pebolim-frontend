import React from 'react';

import { Link } from "react-router-dom";
import { Image, Responsive, Icon, Sidebar, Menu, Container, Dropdown } from 'semantic-ui-react';


import '../styles/header.css';

function LoginButton(props) {
    return (
        <Menu.Menu position="right">
            <Menu.Item><Link to='/login'>Login</Link></Menu.Item>
            <Menu.Item><Link to='/register'>Register</Link></Menu.Item>
        </Menu.Menu>
    );
}

function DropDownTeamInvitations(props) {
    const inv = props.invites.invites;
    const myStyle = {
        animation: "haveInvites",
        animationDuration: "1.5s",
        animationIterationCount: "infinite"
    }
    return (
        <Dropdown item text='Team Invitations' icon={inv.length > 0 ? 'bell outline' : ''} pointing style={inv.length > 0 ? myStyle : {}}>
            <Dropdown.Menu>

                {
                    inv.map(i => {//image_url:null is_official:false name:null partner:{id: 7, nickname: "ricardma", image_url: null}
                        return (
                            <Dropdown.Item key={"invite" + i.id}>
                                <b>{i.partner.nickname}</b> invited you for a team
                                <br />
                                <button style={{ width: 100 + "%", backgroundColor: "#00ff94", border: "1px solid #00ff94", cursor: "pointer", color: "white" }} onClick={() => acceptInvite(i.id)}>Accept</button>
                            </Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

function acceptInvite(id) {
    fetch('http://127.0.0.1:3000/team/join/' + id, {
        method: 'PUT',
        headers: {
            "Authorization": localStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
    }).then(function (response) {
        return response.json();
    }).then(function (body) {
        console.log(body)
    });
}

function LogoutButton(props) {
    return (
        <Menu.Menu position="right">
            <DropDownTeamInvitations invites={props} />
            <Menu.Item><Link to='/user/details'>{JSON.parse(localStorage.getItem('user')).nickname}</Link></Menu.Item>
            <Menu.Item><a onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = ("/") }}>Logout</a></Menu.Item>
        </Menu.Menu>
    );
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            visible: false,
            invites: [
            ]
        }
    }

    getInvites = () => {
        /*var headers = new Headers({
            "Authorization": localStorage.getItem("token"),
            'Content-Type': 'application/json'
        });
        var myInit = {
            method: 'GET',
            headers: headers
        }
        fetch(`http://localhost:3000/teams/pendent/`, myInit)
            .then(result => result.json())
            .then(invs => {
                if (invs.status==401){
                    localStorage.clear();
                    window.location.href="/login"
                }else{
                    this.setState({
                        invites: invs.data
                    })
                }
            })
            */

    }

    componentDidMount() {
        
        if (localStorage.getItem('token') != null) {
            this.getInvites();
            this.interval = setInterval(this.getInvites, 10000)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState == this.state) {
            if (localStorage.getItem('token') != null) {
                this.getInvites();
                this.interval = setInterval(this.getInvites, 10000)
            }
        }
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        let log = null;
        if (localStorage.getItem('token') != null) {
            log = <LogoutButton invites={this.state.invites} />;
        } else {
            log = <LoginButton />;
        }
        return (
            <div>
                <Responsive minWidth={740}>
                    <Container style={{ marginBottom: 0 + "px" }}>
                        <Menu>
                            <Menu.Menu className="nav-main">
                                <Menu.Item>
                                    <Image src={require('../assets/images/logoPEBOLIM.png')} size='mini' as="a" href="/"/>
                                </Menu.Item>
                                <Menu.Item as="a" style={{display:localStorage.getItem('token') == null ? 'none' : 'block'}} href="/home">Home</Menu.Item>
                            </Menu.Menu>
                            {log}
                        </Menu>
                    </Container>
                </Responsive>
                <Responsive maxWidth={739}>
                    <header>
                        <div className="nav">
                            <ul className="nav-main">
                                <li>
                                    <a onClick={this.toggleVisibility}><Icon name="sidebar" size="large" /></a>
                                    <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
                                        <Menu.Item style={{ cursor: "auto" }}>
                                            <Image centered src={require('../assets/images/logoPEBOLIM.png')} size='mini' />
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link to='/home' style={{ cursor: "pointer" }}>Home</Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link to='/game/create' style={{ cursor: "pointer" }}>Create Game</Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link to='/teams' style={{ cursor: "pointer" }}>Teams</Link>
                                        </Menu.Item>
                                        <Menu.Item onClick={this.toggleVisibility}>
                                            <Icon name="close" />
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