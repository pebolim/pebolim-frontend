import React from 'react';
import { Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import Stopwatch from '../Utils/Stopwatch.js';

import '../../styles/live-game.css';

export default class LiveGame extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            user: null,
            game_details: null,
            lobby_id : this.props.match.params.id, 
            redirect: false,
            result1: 0,
            result2: 0
        };
    }
    componentDidMount(){
        this.state.user = localStorage.getItem("user");
        
        var headers = new Headers({
            "Authorization":localStorage.getItem("token"),
            'Content-Type': 'application/json'
        });
        this.getGameDetails(headers);
    }

    render(){
        const { redirect } = this.state;
        
        if (redirect) {
            return <Redirect to={"/home"} />;
        }

        return (
            <Grid columns={2} className="game-container">
                <Grid.Row stretched className="clear">
                    <Grid.Column width={12} className="game-main-box">
                        <div className="game-board">
                            <div className="game-board-container">
                                <div className="game-board-content">
                                    <div className="game-board-timer-box">
                                        <div className="game-board-timer-wrapper"> 
                                            <div className="game-board-timer">
                                                <Stopwatch start_time={this.state.game_details? this.state.game_details.start_date : new Date().getTime()}/>
                                            </div>           
                                        </div>
                                        <div className="game-board-state-box">
                                            <div className="game-board-state">Live</div>
                                        </div>   
                                    </div>
                                    <div className="game-board-info-box">
                                        <div className="game-board-team team-red">
                                            <div className="game-board-team-wrapper">
                                                <div className="team-box">
                                                    <div className="team-image">
                                                        {/* ver se a equipa tem imagem {this.props.team_side}*/}
                                                        <div className="team-side">Red Team</div>
                                                    </div>
                                                    <div className="team-name">
                                                        <div>RAAUULLL</div>
                                                    </div>
                                                </div>
                                            </div>                                          
                                        </div>
                                        <div className="game-board-result">
                                            <div className="game-results">
                                                <div>122 - 92</div>
                                            </div>  
                                            <div className="game-date">{new Date().toLocaleDateString()}</div> 
                                            <div className="game-local">Tomar</div>
                                           
                                        </div>    
                                        <div className="game-board-team team-blue" >
                                            <div className="game-board-team-wrapper">
                                                <div className="team-box">
                                                    <div className="team-image">
                                                        {/* ver se a equipa tem imagem {this.props.team_side}*/}
                                                        <div className="team-side">Blue Team</div>
                                                    </div>
                                                    <div className="team-name">
                                                        <div>RAAGA</div>
                                                    </div>
                                                </div>
                                            </div>                                          
                                        </div>  
                                    </div>                            
                                </div>
                            </div>
                        </div>
                        <div className="game-details">
                            <div className="game-details-title">
                                <div>Goals</div>
                            </div>
                            <div className="game-details-container">
                                <div></div>
                            </div>
                        </div>

                    </Grid.Column>
                    <Grid.Column width={4} className="game-control-box">
                        <div className="game-control-content">
                            <div className="game-control-title">
                                <div>Admin Board</div>
                            </div>
                            <div className="game-commands">
                                <div className="game-goals-selection">
                                    
                                </div>
                            </div>
                            <div className="game-finish-button-wrapper">
                                <button className="game-finish-button" onClick={this.finishGame}>Finish Game</button>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid> 
        );
    }

    getGameDetails(headers){
        fetch(`http://localhost:3000/game/`+this.state.lobby_id,{
            method: 'GET',
            headers: headers
        })
        .then(result => result.json())
        .then(game_details => {
            this.setState({ game_details: game_details });
            console.log(game_details);
        })
    }

    finishGame(){
        //finalize o jogo colocar o lock em true(bloqueia mudanças no lobby); state 3 -> finish
        //enviar os resultados
        var self = this;
        fetch('http://127.0.0.1:3000/game/'+this.state.lobby_id+'/finish', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: self.state.user.id}) 
        }).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data)
            //depois de feito faz redirect para a home page (mais tarde a pagina principal do user)
            if(data.status === 200)
                self.setState({ redirect: true})   
               
        });   
    }
}