import React from 'react';

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import '../styles/layout.css'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

export default class Layout extends React.Component {
    
    render(){
        return (
            <div id="wrapper">
                <Header />
                <div id="content">
                <NotificationContainer />
                    <Main />
                </div>
                <Footer />
            </div> 
        );
    }

}    