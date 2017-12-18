import React from 'react';
import Time from 'react-time-format'
import { Container, Header, Grid, Statistic, Menu, Dimmer, Loader } from 'semantic-ui-react';
import { GamesByUser } from '../../styles/Games/GamesByUser.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [],
            nPages : 10,
            activeItem : '1',
            loading: true
        };

        this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    }
    componentDidMount() {
       /*let gms = [];
        for (var i = 1; i < 51; i++) {
            var res1 = Math.floor((Math.random() * 10) + 1);
            var res2 = Math.floor((Math.random() * 10) + 1);
            var myTeam1 = "MyTeam"
            var myTeam2 = "Team2"
            var w = false;
            if (Math.random() >= 0.5) {
                myTeam1 = "Team2";
                myTeam2 = "MyTeam"
            }
            if ((myTeam1.includes("MyTeam") && res1 > res2) || (myTeam2.includes("MyTeam") && res2 > res1)) {
                w = true
            }
            gms.push({
                id: i,
                match_day: "2013-6-9",
                local: "IPT",
                result1: res1,
                result2: res2,
                teams: [
                    myTeam1,
                    myTeam2
                ],
                winner: w
            })

        }
        this.setState({ games: gms })*/

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
                <Header id="title" as="h1" textAlign="center" style={{paddingBottom: 10}}>Últimos Jogos</Header>
                {
                    this.state.games.map((item, i) =>
                        (
                            <Container fluid key={i} style={{ borderLeft: item.is_winner ? '5px solid #00ff00' : '5px solid #ff0000', borderRight: item.is_winner ? '5px solid #00ff00' : '5px solid #ff0000' }}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={5} textAlign="center" >
                                            Data: <Time value={item.match_day} format="YYYY/MM/DD" />
                                            <h3>{item.teams[0].name}</h3>
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            <Grid>
                                                <Grid.Row textAlign="center">
                                                    <Grid.Column width={6}>
                                                        <Statistic color="red">
                                                            <Statistic.Value>{item.teams[0].goals}</Statistic.Value>
                                                        </Statistic>
                                                    </Grid.Column>
                                                    <Grid.Column width={4} style={{alignSelf:"center"}}>
                                                        <Statistic>
                                                            <Statistic.Label style={{color:"white", fontSize:1.8+"rem"}}>vs</Statistic.Label>
                                                        </Statistic>
                                                    </Grid.Column>
                                                    <Grid.Column width={6}>
                                                        <Statistic color="blue">
                                                            <Statistic.Value>{item.teams[1].goals}</Statistic.Value>
                                                        </Statistic>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>
                                        <Grid.Column width={5} textAlign="center">
                                            <span>Local: {item.local}</span>
                                            <h3>{item.teams[1].name}</h3>
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