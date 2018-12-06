import React from 'react'
import Application from './js/application'
import './style/main.css'

function createMarkup() {
	return {__html: '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><div class="container"><div class="heading"><h1 class="title">2048</h1><div class="scores-container"><div class="score-container">0</div><div class="best-container">0</div></div></div><div class="above-game"><p class="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p><a class="restart-button">New Game</a></div><div class="game-container"><div class="game-message"><p></p><div class="lower"><a class="keep-playing-button">Keep going</a><a class="retry-button">Try again</a></div></div><div class="grid-container"><div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div><div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div><div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div><div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div></div><div class="tile-container"></div></div><p class="game-explanation"><strong class="important">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong></p><hr></body></html>'};
  }

class NumberGame extends React.Component {
    constructor(props){
		super(props);
        
	}
	componentDidMount(){
		var app=new Application();
        app.init();
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={createMarkup()}>
			</div>
		);
	}
}


export default NumberGame
