import React from 'react';
import Player from './Player';
import '../../../styles/lobby.css';
import { Grid } from 'semantic-ui-react';

//import { Grid ,Col , Row} from 'react-bootstrap';

export default class PlayerLobby extends React.Component {
    constructor(props) {
        super(props)

        var lobby_id = this.props.match.params.id;

        var user = {
            id: 1,
            image_url: "http://blog.opovo.com.br/portugalsempassaporte/wp-content/uploads/sites/42/2013/07/Scolari.jpg",
            nickname: "yEPZ"
        };

        this.state = {
            user: user,
            lobby_id: lobby_id,
            players: Array(4).fill(null)
        };

        this.handleJoinTeamClick = this.handleJoinTeamClick.bind(this);     
        this.sendPosition = this.sendPosition.bind(this);     
    }

    componentDidMount(){
        this.getLobbyPlayers();
    }

    getLobbyPlayers(){
        fetch('http://127.0.0.1:3000/game/'+this.state.lobby_id+'/players')
        .then(result=>result.json())
        .then(result=>{
            this.setState({players: result.players});
            console.log(this.state.players[0])
        })
    }

    changePosition(index){
        console.log(index)
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

    handleJoinTeamClick(i){   
        if(this.state.players[i] == null)
            this.sendPosition(i);
    }

    sendPosition(position) {   
        var self = this;
        fetch('http://127.0.0.1:3000/game/join/'+self.state.lobby_id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id: self.state.user.id, position: position})
        }).then(function(response){
            return response.json();
        }).then(function(body){
            console.log(body)
            if(body.status === 200)
                self.changePosition(position)    
               
        });
    }

    renderPlayer(index){
        return(
            <Player position={index+1} 
                player={this.state.players[index]} 
                onClick={() => this.handleJoinTeamClick(index)}
            />                           
        );
    }

    render() {
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
                                            {this.renderPlayer(0)}                                       
                                        </div>   
                                        <div className="defender">
                                            {this.renderPlayer(1)}  
                                        </div>
                                    </div>                                   
                                </Grid.Column>
                                <Grid.Column width={4} className="lobby-selection-details">
                                
                                </Grid.Column>
                                <Grid.Column width={6} className="team-blue">
                                    <div className="team-box">
                                        <div className="header"><div>BLUE TEAM</div></div>
                                        <div className="attacker">
                                            {this.renderPlayer(2)}                                      
                                        </div>   
                                        <div className="defender">
                                            {this.renderPlayer(3)}  
                                        </div>
                                    </div> 
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>  
                    </Grid.Column>
                    <Grid.Column width={4} className="lobby-details-box">
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>      
        );
    }
}

const Hover = ({ onHover, children }) => (
    <div className="hover">
        <div className="hover__no-hover">{children}</div>
        <div className="hover__hover">{onHover}</div>
    </div>
)

