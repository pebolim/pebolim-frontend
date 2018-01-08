import React from 'react';
import Player from './Player';
import { Grid } from 'semantic-ui-react';

import '../../../styles/lobby.css';

export default class PlayerLobby extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.state

        this.sendPosition = this.sendPosition.bind(this);
    }

    render_player(team_ref, player_ref) {
        if (team_ref === 1)
            return (
                <Player player={this.state.red_team.players[player_ref]}
                    onClick={() => this.sendPosition(this.state.red_team.id, 0)}
                />
            );
        else
            return (
                <Player player={this.state.blue_team.players[player_ref]}
                    onClick={() => this.sendPosition(this.state.blue_team.id, 1)}
                />
            );
    }

    sendPosition(team_id, team) {
        if (this.state.my_team == team) {
            fetch('http://127.0.0.1:3000/game/' + this.state.lobby_id + '/leaveuser', {
                method: 'PUT',
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: this.state.user.id, teamid: team_id })
            })
                .then(res => res.json())
                .then(result => {
                    if (result.status === 200)
                        this.leaveTeam(team)
                });
        } else {
            fetch('http://127.0.0.1:3000/game/' + this.state.lobby_id + '/joinuser', {
                method: 'PUT',
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: this.state.user.id, teamid: team_id })
            })
                .then(res => res.json())
                .then(result => {
                    if (result.status === 200)
                        this.changeTeam(team)
                });
        }
    }

    leaveTeam(team){
        if (team===0) {
            this.state.red_team.players.forEach((player, index, object) => {
                if (player.id === this.state.user.id) object.splice(index, 1);
            });
        }else{
            this.state.blue_team.players.forEach((player, index, object) => {
                if (player.id === this.state.user.id) object.splice(index, 1);
            });
        }
        this.setState({ my_team: -1 });
        this.forceUpdate();
    }

    changeTeam(team) {
        if (team===0) {
            if (this.state.my_team === 1) {
                this.state.blue_team.players.forEach((player, index, object) => {
                    if (player.id === this.state.user.id) object.splice(index, 1);
                });
            }
            this.state.red_team.players.push(this.state.user);
            this.setState({ my_team: 0 });
        } else {
            if (this.state.my_team === 0) {
                this.state.red_team.players.forEach((player, index, object) => {
                    if (player.id === this.state.user.id) object.splice(index, 1);
                });
            }
            this.state.blue_team.players.push(this.state.user);
            this.setState({ my_team: 1 });
        }
        this.forceUpdate();
    }

    render() {
        const { red_team, blue_team, my_team } = this.state;

        return (
            <Grid columns={3}>
                <Grid.Row stretched className="lobby-selection-columns">
                    <Grid.Column width={6}>
                        <div className="loby-team-box">
                            <div className="loby-header team-red"><div>RED TEAM</div></div>
                            <div className="loby-player">
                                {this.render_player(1, 0)}
                            </div>
                            {(red_team.players.length == 2 || (red_team.players.length > 0 && my_team != 0)) &&
                                <div className="loby-player">
                                    {this.render_player(1, 1)}
                                </div>
                            }
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4} className="lobby-selection-details">
                        <div className="loby-team-box">
                            <div className="loby-versus">VS</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <div className="loby-team-box">
                            <div className="loby-header loby-team-blue"><div>BLUE TEAM</div></div>
                            <div className="loby-player">
                                {this.render_player(2, 0)}
                            </div>
                            {(blue_team.players.length > 1 || (blue_team.players.length > 0 && my_team != 1)) &&
                                <div className="loby-player">
                                    {this.render_player(2, 1)}
                                </div>
                            }
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
}


