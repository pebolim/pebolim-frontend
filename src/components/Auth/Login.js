import React from 'react';
import { Redirect } from 'react-router';
import { Form, Grid, Input,Image,Header,Button,Icon } from 'semantic-ui-react'

import '../../styles/login.css'

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: false
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
          self.setState({ redirect: true })   
        }         
        //window.location.assign("/player/games");
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    const { redirect } = this.state;
    
    if (redirect) {
        return <Redirect to="/home" />;
    }
     
    return (
        <Grid centered columns={3}>
          <Grid.Column>
          <Image centered src={require('../../assets/images/logoPEBOLIM.png')} size='tiny' />
          <Header>Sign in</Header>
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