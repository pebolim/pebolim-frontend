import React from 'react';
import FontAwesome  from 'react-fontawesome';
import ReactHoverObserver from 'react-hover-observer';

import '../../../styles/lobby-player.css';

export default class Player extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
            isHovering: false
        };
        this.onHoverChanged = this.onHoverChanged.bind(this);
        this.joinTeam = this.joinTeam.bind(this);
        // this.handleChange = this.handleChange.bind(this);     
    }

    joinTeam(){
        console.log("clicked")
    }

    onHoverChanged({ isHovering }) {
        this.setState({
          isHovering
        });

    }

    render(){      
        return ( 
            <div className="player-box">
                <ReactHoverObserver className="player_hover" onHoverChanged={this.onHoverChanged}>
                    <div className="player-number">{this.props.position}</div>
                    
                        <svg className="join-icon" viewBox="0 0 52 52" id="icon" onClick={this.joinTeam}>
                            <g>
                                <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" fill="#FFFFFF"/>
                                <path d="M38.5,25H27V14c0-0.553-0.448-1-1-1s-1,0.447-1,1v11H13.5c-0.552,0-1,0.447-1,1s0.448,1,1,1H25v12c0,0.553,0.448,1,1,1   s1-0.447,1-1V27h11.5c0.552,0,1-0.447,1-1S39.052,25,38.5,25z" fill="#FFFFFF"/>
                            </g>
                        </svg>
                   
                </ReactHoverObserver>

                <div className="player-name">
                    <div>Luis Nunes</div>
                </div> 
            </div>
        );
    } 
}
