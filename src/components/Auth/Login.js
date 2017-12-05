import React from 'react';
import { Form, Grid, Input,Image,Header,Button,Icon } from 'semantic-ui-react'
import '../../styles/login.css'

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
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
    event.preventDefault();
    var myHeaders = new Headers({
      'Content-Type': 'application/json',
    });
    
    fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(this.state)
    }).then(response => response.json()
      ).then(function (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user',JSON.stringify(data.user));
        window.location.assign("/player/games");
      }
      ).catch(err => {
        console.log(err);
      });

  }

  render() {
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