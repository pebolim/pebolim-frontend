import React from 'react';
import Time from 'react-time-format';
import { Container, Header, Grid, Image, Label, Icon } from 'semantic-ui-react';
import GamesByUser from '../Games/GamesByUser'

export default class UserDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
            }
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

    }

    render() {
        return (
            <div>
                <Header id="title" style={{ textAlign: 'left', paddingBottom:20, fontSize:50}}>{this.state.user.nickname}'s profile</Header>
                <Grid>
                    <Grid.Column width={4} style={{ backgroundColor: '#353535' }}>
                        <Image src={require('../../assets/images/datboy.png')} centered />
                        <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                            {this.state.user.nickname}
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4} style={{paddingLeft:30}}>
                        <Grid.Row style={{ fontSize: 25,fontWeight: 600, paddingBottom: 10 }}>
                            Email:
                        </Grid.Row>
                        <Grid.Row style={{ fontSize: 18, paddingBottom: 30, paddingLeft:5 }}>
                            {this.state.user.email}
                        </Grid.Row>
                        <Grid.Row style={{ fontSize: 25,fontWeight: 600, paddingBottom: 10 }}>
                            Age:
                        </Grid.Row>
                        <Grid.Row style={{ fontSize: 18, paddingBottom: 30, paddingLeft:5 }}>
                            {this.state.user.age}
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                        <GamesByUser />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}