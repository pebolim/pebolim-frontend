import React from 'react';
import Time from 'react-time-format'
import { Container, Header } from 'semantic-ui-react';

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
            <Container key={i}>
                    <Header>{item.id} - <Time value={item.matchday} format="YYYY/MM/DD" /></Header>
                    
            </Container>
        ));
        return (
            <div>
                <h1>Listagem de jogos do jogador ...</h1>
                {gamesList}
            </div>
        );
    }
}