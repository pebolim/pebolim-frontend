import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Checkbox, Dropdown, Input } from 'semantic-ui-react';

import 'react-datepicker/dist/react-datepicker.css';

export default class CreateGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            local: '',
            isPrivate: '',
            hour:'',
            minutes:'',
            startDate: moment()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);      
        this.handleTimeDropdown = this.handleTimeDropdown.bind(this);      
    }
    
    handleTimeDropdown(e, data){
        e.preventDefault();
        this.setState(
            { 
                hour: data.value 
            }, function () {
                console.log("State:"+ this.state.hour);
            }.bind(this)
        );

        console.log("Input value:"+ data.value);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }    

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state));
        fetch('https://127.0.0.1:3002/game/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
          }) 
      }
      
    render() {
        return (
            <div>
                <h1>Criar Jogo</h1>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <p>Localização:</p>
                        <Input value={this.state.local} name="local" onChange={this.handleInputChange} icon='marker' placeholder='Localização do jogo...'/>
                    </div>
                    <div>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            name="startDate"
                        />
                    </div>
                    <div>
                        <Dropdown value={this.state.hour} onChange={this.handleTimeDropdown} placeholder='Horas' selection options={getHours()} />
                        <Dropdown value={this.state.minutes} name="minutes" onChange={this.handleInputChange} placeholder='Minutos' selection options={getMinutes()} />
                    </div>
                    <div>
                        <p>Privado</p>
                        <div className="ui fitted toggle checkbox">
                            <input type="checkbox" name="isPrivate" onChange={this.handleInputChange} readOnly="" tabIndex="0" />
                            <label></label>
                        </div>
                    </div>

                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
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