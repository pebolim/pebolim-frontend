import React from 'react';

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import '../styles/layout.css'

export default class Layout extends React.Component {
    
    render(){
        return (
            <div id="wrapper">
                <Header />
                <div id="content">
                    <Main />
                </div>
                <Footer />
            </div> 
        );
    }

}    