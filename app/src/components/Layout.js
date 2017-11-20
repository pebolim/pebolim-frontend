import React from 'react';
import {Link} from "react-router";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import '../styles/layout.css'

export default class Layout extends React.Component {
    constructor(){
        super();
    }
    
    render(){
        console.log(this.props)
        return (
            <div id="wrapper">
                <Header />
                <div id="content" className="default">
                    <Main />
                </div>
                <Footer />
            </div> 
        );
    }

}    