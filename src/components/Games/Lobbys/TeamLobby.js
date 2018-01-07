import React from 'react';
import Team from './Team';
import { Grid, Modal, Button, Form, Checkbox, Header } from 'semantic-ui-react';

import '../../../styles/lobby.css';

export default class TeamLobby extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.state;
        this.state.modalOpen=false; 
        this.state.teams= [];
        this.state.chosen_team=null;
        console.log(this.state)

        this.joinGame = this.joinGame.bind(this);
    }

    render_team(team_ref) {
        if (team_ref === 1)
            return (<Team player={this.state.red_team} onClick={() => this.update(0)} />);
        else
            return (<Team player={this.state.blue_team} onClick={() => this.update(1)} />);
    }

    update(team) {
        if (team === 0) {
            if (this.state.red_team === undefined) {
                this.getTeams();
            } else {
                this.leaveGame(this.state.red_team.id, team)
            }
        } else {
            if (this.state.blue_team === undefined) {
                this.getTeams();
            } else {
                this.leaveGame(this.state.blue_team.id, team)
            }
        }
    }

    getTeams() {
        fetch('http://127.0.0.1:3000/teams', {
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status === 200) {
                    this.setState({ teams: result.data });
                    this.handleOpen();
                }
            });
    }

    joinGame() {
        this.handleClose();
        console.log(this.state)
        fetch('http://127.0.0.1:3000/game/' + this.state.lobby_id + '/jointeam', {
            method: 'PUT',
            headers: {
                "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ teamid: this.state.chosen_team.id })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status === 200)
                    this.setTeam()
            });
    }

    leaveGame(team_id, team) {
        fetch('http://127.0.0.1:3000/game/' + this.state.lobby_id + '/leaveteam', {
            method: 'PUT',
            headers: {
                "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ teamid: team_id })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status === 200)
                    this.removeTeam(team)
            });
    }

    setTeam() {
        //console.log(index)
        if (this.state.red_team === undefined) {
            this.setState({ red_team: this.state.chosen_team, my_team: 0 });
        } else {
            this.setState({ blue_team: this.state.chosen_team, my_team: 1 });
        }
        this.forceUpdate();
    }

    removeTeam(team) {
        if (team === 0) {
            this.setState({ red_team: [], my_team: -1 });
        } else {
            this.setState({ blue_team: [], my_team: -1 });
        }
        this.forceUpdate();
    }

    render() {
        const { red_team, blue_team, my_team, teams, modalOpen, chosen_team } = this.state;

        if (modalOpen) {
            return (
                <Modal basic size="tiny" dimmer={'blurring'} open={this.state.modalOpen} onClose={this.handleClose} >
                    <Header content='Choose your team' />
                    <Modal.Content scrolling>
                        <Form>
                            {teams && this.state.teams.map((team, index) => (
                                <Form.Field key={`ChkboxItem_${index}`}>
                                    <Checkbox radio
                                        name='checkboxRadioGroup'
                                        value={index}
                                        onChange={this.handleChange}
                                        checked={this.state.chosen_team === team} />
                                    {team.name}
                                </Form.Field>
                            ))}
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        {chosen_team && <Button color='green' onClick={this.joinGame}>Select</Button>}
                        {chosen_team===null && <Button disabled color='green'>Select</Button>}
                    </Modal.Actions>
                </Modal>
            );
        }

        return (
            <Grid columns={3}>
                <Grid.Row stretched className="lobby-selection-columns">
                    <Grid.Column width={6}>
                        <div className="loby-team-box">
                            <div className="loby-header team-red"><div>RED TEAM</div></div>
                            <div className="loby-players">
                                {this.render_team(1)}
                            </div>
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
                            <div className="loby-players">
                                {((red_team!==undefined && blue_team!==undefined)||(red_team!==undefined && my_team===-1)) && this.render_team(2)}
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })
    handleChange = (e, { value }) => this.setState({ chosen_team: this.state.teams[value] })
}