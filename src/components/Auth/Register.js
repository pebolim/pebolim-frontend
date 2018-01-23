import React from 'react';
import { Input, Form, Dimmer, Loader, Grid, Image, Header, Button } from 'semantic-ui-react'
import '../../styles/register.css'
import {NotificationManager, NotificationContainer} from 'react-notifications'


export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            nickname: '',
            age: 0,
            image_url: 'creatorImage.png',
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        if(this.state.email!="" && this.state.password!="" && this.state.nickname!="" && this.state.age!=0){   

        fetch('http://127.0.0.1:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(response => response.json()
            ).then(function (data) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user',JSON.stringify(data.user));
                window.location.assign("/home");
            }
            ).catch(err => {
                console.log(err);
            });
    }else{
        NotificationManager.error('Insert all fields!', "", 2000);
    } 
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
                                            <Input name="confirmPassword" label="Confirm Password" type="password" onChange={this.handleChange} />
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