import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Checkbox, Dropdown, Input } from 'semantic-ui-react';

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
                    <Dropdown placeholder='Horas' selection options={getHours()} />
                    <Dropdown placeholder='Minutos' selection options={getMinutes()} />
                </div>
                <div>
                    <p>Privado</p>
                    <Checkbox toggle />
                </div>
            </div>
        );
    }
}

const getHours = () => {
    var array = [];
    for (var index = 0; index < 24; index++) {
        array.push({
            key: index,
            text: `${index + ' h'}`,
            value: index,
        });
    }
    return array;
}
const getMinutes = () => {
    var array = [];
    for (var index = 0; index < 60; index += 5) {
        array.push({
            key: index,
            text: `${index + ' min'}`,
            value: index,
        });
    }
    return array;
}