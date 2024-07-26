export default class Game {
    constructor(view) {
        this.score = 0;
        this.time = 30;
        this.board = Array.from({ length: 12 }, (_, i) => ({ id: i, hasMole: false, hasSnake: false }));
        this.molesCount = 0;
        this.snakeTimeout = null;
        this.gameInterval = null;
        this.timerInterval = null;
        this.snakeInterval = null;
        this.view = view;
    }

    resetGame() {
        this.score = 0;
        this.time = 30;
        this.board.forEach(block => {
            block.hasMole = false;
            block.hasSnake = false;
        });
        this.molesCount = 0;
        this.clearIntervals();
    }

    clearIntervals() {
        if (this.gameInterval) clearInterval(this.gameInterval);
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.snakeInterval) clearInterval(this.snakeInterval);
        if (this.snakeTimeout) clearTimeout(this.snakeTimeout);
    }

    startGame() {
        this.resetGame();
        this.gameInterval = setInterval(() => this.spawnMole(), 1000);
        this.snakeInterval = setInterval(() => this.spawnSnake(), 2000);
        this.timerInterval = setInterval(() => this.countdown(), 1000);
    }

    spawnMole() {
        if (this.molesCount < 3) {
            let availableBlocks = this.board.filter(block => !block.hasMole && !block.hasSnake);
            if (availableBlocks.length === 0) return;

            let randomBlock = availableBlocks[Math.floor(Math.random() * availableBlocks.length)];
            randomBlock.hasMole = true;
            this.molesCount++;
            this.view.renderMole(randomBlock.id);

            setTimeout(() => this.hideMole(randomBlock.id), 2000);
        }
    }

    hideMole(blockId) {
        let block = this.board.find(b => b.id === blockId);
        if (block && block.hasMole) {
            block.hasMole = false;
            this.molesCount--;
            this.view.hideMole(blockId);
        }
    }

    spawnSnake() {
        let availableBlocks = this.board.filter(block => !block.hasMole && !block.hasSnake);
        if (availableBlocks.length === 0) return;

        let randomBlock = availableBlocks[Math.floor(Math.random() * availableBlocks.length)];
        randomBlock.hasSnake = true;
        this.view.renderSnake(randomBlock.id);

        //if (this.snakeTimeout) clearTimeout(this.snakeTimeout);
        setTimeout(() => this.hideSnake(randomBlock.id), 2000);
        //this.snakeTimeout = setTimeout(() => this.hideSnake(randomBlock.id), 2000);
    }

    hideSnake(blockId) {
        let block = this.board.find(b => b.id === blockId);
        if (block && block.hasSnake) {
            block.hasSnake = false;
            this.view.hideSnake(blockId);
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

    clickSnake() {
        this.clearIntervals();
        this.board.forEach(block => block.hasSnake = true);
        this.view.renderAllSnakes();
        alert("Game Over! You clicked the snake.");
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