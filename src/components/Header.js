import React from 'react';
import {Link} from "react-router-dom";
import { Flag, Button, Icon, Image } from 'semantic-ui-react';


import '../styles/header.css';

export default class Header extends React.Component{
    render(){
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
                    <ul className="nav-right">
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                        <Button icon>
                            <Flag name='pt'/>
                        </Button>
                        <Button icon>
                        <Flag name='gb'/>
                        </Button>
                    </ul>
                </div>
            </header>
        );
    }
}