import Tetris from './tetris'

function Main(canvas, nextCanvas) {
  this.init = function() {
    const tetris = new Tetris(canvas, nextCanvas);
  
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 32:
          tetris.player.fall(true);
          return;
        case 40:
          tetris.player.fall();
          return;
        case 37:
          tetris.player.slide(-1);
          return;
        case 39:
          tetris.player.slide(1);
          return;
        case 88:
          tetris.player.spin(-1);
          return;
        case 38:
          tetris.player.spin(1);
          return;
        case 90:
          tetris.player.swap();
          return;
      }
    });
  }
};
export default Main;
