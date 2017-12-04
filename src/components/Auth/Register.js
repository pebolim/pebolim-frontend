import React from 'react';
import Time from 'react-time-format'
import { Container, Header } from 'semantic-ui-react';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            nickname: '',
            age: 0
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
        event.preventDefault();
        fetch('https://127.0.0.1:3000/signin', {
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
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
              <input type="email" value={this.state.email} onChange={this.handleChange} />
                </label>
                <label>
                    Nickname:
              <input type="text" value={this.state.nickname} onChange={this.handleChange} />
                </label>
                <label>
                    Password:
              <input type="password" value={this.state.password} onChange={this.handleChange} />
                </label>
                <label>
                    Password:
              <input type="number" value={this.state.age} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}