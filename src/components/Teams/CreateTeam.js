import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router'
import { Dropdown, Input, Button, Icon, Grid } from 'semantic-ui-react';

export default class CreateTeam extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            image: '',
            attacker: '',
            defender: ''
        };
     
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        

    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state));
        var self = this;
        fetch('http://127.0.0.1:3000/team/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({team: this.state})
        }).then(function(response){
            return response.json();
        }).then(function(body){
            console.log(body)
            if(body.status === 201)
            self.setState({ redirect: true})                  
        });
    }

    
    render() {
        const { redirect } = this.state;
        
        if (redirect) {
            return <Redirect to={"/home/"} />;
        }
        return (
            
            <div>
                <Grid>
                    <Grid.Row>
                        <h1>Criar Equipa</h1>
                    </Grid.Row>
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
                            <Input type="file" id="file" fluid value={this.state.image} name="image" onChange={this.handleInputChange} icon='image'/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns='equal'>
                        <Grid.Column>
                            <div>
                                <h3>Atacante: </h3>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <Input fluid value={this.state.attacker} name="attacker" onChange={this.handleInputChange} icon='fighter jet' placeholder='Atacante...' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns='equal'>
                        <Grid.Column>
                            <div>
                                <h3>Defesa: </h3>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <Input fluid value={this.state.defender} name="defender" onChange={this.handleInputChange} icon='shield' placeholder='Defesa...' />
                        </Grid.Column>
                    </Grid.Row>
                    
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
