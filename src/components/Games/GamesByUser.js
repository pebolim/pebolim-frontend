import React from 'react';
import Time from 'react-time-format'
import { Container, Header, Grid, Statistic, Menu, Dimmer, Loader } from 'semantic-ui-react';
import "../../styles/Games/GamesByUser.css"


export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [],
            nPages : 0,
            activeItem : '1',
            loading: true
        };

        this.handleItemClick = (e, { name }) => {
            this.setState((state) => ({activeItem: name, loading:true }))
            return this.getInfoPage(name)
        }
    }

    getPages(){
        var headers = new Headers({
            "Authorization":localStorage.getItem("token"),
            'Content-Type': 'application/json'
        });
        var myInit = {
            method: 'GET',
            headers: headers
        }
        fetch(`http://localhost:3000/player/nPages`,myInit)
            .then(result => result.json())
            .then(page => this.setState({nPages: page.nPages}))
    }

    getInfoPage(nPage){
        var headers = new Headers({
            "Authorization":localStorage.getItem("token"),
            'Content-Type': 'application/json'
        });
        var myInit = {
            method: 'GET',
            headers: headers
        }
        fetch(`http://localhost:3000/player/games/`+nPage,myInit)
            .then(result => result.json())
            .then(gms => this.setState({ games: gms.games, loading:false }))
    }

    componentWillMount() {
        this.getPages();
        this.getInfoPage(this.state.activeItem)
    }

    render() {
        const activeItem = this.state.activeItem;
        var pagination = Array.apply(0,{length:this.state.nPages}).map((i,index) => index+1)
        var loading = this.state.loading;
        if(loading){
            return (
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            )
        }else{
            if(this.state.games.length==0){
                return <Header  id="title" as="h1" textAlign="center" style={{paddingBottom: 10}}>Este jogador não tem registos de últimos jogos</Header>;
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
                        <Menu pagination>
                            {
                                pagination.map( num => (
                                    <Menu.Item name={num+""} key={num} active={activeItem === num+''} onClick={this.handleItemClick}></Menu.Item>
                                    )
                                )
                            }
                        </Menu>
                    </div>
                );
            }
        }   
    }
}