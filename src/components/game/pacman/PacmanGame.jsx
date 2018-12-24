import React from 'react'
import PACMAN from './game'

class PacmanGame extends React.Component {
	constructor(props) {
		super(props);

	}
	componentDidMount() {
		var el = document.getElementById("pacman");
		PACMAN.init(el, "https://raw.githubusercontent.com/daleharvey/pacman/master/");
		// var game = new Game(item);
		// game.init();
	}

	render() {
		return (
			<div id="pacman" style={{width:"382px", height:"470px", borderRadius:"5px", paddingLeft:"25%"}}></div>
		);
	}
}


export default PacmanGame
