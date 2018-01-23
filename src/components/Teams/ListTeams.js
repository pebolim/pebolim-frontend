import React from 'react';
import Time from 'react-time-format'
import { Link } from "react-router-dom";
import { Container, Header, Item, Grid, Dimmer, Loader, Button } from 'semantic-ui-react';

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
                    <Item.Group>
                        {this.state.teams.map((item, i) => (
                            <Item key={"team" + i}>
                            <Item.Image size="tiny" src={item.image_url == null ? require("../../assets/images/noteam.png") : item.image_url}/>
                            <Item.Content verticalAlign="middle">
                                <Item.Header style={{color:"#22b782"}}>{item.name}</Item.Header>
                                <Item.Meta style={{color:"white"}}>
                                    <span>{item.partner.nickname}</span>
                                    </Item.Meta>
                                <h2></h2>
                                </Item.Content>
                            </Item>
                        ))}
                    </Item.Group>
                    <Grid>
                    <Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                            <Link to='/team/create' style={{ cursor: "pointer"}}><Button style={{fontFamily:" Lato,'Helvetica Neue',Arial,Helvetica,sans-serif", backgroundColor:"#22b782", color:"white"}}>Create Team</Button></Link>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </div>
            );
        }
    }
}