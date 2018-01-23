import React from 'react';
import { Link } from "react-router-dom";
import { Grid, Image, Button, Segment, Input, Icon } from 'semantic-ui-react'
import ListTeams from './Teams/ListTeams'
import PublicGames from './Games/PublicGames'
import '../styles/home.css'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import Redirect from 'react-router-dom/Redirect';
import GridColumn from 'semantic-ui-react/dist/commonjs/collections/Grid/GridColumn';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { openPlay: false, gameURL: '' }

        this.handlePlayGame = this.handlePlayGame.bind(this);
    }

    handleOpenPlay = () => { this.setState({ openPlay: true }) }

    handleClosePlay = () => { this.setState({ openPlay: false }) }

    handlePlayGame = () => {
        window.location.assign('/game/' + this.state.gameURL + '/lobby')
    }
    handleInputChange = (e) => { this.setState({ gameURL: e.target.value }) }

    render() {
        return (
            <Grid celled="internally">
                <Grid.Column width={11}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={7}>
                                <Link to="/game/create"><Button fluid style={{ marginTop: 0 + 'px' }}>Create Game</Button></Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Divider vertical style={{ color: "white" }}>Or</Divider>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Input
                                    fluid
                                    onChange={this.handleInputChange}
                                    placeholder="Insert your game code"
                                    action={{content: "Play", onClick: this.handlePlayGame }} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <PublicGames />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={5}>
                    <ListTeams />
                </Grid.Column>
            </Grid>
        )
    }
}