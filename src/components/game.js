import React, { Component } from "react";
import "../style2.css";

export default class Game extends Component {
  state = {
    dice1: null,
    dice2: null,
    current: 0,
    player1Turn: true,
    totalP1: 0,
    totalP2: 0,
  };

  componentDidMount() {
    const random1 = Math.ceil(Math.random() * 6);
    const random2 = Math.ceil(Math.random() * 6);
    this.setState({ dice1: `dice${random1}`, dice2: `dice${random2}` });
  }
  onRollDiceClick = () => {
    const random1 = Math.ceil(Math.random() * 6);
    const random2 = Math.ceil(Math.random() * 6);
    this.setState({ dice1: `dice${random1}`, dice2: `dice${random2}` });
    this.setState((prev) => {
      return { current: prev.current + random1 + random2 };
    });
    if (random1 + random2 === 12) {
      setTimeout(() => this.changeTurnAndUpdate("roll"), 100);
    }
  };

  changeTurnAndUpdate = (origin) => {
    const whoToAddTo = this.state.player1Turn ? "totalP1" : "totalP2";
    let amountToAddFromCurrent = 0;
    if (origin === "hold") {
      amountToAddFromCurrent = this.state.current;
    }
    this.setState((prev) => {
      return {
        player1Turn: !prev.player1Turn,
        current: 0,
        [whoToAddTo]: prev[whoToAddTo] + amountToAddFromCurrent,
      };
    });
  };

  render() {
    return (
      <div className="container">
        <Player
          name="player1"
          totalScore={this.state.totalP1}
          currentScore={this.state.current}
          playerTurn={this.state.player1Turn}
        />
        <Controler
          changeTurn={this.changeTurnAndUpdate}
          diceA={this.state.dice1}
          diceB={this.state.dice2}
          onRollDiceClick={this.onRollDiceClick}
        />
        <Player
          name="player2"
          totalScore={this.state.totalP2}
          currentScore={this.state.current}
          playerTurn={!this.state.player1Turn}
        />
      </div>
    );
  }
}

function Player(props) {
  return (
    <div className="player">
      <h2> {props.name}</h2>
      <h3> Total: {props.totalScore}</h3>
      <div className="currentScore">
        {" "}
        current: {props.playerTurn ? props.currentScore : 0}
      </div>
    </div>
  );
}

function Controler(props) {
  return (
    <div className="control">
      <button onClick={props.onRollDiceClick}>new Game</button>
      <div className={`img1 ${props.diceA}`}></div>
      <div className={`img1 ${props.diceB}`}></div>
      <button onClick={props.onRollDiceClick}>roll the dice</button>
      <button onClick={() => props.changeTurn("hold")}>hold</button>
      <input type="text"></input>
    </div>
  );
}
