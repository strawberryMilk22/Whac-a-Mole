import Game from "./model.js";
import View from "./view.js";

export default class Controller {
    static init() {
        View.init(this);
        this.game = new Game(View);
        View.startButton.addEventListener('click', () => this.startGame());
    }

    static startGame() {
        this.game.startGame();
        View.updateScore(this.game.score);
        View.updateTimer(this.game.time);
    }

    static onBlockClick(blockId) {
        this.game.removeMole(blockId);
    }
}
