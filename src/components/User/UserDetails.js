import React from 'react';
import Time from 'react-time-format';
import { Container, Header, Grid, Image, Label, Icon, Loader, Dimmer, Button } from 'semantic-ui-react';
import GamesByUser from '../Games/GamesByUser'
import ListTeam from '../Teams/ListTeams'

export default class UserDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
            },
            loading: true
        };
    }

    componentDidMount() {
        var headers = new Headers({
            "Authorization": localStorage.getItem("token"),
            'Content-Type': 'application/json'
        });
        var myInit = {
            method: 'GET',
            headers: headers
        }
        fetch(`http://localhost:3000/player`, myInit)
            .then(result => result.json())
            .then(usr => this.setState({ user: usr.user }))
        this.setState({ loading: false })

    }

    render() {
        const loading = this.state.loading;
        if (loading) {
            return (
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            )
        } else {
            return (
                <div>
                    <Header id="title" style={{ textAlign: 'left', paddingBottom: 20, fontSize: 50 }}>{this.state.user.nickname}'s profile</Header>
                    <Grid>
                        <Grid.Column width={4} >
                            <Grid.Column style={{ backgroundColor: '#353535', paddingTop: 15, paddingLeft: 10,paddingRight:10 }}>
                                <Image src={require('../../assets/images/datboy.png')} centered />
                                <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                                    {this.state.user.nickname}
                                </div>
                                <Grid.Row style={{ fontSize: 16, fontWeight: 600, paddingBottom: 10, paddingTop: 15 }}>
                                    Email:
                            </Grid.Row>
                                <Grid.Row style={{ fontSize: 20, paddingBottom: 15, paddingLeft: 5 }}>
                                    {this.state.user.email}
                                </Grid.Row>
                                <Grid.Row style={{ fontSize: 16, fontWeight: 600, paddingBottom: 10 }}>
                                    Age:
                            </Grid.Row>
                                <Grid.Row style={{ fontSize: 20, paddingBottom: 15, paddingLeft: 5 }}>
                                    {this.state.user.age}
                                </Grid.Row>
                            </Grid.Column>
                            <Button fluid>Change Profile</Button>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <GamesByUser />
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Grid.Column >
                                <ListTeam />
                            </Grid.Column>
                        </Grid.Column>
                    </Grid>
                </div>
            );
        }
    }
}