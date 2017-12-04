import React from 'react';
import moment from 'moment';
import { Input, Form } from 'semantic-ui-react';

const optionsAttack = [
    {text: 'Luís', value: 'luis' },
    {text: 'Ricardo', value: 'ricardo' },
]
const optionsDefend = [
    {text: 'David', value: 'david' },
    {text: 'Rafael', value: 'rafael' },
    {text: 'Diogo', value: 'diogo' }
]


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    
    render() {
        return (
            <div>
                <h1>Criar Equipa</h1>
                <Form>
                <Form.Group widths='equal'>
                    <Form.Input label='Nome da equipa' placeholder='Nome' />
                    <Form.Input label='Slogan' placeholder='Slogan' />
                    <Form.Select label='Atacante' options={optionsAttack} placeholder='Atacante' />
                    <Form.Select label='Defesa' options={optionsDefend} placeholder='Defesa' />
                </Form.Group>
                <Form.Button>Criar</Form.Button>
                </Form>
            </div>
        );
    }
}