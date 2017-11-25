import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Checkbox, Dropdown, Menu, Input } from 'semantic-ui-react';

import 'react-datepicker/dist/react-datepicker.css';

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
        var options = [
            { key: 1, text: 'Choice 1', value: 1 },
            { key: 2, text: 'Choice 2', value: 2 },
            { key: 3, text: 'Choice 3', value: 3 },
        ];
        return (
            <div>
                <h1>Criar Jogo</h1>
                <div>
                    <p>Localização:</p>
                    <Input icon='marker' placeholder='Localização do jogo...' />
                </div>
                <div>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <Menu compact>
                        <Dropdown text='Horas' options={options} simple item />
                    </Menu>
                    <Menu compact>
                        <Dropdown text='Minutos' options={options} simple item />
                    </Menu>
                </div>
                <div>
                    <p>Privado</p>
                    <Checkbox toggle />
                </div>
            </div>
        );
    }
}