import React from 'react';
import Player from './Player';
import { Grid } from 'semantic-ui-react';

import '../../../styles/lobby.css';

export default class TeamLobby extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.state

        this.sendPosition = this.sendPosition.bind(this);
    }

    render_player(team_ref, player_ref) {
        if (team_ref === 1)
            return (
                <Player player={this.state.red_team.players[player_ref]}
                    onClick={() => this.sendPosition(this.state.red_team.id)}
                />
            );
        else
            return (
                <Player player={this.state.blue_team.players[player_ref]}
                    onClick={() => this.sendPosition(this.state.blue_team.id)}
                />
            );
    }

    sendPosition(team_id) {
        fetch('http://127.0.0.1:3000/game/' + this.state.lobby_id + '/join', {
            method: 'PUT',
            headers: {
                "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: this.state.user.id, teamid: team_id })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status === 200)
                    this.changeTeam(team_id)
            });
    }

    changeTeam(team_id) {
        //console.log(index)
        if (this.state.red_team.id === team_id) {
            let flag = true;
            this.state.red_team.players.forEach(player => {
                if (player.id === this.state.user.id) flag = false;
            });
            if (flag) {
                this.state.blue_team.players.forEach((player, index, object) => {
                    if (player.id === this.state.user.id) object.splice(index, 1);
                });
                this.state.red_team.players.push(this.state.user);
            }
        } else {
            let flag = true;
            this.state.blue_team.players.forEach(player => {
                if (player.id === this.state.user.id) flag = false;
            });
            if (flag) {
                this.state.red_team.players.forEach((player, index, object) => {
                    if (player.id === this.state.user.id) object.splice(index, 1);
                });
                this.state.blue_team.players.push(this.state.user);
            }
        }
        this.forceUpdate();
    }

    render() {
        const { red_team, blue_team } = this.state;

        return (
            <Grid columns={3} className="clear">
                <Grid.Row stretched className="clear lobby-selection-columns">
                    <Grid.Column width={6} className="team-red">
                        <div className="team-box">
                            <div className="header"><div>RED TEAM</div></div>
                            <div className="player">
                                {this.render_player(1, 0)}
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4} className="lobby-selection-details">
                        <div className="team-box">
                            <div className="versus">VS</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={6} className="team-blue">
                        <div className="team-box">
                            <div className="header"><div>BLUE TEAM</div></div>
                            <div className="player">
                                {this.render_player(2, 0)}
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
}