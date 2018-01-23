import React from 'react';

export default class Team extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: null,
            image: null,
            image_placeholder : props.team_side + ' Team'
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({name: nextProps.name, image: nextProps.image});
    }

    render(){
        const {name, image, image_placeholder} = this.state;

        return (
            <div className="game-board-team-wrapper">
            <div className="team-box">
                <div className="team-image">
                    <div className="team-side">{image == null && image_placeholder}</div>
                </div>
                <div className="team-name">
                    <div>{name}</div>
                </div>
            </div>
        </div> 
        );
    }
}