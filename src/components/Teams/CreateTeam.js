import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router'
import { Dropdown, Input, Button, Icon, Grid, Radio } from 'semantic-ui-react';

export default class CreateTeam extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            image_url: '',
            partner: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://127.0.0.1:3000/team/invite', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.state)
        }).then((response) => {
            return response.json();
        }).then((body) => {
            console.log(body)
            if (body.status === 200) {
                this.setState({ redirect: true })
            }

        });
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={"/home"} />;
        }

        return (

            <div>
                <Grid>
                    <Grid.Row>
                        <h1>Convidar jogador</h1>
                    </Grid.Row>
                    <Grid.Row columns='equal'>
                        <Grid.Column>
                            <div>
                                <h3>Jogador: </h3>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <Input fluid value={this.state.partner} name="partner" onChange={this.handleInputChange} icon='fighter jet' placeholder='Jogador...' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <h1>Equipa</h1>
                    </Grid.Row>
                </Grid>
                <Grid>
                    <Grid.Row columns='equal'>
                        <Grid.Column>
                            <div>
                                <h3>Nome: </h3>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <Input fluid value={this.state.name} name="name" onChange={this.handleInputChange} icon='trophy' placeholder='Nome da equipa...' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns='equal'>
                        <Grid.Column>
                            <div>
                                <h3>Emblema: </h3>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <Input type="text" id="file" fluid value={this.state.image_url} name="image_url" onChange={this.handleInputChange} icon='image' placeholder='Url da imagem...' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid>
                    <Grid.Row columns={5}>
                        <Grid.Column>
                            <Button fluid animated onClick={this.handleSubmit}>
                                <Button.Content visible>Next</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
