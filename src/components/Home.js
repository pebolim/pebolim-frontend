import React from 'react';
import { Link } from "react-router-dom";
import { Grid, Image, Button, Segment, Input, Icon } from 'semantic-ui-react'
import ListTeams from './Teams/ListTeams'
import PublicGames from './Games/PublicGames'
import '../styles/home.css'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import Redirect from 'react-router-dom/Redirect';

export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = { openPlay: false, gameURL: '' }

        this.handlePlayGame = this.handlePlayGame.bind(this);
    }

    handleOpenPlay = () => {this.setState({ openPlay: true })}
  
    handleClosePlay = () => {this.setState({ openPlay: false })}

    handlePlayGame = () => {
       window.location.assign('/game/'+this.state.gameURL+'/lobby')
    }
    handleInputChange = (e) => {this.setState({gameURL:e.target.value})}

    render() {
        return (
            <Grid celled='internally'>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <PublicGames />
                    </Grid.Column>
                    <Grid.Column width={8} textAlign="center">
                        <Segment padded style={{marginTop:20+"%"}}>

                            <Link to="/game/create"><Button primary fluid>Cria o teu jogo</Button></Link>
                            <Divider horizontal>Ou</Divider>
                            <Input 
                                placeholder="Insere o código do teu jogo" 
                                fluid 
                                icon="play"
                                onChange={this.handleInputChange}
                                action={{color:"blue", content:"Jogar", onClick:this.handlePlayGame}}/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <ListTeams />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}