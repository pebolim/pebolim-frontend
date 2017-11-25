import React from 'react';
import Time from 'react-time-format'


export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: []
        };
    }
    componentDidMount() {
        fetch(`http://localhost:3000/user/` + this.props.match.params["id"] + `/games`)
            .then(result => result.json())
            .then(gms => this.setState({ games: gms.games }))

    }

    render() {
        const gamesList = this.state.games.map((item, i) => (
            <div key={i}>
                    <div >
                        <h4>{item.id}</h4>
                        <p ><Time value={item.matchday} format="YYYY/MM/DD" /></p>
                        <a >Go somewhere</a>
                    </div>
                </div>
        ));
        return (
            <div>
                <h1>Game {gamesList}</h1>
            </div>
        );
    }
}