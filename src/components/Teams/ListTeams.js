import React from 'react';
import Time from 'react-time-format'
import { Link } from "react-router-dom";
import { Container, Header, Grid, Dimmer, Loader, Button } from 'semantic-ui-react';

export default class ListTeam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            loading: true
        };

        this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })
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
        fetch(`http://localhost:3000/teams`, myInit)
            .then(result => result.json())
            .then(response => {
                this.setState({ teams: response.data })
                console.log(this.state.teams)
            })
        this.setState({ loading: false })
    }

    render() {
        var loading = this.state.loading;
        if (loading) {
            return (
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            )
        } else {
            return (
                <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={5} textAlign="center">
                                <Link to='/team/create' style={{ cursor: "pointer" }}><Button>Create Team</Button></Link>
                            </Grid.Column>
                            <Grid.Column width={5} textAlign="center">
                                <Link to='/team/create' style={{ cursor: "pointer" }}><Button>Create Team</Button></Link>
                            </Grid.Column>
                        </Grid.Row>

                        {this.state.teams.map((item, i) =>(

                            <Grid.Row>
                                <Grid.Column width={5} textAlign="center">
                                    <h2>{item.partner.nickname}</h2>
                                    <h4>{item.name}</h4>
                                </Grid.Column>
                            </Grid.Row>
                        ))}
                    </Grid>
                </div>
            );
        }
    }
}