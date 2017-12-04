import React from 'react';
import Time from 'react-time-format'
import { Input, Form, Dimmer, Loader, Grid, Image, Header, Label, Button } from 'semantic-ui-react'
import '../../styles/register.css'

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            nickname: '',
            age: 0,
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        fetch('http://127.0.0.1:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(response => response.json()
            ).then(function (data) {
                localStorage.setItem('token', data.token);
                window.location.reload()
            }.bind(this)
            ).catch(err => {
                console.log(err);
            });
    }

    render() {
        if (this.state.loading) {
            return (<Dimmer active>
                <Loader />
            </Dimmer>)
        } else {
            return (
                <div>
                    <Header>Sign In</Header>
                    <Grid columns={2} padded>
                        <Grid.Column>
                            <Form id="form">
                                <Form.Group>
                                    <Grid>
                                        <Grid.Row>
                                            <Input name="email" label="Email" onChange={this.handleChange} />
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Input name="password" label="Password" type="password" onChange={this.handleChange} />
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Input name="confirmPassword" label="Password" type="password" onChange={this.handleChange} />
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Input name="nickname" label="Nickname" onChange={this.handleChange} />
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Input name="age" label="Age" onChange={this.handleChange} />
                                        </Grid.Row>
                                    </Grid>
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Grid.Row>
                                <Image centered src={require('../../assets/images/logoPEBOLIM.png')} size="medium" />
                                <Button type="submit" content="Sign Up" onClick={this.handleSubmit}></Button>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                </div>
            )
        }
    }
}