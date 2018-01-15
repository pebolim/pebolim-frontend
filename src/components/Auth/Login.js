import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router';
import { Form, Grid, Input,Image,Header,Button,Icon } from 'semantic-ui-react'
import 'react-notifications/lib/notifications.css';

import '../../styles/login.css'
import Router from 'react-router/Router';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router/Route';
import Layout from '../Layout';
import {NotificationManager, NotificationContainer} from 'react-notifications'

export default class Login extends React.Component {
  constructor(props, object) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
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
    var self = this;
    const { email, password } = this.state;

    event.preventDefault();
    var myHeaders = new Headers({
      'Content-Type': 'application/json',
    });
    
    fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
          email:email,
          password: password
      })
    })
    .then(response => response.json())
    .then(function (data) {
        console.log(data)

        if(data.status === 200){
          localStorage.setItem('token', data.token);
          localStorage.setItem('user',JSON.stringify(data.user));
          self.props.history.push("/home")
          NotificationManager.success('Login efetuado com sucesso',"",2000);
        }         
        //window.location.assign("/player/games");
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      
        <Grid centered columns={3}>
          <Grid.Column>
          <Image centered src={require('../../assets/images/logoPEBOLIM.png')} size='tiny' />
          <Header textAlign="center">Sign in</Header>
            <Form id="form">
              <Form.Group>
                <Grid>
                  <Grid.Row>
                  <Input type="email" name="email" label="Email" onChange={this.handleChange} required/>
                  </Grid.Row>
                  <Grid.Row>
                    <Input type="password" name="password" label="Password" onChange={this.handleChange} required/>
                  </Grid.Row>
                  <Grid.Row centered>
                  <Button animated size="big" type="submit" onClick={this.handleSubmit}>
                    <Button.Content visible>Login</Button.Content>
                    <Button.Content hidden>
                      <Icon name='right arrow' />
                    </Button.Content>
                  </Button>
                  </Grid.Row>
                </Grid>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
    );
  }
}