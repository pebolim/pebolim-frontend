import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import Stopwatch from '../Utils/Stopwatch.js';
import Team from '../Teams/Team.js';
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
            result2: 0,
            goals: [],
            players: []
        };

        this.handleGoalClick = this.handleGoalClick.bind(this); 
    }
    componentDidMount(){
        this.state.user = localStorage.getItem("user");
        
        var headers = new Headers({
            "Authorization":localStorage.getItem("token"),
            'Content-Type': 'application/json'
        });
        this.getGameDetails(headers);
        this.getPlayers(headers);
    }

    render(){
        const { redirect, game_details } = this.state;
        
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
                                                <Stopwatch start_time={game_details? game_details.start_date : null}/>
                                            </div>           
                                        </div>
                                        <div className="game-board-state-box">
                                            <div className="game-board-state">Live</div>
                                        </div>   
                                    </div>
                                    <div className="game-board-info-box">
                                        <div className="game-board-team team-red">
                                            <Team name={game_details? game_details.teams[0].name : null} team_side="Red"/>                                         
                                        </div>
                                        <div className="game-board-result">
                                            <div className="game-results">
                                                <div>{game_details? game_details.result1 +' - '+game_details.result2 : "0 - 0"}</div>
                                            </div>  
                                            <div className="game-date">{game_details? new Date(game_details.match_day).toDateString() : null}</div> 
                                            <div className="game-local">{game_details? game_details.local : null}</div>
                                           
                                        </div>    
                                        <div className="game-board-team team-blue" >
                                        <Team name={game_details? game_details.teams[1].name : null} team_side="Blue"/>                                     
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
                                <div className="left-side-goal">
                                    <div> 
                                        <FontAwesome className='fa fa-futbol-o' name="ball" size='lg' />
                                         87' Luis Nunes
                                    </div>
                                </div>
                                <div className="right-side-goal"></div>
                            </div>
                        </div>

                    </Grid.Column>
                    <Grid.Column width={4} className="game-control-box">
                        <div className="game-control-content">
                            <div className="game-control-title">
                                <div>Admin Board</div>
                            </div>
                            <div className="game-commands">
                                <GoalsBoard 
                                    players={this.state.players} 
                                    onClick={() => this.handleGoalClick}
                                />
                
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
    
    handleGoalClick(e, team, player, time){
        e.preventDefault();
        console.log('ola')
        var self = this;
        fetch('http://127.0.0.1:3000/game/'+this.state.lobby_id+'/goal', {
            method: 'POST',
            headers: {
                "Authorization":localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({time: 23, user: 32}) 
        }).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data)
            //depois de feito faz redirect para a view do live game
            if(data.status === 201)
                this.addGoal();             
        });      
    }


    addGoal(){
        console.log('ola2')
        
        // var goals = this.state.goals.slice();
        // goals.push({side: 0, minute: 0, player_name:''});
        // this.setState({ goals: goals})
    }

    getPlayers(headers){
        var self = this;

        fetch('http://127.0.0.1:3000/game/'+this.state.lobby_id+'/players',{
            method: 'GET',
            headers: headers
        })
        .then(result=>result.json())
        .then(result=>{
            var players = [];
            if(result.status === 200)
                result.teams.forEach( team => {
                    if(team.players != null){
                        for(let i=0;i<2; i++)
                            players.push({team: team.id, player: team.players[i]});
                    }
                });
                this.setState({ players: players },() =>{ console.log(this.state.players)}); 
        })
        
    }

    getGameDetails(headers){
        fetch(`http://localhost:3000/game/`+this.state.lobby_id,{
            method: 'GET',
            headers: headers
        })
        .then(result => result.json())
        .then(game_details => {
            this.setState({ game_details: game_details.game });
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

const GoalsBoard = props => {
    
    /*
    for(let i=0;i<2; i++){
        <button className="game-player player-red" onClick={this.handleGoalClick}>legend27</button>
        <div className="space"></div>
        <button className="game-player player-red" onClick={this.handleGoalClick}>olajohneewee15</button>
    }
    */

    return(
        <div className="game-goals-selection">
            <div className="game-team-separator">RED TEAM</div>
            <div className="game-players-wrapper">
                { }

                
                
            </div>
            <div className="game-team-separator">BLUE TEAM</div>
            <div className="game-players-wrapper">
                <button className="game-player player-blue" onClick={this.handleGoalClick}>rakan</button>
                <div className="space"></div>
                <button className="game-player player-blue" onClick={this.handleGoalClick}>vlad</button>
            </div>
        </div>
    );
}