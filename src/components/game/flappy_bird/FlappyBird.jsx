import React from 'react'
import Game from './game'

class FlappyBirdGame extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        var item = document.getElementById("canvas");
        var game = new Game(item);
        game.init();
    }

    render() {
        return (
            <div>
                <canvas id="canvas" tabindex="0" style={{background:"url('http://s2js.com/img/etc/flappyback.png')",  backgroundSize: "100%",height: "95%", border: '2px solid #0a3cda', borderRadius: '15px' }}> </canvas>
            </div>
        );
    }
}


export default FlappyBirdGame
