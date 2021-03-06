import React from 'react';
//import FontAwesome  from 'react-fontawesome';

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
            { isHovering: !this.state.isHovering }
        );
    }

    render() {
        var player = this.props.player;

        return (
            <div className="player-box">
                {player == null &&
                    <div className="player_hover" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                        <svg className="join-icon" viewBox="0 0 52 52" id="icon" onClick={() => this.props.onClick()}>
                            <g>
                                <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" fill="#FFFFFF" />
                                <path d="M38.5,25H27V14c0-0.553-0.448-1-1-1s-1,0.447-1,1v11H13.5c-0.552,0-1,0.447-1,1s0.448,1,1,1H25v12c0,0.553,0.448,1,1,1   s1-0.447,1-1V27h11.5c0.552,0,1-0.447,1-1S39.052,25,38.5,25z" fill="#FFFFFF" />
                            </g>
                        </svg>
                    </div>
                }
                {
                    (player != null) &&
                    <div>
                        <div style={{ backgroundImage: "url('" + player.image_url + "')" }} className="player_hover" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                            { player.id==JSON.parse(localStorage.getItem("user")).id &&
                            <svg className="cancel-icon" viewBox="0 0 52 52" id="icon" onClick={() => this.props.onClick()}>
                                <g>
                                    <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" fill="#FF0000" />
                                    <path d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0   s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36   s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293   c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z" fill="#FF0000"/>
                                </g>
                            </svg>
                            }
                        </div>
                        <div className="player-name">{player.nickname}</div>
                    </div>
                }
            </div>
        );
    }
}
