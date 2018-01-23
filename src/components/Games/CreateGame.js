import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Redirect } from 'react-router';
import { Dropdown, Input, Button, Icon, Grid } from 'semantic-ui-react';
import {NotificationManager, NotificationContainer} from 'react-notifications'

import 'react-datepicker/dist/react-datepicker.css';

export default class CreateGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            local: '',
            is_private: '',
            hour: '',
            minutes: '',
            start_date: moment(),
            redirect: false,
            lobby_id: null,
            to_teams: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTimeHours = this.handleTimeHours.bind(this);
        this.handleTimeMinutes = this.handleTimeMinutes.bind(this);
    }

    handleTimeHours(e, data) {
        e.preventDefault();
        this.setState({ hour: data.value });
    }

    handleTimeMinutes(e, data) {
        e.preventDefault();
        this.setState({ minutes: data.value });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleChange(date) {
        this.setState({
            start_date: date
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.local!="" || this.state.hour!="" || this.state.minutes!=""){   
        console.log(JSON.stringify({ game: this.state }))
        fetch('http://127.0.0.1:3000/game/', {
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            return response.json();
        }).then(body => {
            console.log(body)
            if (body.status === 201)
                this.setState({ redirect: true, lobby_id: body.url_id })

        });
        }else{
            NotificationManager.error('Insert all fields!', "", 2000);
        }   
    }

    render() {

        const { redirect, lobby_id } = this.state;

        if (redirect) {
            return <Redirect to={"/game/" + lobby_id + "/lobby"} />;
        }

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <h1>New Game</h1>
                    </Grid.Row>
                    <Grid.Row columns={9}>
                        <Grid.Column width={3}>
                            <div>
                                <h3>Location: </h3>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Input fluid value={this.state.local} name="local" onChange={this.handleInputChange} icon='marker' placeholder='Game location...' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={9}>
                        <Grid.Column width={3}>
                            <div>
                                <h3>Game day: </h3>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <DatePicker
                                selected={this.state.start_date}
                                onChange={this.handleChange}
                                name="start_date"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={9}>
                        <Grid.Column width={3}>
                            <div>
                                <h3>Game hour: </h3>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Dropdown fluid value={this.state.hour} name="hour" onChange={this.handleTimeHours} placeholder='hour' selection options={getHours()} />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Dropdown fluid value={this.state.minutes} name="minutes" onChange={this.handleTimeMinutes} placeholder='minute' selection options={getMinutes()} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <div>
                                <h3>Private: </h3>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <div className="ui fitted toggle checkbox">
                                <input type="checkbox" name="is_private" onChange={this.handleInputChange} readOnly="" tabIndex="0" />
                                <label></label>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <div>
                                <h3>Only to teams: </h3>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <div className="ui fitted toggle checkbox">
                                <input type="checkbox" name="to_teams" onChange={this.handleInputChange} readOnly="" tabIndex="0" />
                                <label></label>
                            </div>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={5}>
                        <Grid.Column>
                            <Button fluid animated onClick={this.handleSubmit}>
                                <Button.Content visible>Next</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const getHours = () => {
    var array = [];
    for (var index = 0; index < 24; index++) {
        array.push({
            key: index,
            text: `${index + ' h'}`,
            value: index,
        });
    }
    return array;
}
const getMinutes = () => {
    var array = [];
    for (var index = 0; index < 60; index += 5) {
        array.push({
            key: index,
            text: `${index + ' min'}`,
            value: index,
        });
    }
    return array;
}