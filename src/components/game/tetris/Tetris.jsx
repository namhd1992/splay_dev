import React from 'react'
import Main from './lib/main'

class TetrisGame extends React.Component {
    constructor(props){
		super(props);
        
	}
	componentDidMount(){
        const canvas = document.getElementById('tetris');
        const nextCanvas = document.getElementById('nextPiece');
		var main = new Main(canvas, nextCanvas);
        main.init();
	}

	render() {
		return (
            <div id="top" tabindex="0">
                <div id="game-over">
                    <h2>GAME OVER</h2>
                    <h3 id="final-score"></h3>
                    <h4>Click to play again</h4>
                </div>
                <div class="canvas-area">
                    <canvas id="tetris" width="240" height="400"></canvas>
                    <ul class="sidebar group">
                        <div id="score">
                        Score:
                        </div>
                        <li class="next-piece">
                        <h2>Next Piece:</h2>
                        <canvas id="nextPiece" width="100" height="100"></canvas>
                        </li>
                    </ul>
                </div>
            </div>
		);
	}
}


export default TetrisGame
