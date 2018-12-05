// Wait till the browser is ready to render the game (avoids glitches)
import KeyboardInputManager from './keyboard_input_manager'
import HTMLActuator from './html_actuator'
import LocalStorageManager from './local_storage_manager'
import GameManager from './game_manager'
function Application() {
  this.init = function() {
    new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  }
};

export default Application;