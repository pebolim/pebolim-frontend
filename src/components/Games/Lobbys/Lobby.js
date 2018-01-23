import React from 'react';
import PlayerLobby from './PlayerLobby';
import TeamLobby from './TeamLobby';
import { Grid, Icon } from 'semantic-ui-react';
import Time from 'react-time-format';
import { Redirect } from 'react-router';

import '../../../styles/lobby.css';

export default class Lobby extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            game_details: null,
            lobby_id: this.props.match.params.id,
            red_team: [],
            blue_team: [],
            load: 0,
            redirect: false,
            my_team: -1,
            message: ""
        };

        this.redirectToGameView = this.redirectToGameView.bind(this);
        this.render_start_button = this.render_start_button.bind(this);
    }

    componentDidMount() {
        this.getGameDetails();
    }

    getGameDetails() {
        fetch(`http://localhost:3000/game/` + this.state.lobby_id +`/details`, {
            method: 'GET',
            headers: new Headers({
                "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status === 200) {
                    this.setState({
                        game_details: result.game,
                        red_team: result.game.teams[0],
                        blue_team: result.game.teams[1]
                    });
                    this.set_team();
                } else {
                    this.setState({ message: result.message });
                }
                this.setState({ load: result.status });
                console.log(this.state.game_details)
            })
    }

    set_team() {
        let flag = true;
        if (this.state.red_team!==undefined)
            this.state.red_team.players.forEach(player => {
                if (player.id === this.state.user.id) {
                    this.setState({ my_team: 0 });
                    flag = false;
                }
            });
        if (this.state.blue_team!== undefined)
            if (flag) {
                this.state.blue_team.players.forEach(player => {
                    if (player.id === this.state.user.id)
                        this.setState({ my_team: 1 });
                });
            }
    }

    render_start_button() {
        if (this.state.user.id == this.state.game_details.owner_id) {
            if (this.state.red_team!==undefined &&
                this.state.blue_team!==undefined && 
                this.state.blue_team.players.length === 2 && 
                this.state.red_team.players.length === 2
            ) {
                return (<button className="lobby-begin-button" onClick={this.redirectToGameView}>Start Game</button>);
            }
            else {
                return (<button className="lobby-begin-button" disabled onClick={this.redirectToGameView}>Start Game</button>);
            }
        }
    }

    redirectToGameView() {
        var self = this;
        fetch('http://127.0.0.1:3000/game/' + this.state.lobby_id + '/start', {
            method: 'PUT',
            headers: {
                "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: self.state.user.id }) //state 2 -> in game
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
            //depois de feito faz redirect para a view do live game
            if (data.status === 200)
                self.setState({ redirect: true })
        });
    }

    render() {
        const { redirect, load, game_details, message } = this.state;

        if (redirect) {
            return <Redirect to={"/game/" + this.state.lobby_id + "/live"} />;
        }
        if (load === 0) {
            return (<div>LOADING</div>);
        } if (load !== 200) {
            return (<div><h2>ERROR</h2><h4>{message}</h4></div>);
        }

        const state_to_send = {
            user: this.state.user,
            lobby_id: this.state.lobby_id,
            red_team: this.state.red_team,
            blue_team: this.state.blue_team,
            redirect: false,
            my_team: this.state.my_team
        }

        return (
            <Grid columns={2} className="lobby-container">
                <Grid.Row stretched>
                    <Grid.Column width={12} className="lobby-selection-box">

                        {!game_details.to_teams && <PlayerLobby state={state_to_send} />}
                        {game_details.to_teams && <TeamLobby state={state_to_send} />}

                    </Grid.Column>
                    <Grid.Column width={4}>
                        <div className="lobby-info-lock">
                            {game_details.is_private && <Icon name='lock' />}
                            {!game_details.is_private && <Icon name='unlock' />}
                        </div>
                        <div className="lobby-info-title">
                            <h2>Game Details</h2>
                        </div>
                        <div className="lobby-info">
                            <label>Created by</label>
                            <br />
                            <p className="lobby-info-text">{this.state.game_details.owner_name}</p>
                            <label>Local</label>
                            <br />
                            <p className="lobby-info-text">{this.state.game_details.local}</p>
                            <label>Match day</label>
                            <br />
                            <p className="lobby-info-text"><Time value={this.state.game_details.match_day} format="YYYY/MM/DD" /></p>
                            <label>Match hour</label>
                            <br />
                            <p className="lobby-info-text"><Time value={this.state.game_details.match_day} format="hh:mm" /></p>
                        </div>
                        <div className="lobby-begin-button-wrapper">
                            {this.render_start_button()}
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}