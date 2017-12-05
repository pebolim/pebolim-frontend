import React from 'react';
import Time from 'react-time-format'
import { Container, Header, Grid } from 'semantic-ui-react';
//import { GamesByUser } from '../../styles/Games/GamesByUser.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: []
        };
    }
    componentDidMount() {
        var headers = new Headers({
            "Authorization":localStorage.getItem("token"),
            'Content-Type': 'application/json'
        });
        var myInit = {
            method: 'GET',
            headers: headers
        }
        fetch(`http://localhost:3000/player/games`,myInit)
            .then(result => result.json())
            .then(gms => this.setState({ games: gms.games }))

    }

    render() {
        return (
            <div>
                <Header id="title" size='huge'>Jogos</Header>
                {
                    this.state.games.map((item, i) => 
                    (
                        <Container key={i} style={{borderLeft:item.winner ? '10px solid #00ff00' : '10px solid #ff0000'}}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={5}>
                                        <Header>Data: <Time value={item.match_day} format="YYYY/MM/DD" /></Header>
                                        <Header>{item.teams[0]}</Header>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Grid>
                                            <Grid.Row textAlign="center">
                                                <Grid.Column width={6}>
                                                    <Header color="blue">{item.result1}</Header>
                                                </Grid.Column>
                                                <Grid.Column width={4}>
                                                    <Header color="black">VS</Header>
                                                    </Grid.Column>
                                                <Grid.Column width={6}>
                                                    <Header color="red">{item.result2}</Header>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Header>Local: {item.local}</Header>
                                        <Header>{item.teams[1]}</Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    ))
                }
            </div>
        );
    }
}