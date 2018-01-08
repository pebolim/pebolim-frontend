import React from 'react';
import Time from 'react-time-format'
import { Container, Header, Grid, Statistic, Menu, Dimmer, Loader } from 'semantic-ui-react';

export default class PublicGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: []
        };

        this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })
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
            .then(gms => this.setState({ games: gms.games }))
        this.setState({loading:false})
    }

    render() {
        const activeItem = this.state.activeItem;
        var pagination = Array.apply(null,{length:this.state.nPages}).map(Number.call, Number)
        var loading = this.state.loading;
        if(loading){
            return (
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            )
        }else{
        return (
            <div>
                <Header id="title" as="h1" textAlign="center" style={{paddingBottom: 10}}>Jogos Públicos</Header>
                {
                    this.state.games.map((item, i) =>
                        (
                            <Container fluid key={i}>
                                <Grid columns='equal'>
                                    <Grid.Row>
                                        <Grid.Column textAlign="left" style={{paddingLeft:40}} >
                                            <h3>Local: {this.state.games[0].local}</h3>
                                            Data: <Time value={this.state.games[0].match_day} format="YYYY/MM/DD" />
                                        </Grid.Column>
                                        <Grid.Column style={{fontSize:15}}>
                                            <div style={{paddingBottom:10}}><h3>Espaços Disponíveis: {this.state.games[0].numPlayers}/4</h3></div>
                                            <div><h3>Administrador do jogo: Datboy</h3></div>
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
}