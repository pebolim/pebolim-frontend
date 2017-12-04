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
            loading:false
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://127.0.0.1:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(res => {
            localStorage.setItem('token', res.token);
        }).catch(err => {
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
                                            <Input name="email" label="Email" onChange={(event) => this.setState({ email: event.target.value })} />
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Input name="password" label="Password" type="password" onChange={(event) => this.setState({ password: event.target.value })} />
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Input name="confirmPassword" label="Password" type="password" onChange={(event) => this.setState({ confirmPassword: event.target.value })} />
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Input name="nickname" label="Nickname" onChange={(event) => this.setState({ nickname: event.target.value })} />
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Input name="age" label="Age" onChange={(event) => this.setState({ age: event.target.value })} />
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