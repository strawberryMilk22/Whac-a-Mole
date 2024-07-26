export default class Game {
    constructor(view) {
        this.score = 0;
        this.time = 30;
        this.board = Array.from({ length: 12 }, (_, i) => ({ id: i, hasMole: false }));
        this.molesCount = 0;
        this.gameInterval = null;
        this.timerInterval = null;
        this.view = view;
    }

    resetGame() {
        this.score = 0;
        this.time = 30;
        this.board.forEach(block => block.hasMole = false);
        this.molesCount = 0;
        this.clearIntervals();
    }

    clearIntervals() {
        if (this.gameInterval) clearInterval(this.gameInterval);
        if (this.timerInterval) clearInterval(this.timerInterval);
    }

    startGame() {
        this.resetGame();
        this.gameInterval = setInterval(() => this.spawnMole(), 1000);
        this.timerInterval = setInterval(() => this.countdown(), 1000);
    }

    spawnMole() {
        if (this.molesCount < 3) {
            let availableBlocks = this.board.filter(block => !block.hasMole);
            if (availableBlocks.length === 0) return;

            let randomBlock = availableBlocks[Math.floor(Math.random() * availableBlocks.length)];
            randomBlock.hasMole = true;
            this.molesCount++;
            this.view.renderMole(randomBlock.id);
        }
    }

    removeMole(blockId) {
        let block = this.board.find(b => b.id === blockId);
        if (block && block.hasMole) {
            block.hasMole = false;
            this.molesCount--;
            this.score++;
            this.view.updateScore(this.score);
            this.view.hideMole(blockId);
        }
    }

    countdown() {
        this.time--;
        this.view.updateTimer(this.time);
        if (this.time <= 0) {
            this.endGame();
        }
    }

    endGame() {
        this.clearIntervals();
        alert("Time is Over!");
    }
}