import React, { Component } from 'react';
import './App.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      games: []
    };
  }
  componentDidMount(){
    fetch(`http://localhost:3000/games`)
 		.then(result=>result.json())
    .then(games=>this.setState({games}))

    // $.getJSON('')
    //   .then(({ results }) => {this.setState({ games: results }); console.log(results);});
      
  }

  render() {
    console.log(this.state.games);
    const gamesList = this.state.games.map((item, i) => (
      <div key={i}>
        <h1>{ item.id }</h1>
        <span>{ item.duration }, { item.created_at }</span>
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          { gamesList }
        </div>
      </div>
    );
  }
}

