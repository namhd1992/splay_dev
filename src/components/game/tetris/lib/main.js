const canvas = document.getElementById('tetris');
const nextCanvas = document.getElementById('nextPiece');
const tetris = new Tetris(canvas, nextPiece);
function Main() {
  this.init = function() {
    new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  }
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
};

