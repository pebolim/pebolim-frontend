import React from 'react';
import Time from 'react-time-format'
import { Link } from "react-router-dom";
import { Container, Header, Grid, Statistic, Menu, Dimmer, Loader, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';

export default class PublicGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [],
            loading:true,
            redirect:false,
            selected_game:null
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
        fetch(`http://localhost:3000/game/public`,myInit)
            .then(result => result.json())
            .then(gms => {
                if(gms.status===200)
                    this.setState({ games:gms.games, loading:false})
            });
    }

    handleClick(i){
        this.setState({redirect:true, selected_game:this.state.games[i].url})
    }

    render() {
        const {redirect, loading, games, selected_game }=this.state;

        if(loading){
            return (
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            );
        }
        if(redirect){return <Redirect to={"/game/" + selected_game + "/lobby"} />;}

        return (
            <div>
                <Header id="title" as="h1" textAlign="center" style={{paddingBottom: 10}}>Jogos Públicos</Header>
                {
                    this.state.games.map((game, i) =>
                        (
                            <Container fluid key={i} onClick={()=>this.handleClick(i)}>
                                <Grid columns='equal'>
                                    <Grid.Row>
                                        <Grid.Column textAlign="left" style={{paddingLeft:40}} >
                                            <h3>Local: {game.local}</h3>
                                            Data: <Time value={game.match_day} format="YYYY/MM/DD" />
                                        </Grid.Column>
                                        <Grid.Column style={{fontSize:15}}>
                                            <div style={{paddingBottom:10}}><h3>Espaços Disponíveis: {game.numPlayers}/4</h3></div>
                                            <div><h3>Administrador do jogo: {game.owner}</h3></div>
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