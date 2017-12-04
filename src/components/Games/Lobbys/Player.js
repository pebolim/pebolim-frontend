import React from 'react';
import FontAwesome  from 'react-fontawesome';

import '../../../styles/lobby-player.css';

export default class Player extends React.Component {
    constructor(props) {
        super(props)
  
        this.state = { 
            isHovering: false
        };

        this.handleMouseHover = this.handleMouseHover.bind(this);  
    }

    handleMouseHover() {
        this.setState(
            {isHovering: !this.state.isHovering}
        );
    }

    render(){    
        var player = this.props.player;

        var background;
        if(player != null) 
            background = { backgroundImage: "url('"+player.image_url+"')"}

        return (          
            <div className="player-box">          
                <div style={background} className="player_hover" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                    {
                        this.state.isHovering &&
                        <svg className="join-icon" viewBox="0 0 52 52" id="icon" onClick={() => this.props.onClick()}>
                            <g>
                                <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" fill="#FFFFFF"/>
                                <path d="M38.5,25H27V14c0-0.553-0.448-1-1-1s-1,0.447-1,1v11H13.5c-0.552,0-1,0.447-1,1s0.448,1,1,1H25v12c0,0.553,0.448,1,1,1   s1-0.447,1-1V27h11.5c0.552,0,1-0.447,1-1S39.052,25,38.5,25z" fill="#FFFFFF"/>
                            </g>
                        </svg>                       
                    }
                    {   
                        (!this.state.isHovering && player == null) &&
                            <div className="player-number">{this.props.position}</div>
                    }
                            
                </div>
                <div className="player-name">
                    {   
                        (player != null) && <div>{player.nickname}</div>
                    }
                </div> 
            </div>
        );
    } 
}
