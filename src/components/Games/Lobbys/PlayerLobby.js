import React from 'react';
import { Redirect } from 'react-router';
import Player from './Player';
import { Grid } from 'semantic-ui-react';

import '../../../styles/lobby.css';

export default class PlayerLobby extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            game_details: null,
            lobby_id : this.props.match.params.id, 
            players: Array(4).fill(null),
            redirect: false
        };

        this.redirectToGameView = this.redirectToGameView.bind(this); 
        this.handleJoinTeamClick = this.handleJoinTeamClick.bind(this);     
        this.sendPosition = this.sendPosition.bind(this);     
    }

      
    componentDidMount(){
        this.state.user = JSON.parse(localStorage.getItem("user"));
        //console.log(this.state)
        var headers = new Headers({
            "Authorization":localStorage.getItem("token"),
            'Content-Type': 'application/json'
        });
        this.getGameDetails(headers);
        this.getLobbyPlayers(headers);
    }

    getGameDetails(headers){
        fetch(`http://localhost:3000/game/`+this.state.lobby_id,{
            method: 'GET',
            headers: headers
        })
        .then(result => result.json())
        .then(game_details => {
            console.log(game_details)
            if(game_details.status === 200)
                this.setState({ game_details: game_details.game });
    
        })
    }

    getLobbyPlayers(headers){
        fetch('http://127.0.0.1:3000/game/'+this.state.lobby_id+'/players',{
            method: 'GET',
            headers: headers
        })
        .then(result=>result.json())
        .then(result=>{
            //console.log(result.teams)
            var players = this.state.players.slice();
            players = [];
            if(result.status === 200)
                result.teams.forEach( team => {
                    console.log(team)
                    if(team.players != null)
                        team.players.forEach(player => {
                            players.push(player);
                        });
                });
            this.state.players = players; 
            console.log(this.state.players)  
        })
    }


    changePosition(index){
        //console.log(index)
        var elements = this.state.players;
        for(let i =0; i< elements.length; i++){
            if(elements[i] != null && elements[i].id === this.state.user.id)
                elements[i] = null;
        }

        const players = this.state.players.slice();
        players[index] = this.state.user;
        this.setState({players: players});
        console.log(this.state.players)
    }   

    handleJoinTeamClick(position, team){   
        console.log(position, team)
        if(this.state.players[position] == null)
            this.sendPosition(position, team);
    }

    sendPosition(position, team) {   
        var self = this;
        fetch('http://127.0.0.1:3000/game/'+this.state.lobby_id+'/join', {
            method: 'PUT',
            headers: {
                "Authorization":localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: self.state.user.id, teamid: team})
        }).then(function(response){
            return response.json();
        }).then(function(body){
            console.log(body)
            if(body.status === 200)
                self.changePosition(position)    
               
        });
    }

    renderPlayer(position, team){
        return(
            <Player position={position+1} 
                player={this.state.players[position]} 
                onClick={() => this.handleJoinTeamClick(position, team)}
            />                           
        );
    }

    redirectToGameView(){
        //fazer update do jogo: colocar a hora de inicio, mudar o state do jogo para ingame, 
        //colocar o lock em true(bloqueia mudanças no lobby)
        var self = this;
        fetch('http://127.0.0.1:3000/game/'+this.state.lobby_id+'/start', {
            method: 'PUT',
            headers: {
                "Authorization":localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: self.state.user.id}) //state 2 -> in game
        }).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data)
            //depois de feito faz redirect para a view do live game
            if(data.status === 200)
                self.setState({ redirect: true})   
               
        });   
    }

    render() {
        const { redirect, game_details } = this.state;
        
        if (redirect) {
            return <Redirect to={"/game/"+this.state.lobby_id+"/live"} />;
        }

        return ( 
            <Grid columns={2} className="lobby-container">
                <Grid.Row stretched className="clear">
                    <Grid.Column width={12} className="lobby-selection-box">
                        <Grid columns={3} className="clear">
                            <Grid.Row stretched className="clear lobby-selection-columns">
                                <Grid.Column width={6} className="team-red">
                                    <div className="team-box">
                                        <div className="header"><div>RED TEAM</div></div>
                                        <div className="attacker">
                                            {game_details && this.renderPlayer(0, game_details.teams[0].id)}                                 
                                        </div>   
                                        <div className="defender">
                                            {game_details && this.renderPlayer(1, game_details.teams[0].id)}
                                        </div>
                                    </div>                                   
                                </Grid.Column>
                                <Grid.Column width={4} className="lobby-selection-details">
                                    <div className="team-box">
                                    
                                        <div className="attacker-tag">
                                            {/* <div>attacker</div> */}
                                        </div>
                                        <div className="versus">
                                            <div>VS</div>
                                        </div>
                                        <div className="defender-tag">
                                            {/* <div>defender</div> */}
                                        </div>
                                    </div> 
                                </Grid.Column>
                                <Grid.Column width={6} className="team-blue">
                                    <div className="team-box">
                                        <div className="header"><div>BLUE TEAM</div></div>
                                        <div className="attacker">
                                            {game_details && this.renderPlayer(2, game_details.teams[1].id)}                                    
                                        </div>   
                                        <div className="defender">
                                            {game_details && this.renderPlayer(3, game_details.teams[1].id)}
                                        </div>
                                    </div> 
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>  
                    </Grid.Column>
                    <Grid.Column width={4} className="lobby-info-box">
                        <div className="lobby-info">
                            <div className="lobby-info-title">
                                <div>Game Details</div>
                            </div>
                            <div className="lobby-info"></div>
                            <div className="lobby-begin-button-wrapper">
                                <button className="lobby-begin-button" onClick={this.redirectToGameView}>Start Game</button>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>      
        );
    }
}


