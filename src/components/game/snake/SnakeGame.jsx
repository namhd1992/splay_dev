import React from 'react'
import Game from './game'

class SnakeGame extends React.Component {
    constructor(props){
		super(props);
        
	}
	componentDidMount(){
		var item=document.getElementById("canvas");
		var game=new Game(item);
        game.init();
	}

	render() {
		return (
			<div>
                <canvas id="canvas" tabindex="0" style={{margin:"0px", border: "1px solid"}}> </canvas>
			</div>
		);
	}
}


export default SnakeGame
