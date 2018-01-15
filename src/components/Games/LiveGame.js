import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import Stopwatch from '../Utils/Stopwatch.js';
import Team from '../Teams/Team.js';
import '../../styles/live-game.css';


//TODO:
// tempo de fim de jogo (guardar como deve ser)
// substituir a admin board para malta que não é admin

export default class LiveGame extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            state: 2,
            user: null,
            game_details: null,
            lobby_id : this.props.match.params.id, 
            redirect: false,
            goals: [],
            players: [],
            teams: []
        };

        this.handleGoalClick = this.handleGoalClick.bind(this);
        this.finishGame = this.finishGame.bind(this); 
    }

    componentDidMount(){
        this.setState({ user: JSON.parse(localStorage.getItem("user"))});  
        
        var headers = new Headers({
            "Authorization":localStorage.getItem("token"),
            'Content-Type': 'application/json'
        });
        this.getGameDetails(headers);
        this.getPlayers(headers);
    }

    getTime(){
        var time = document.getElementById('timer').innerHTML;
        return time.substring(0, time.indexOf(':'));
    }
    render(){
        const { redirect, game_details, teams, players, goals, state } = this.state;

        //&& goals.sort(function(a,b) {return b.time - a.time}); //descendente .reverse()
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
                                                <Stopwatch start_time={game_details? game_details.start_date : null} finished_time={game_details? game_details.finish_date : null}/>
                                            </div>           
                                        </div>
                                        <div className="game-board-state-box">
                                            <div className="game-board-state">
                                                <GameState state={state} />
                                            </div>
                                        </div>   
                                    </div>
                                    <div className="game-board-info-box">
                                        <div className="game-board-team team-red">
                                            <Team name={game_details? teams[0].name : null} team_side="Red"/>                                         
                                        </div>
                                        <div className="game-board-result">
                                            <div className="game-results">
                                                <div>{this.displayResult()}</div>
                                            </div>  
                                            <div className="game-date">{game_details? new Date(game_details.match_day).toDateString() : null}</div> 
                                            <div className="game-local">{game_details? game_details.local : null}</div>
                                           
                                        </div>    
                                        <div className="game-board-team team-blue" >
                                            <Team name={game_details? teams[1].name : null} team_side="Blue"/>                                     
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
                                {  goals.map((goal, index) => {
                                    return <Goal key={index} name={players[goal.user].nickname} time={goal.time} side={players[goal.user].team == teams[0].id? 0 : 1} />
                                })  }   
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
                                    goalClick={this.handleGoalClick}
                                    teams={this.state.teams} 
                                />
                
                            </div>
                            <div className="game-finish-button-wrapper">
                                <button className="game-finish-button" onClick={this.finishGame}
                                 disabled={state == 3? "disabled": ""}
                                 style={(state == 3? {opacity: 0.6}:{})}>    Finish Game</button>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid> 
        );
    }
    
    displayResult(){
        const {players, goals, teams} = this.state;
        var team1 = 0, team2= 0;

        if(goals && teams.length > 0){
            goals.forEach(function (goal){
                teams[0].id === players[goal.user].team? team1++: team2++;
                
            })
            return team1 + ' - ' + team2;
        } else
            return "0 - 0";
    }

    handleGoalClick(e, team, player){
        e.preventDefault();
        var time = this.getTime();
        var self = this;

        fetch('http://127.0.0.1:3000/game/'+this.state.lobby_id+'/goal', {
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({time: time, user: player}) 
        }).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data)
            if(data.status === 201)
                self.addGoal(player, time);             
        });      
    }


    addGoal(player, time){
        console.log('goal added!')
        const goals = this.state.goals;
        goals.unshift({user: player, time: parseInt(time)});
        
        this.setState({ goals: goals})     
    }

    getPlayers(headers){
        var self = this;

        fetch('http://127.0.0.1:3000/game/'+this.state.lobby_id+'/players',{
            method: 'GET',
            headers: headers
        })
        .then(result=>result.json())
        .then(result=>{
            var players = {};
            if(result.status === 200)
                result.teams.forEach( team => {
                    if(team.players){
                        for(let i=0;i<team.players.length; i++){
                            var player = team.players[i];
                            player["team"]=team.id;
                            players[player.id] = player;
                        }
                    }
                });
            console.log(players)    
            this.setState({ players: players }); 
        })
        
    }

    getGameDetails(headers){
        fetch(`http://localhost:3000/game/`+this.state.lobby_id,{
            method: 'GET',
            headers: headers
        })
        .then(result => result.json())
        .then(game_details => {     
            this.setState({ game_details: game_details.game, teams: game_details.game.teams, goals: game_details.game.goals.reverse(), state: game_details.game.state});
            console.log(game_details);
        })
    }

    finishGame(e){
        e.preventDefault();

        var self = this;
        fetch('http://127.0.0.1:3000/game/'+this.state.lobby_id+'/finish', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data)
            //depois de feito faz redirect para a home page (mais tarde a pagina principal do user)
            if(data.status === 200)
                //data.finish_date
                self.setState({ state: 3})            
        });   
    }
}

const Goal = props => {
    return <div className={props.side === 0? "left-side-goal": "right-side-goal"}>
        <div> 
            <FontAwesome className='fa fa-futbol-o' name="ball" size='lg' />
            <span>{props.time}' {props.name}</span>
        </div>
    </div>
    
    
}

const GameState = props => {
    console.log(props.state)
    return (
        <div>
            {props.state === 3? 
                <div className="game-finished"> <div></div><span>Finished</span></div>
                :
                <div className="game-live"> <div></div><span>Live</span></div>     
            }
        </div>
    );
}

const GoalsBoard = props => {
        return (
            <div className="game-goals-selection">
                {(props.players && props.teams.length > 0) && <TeamGoalSelection side={0} {...props}/>}
                {(props.players && props.teams.length > 0) && <TeamGoalSelection side={1} {...props}/>}
            </div>
        );
}

// team, player, time
const TeamGoalSelection = props =>{
    var defaultNames=["RED TEAM","BLUE TEAM"];   
    var players = props.players;
    var teams = props.teams;

    return( 
        <div>
            <div className="game-team-separator">{teams[props.side].name == null? defaultNames[props.side]:teams[props.side].name}</div>
            <div className="game-players-wrapper">
                { Object.keys(players).map((key, index) => {
                    if(players[key].team != teams[props.side].id) return ;
                    return <PlayerButton id={players[key].id} key={players[key].id} name={players[key].nickname} team={props.side} {...props}/>
                }) }  
            </div>
        </div> 
    ); 
}

const PlayerButton = props => {
    var defaultColors=["player-red","player-blue"]
    // style={(props.first? {marginRight: 4+'%'}:{})}
    return(
        <button className={"game-player "+defaultColors[props.side]} onClick={(e) => props.goalClick(e, props.team, props.id)} >
            {props.name}
        </button>
    );
}