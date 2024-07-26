export default class View {
    static init(controller) {
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.gameBoard = document.getElementById('gameBoard');
        this.startButton = document.getElementById('startButton');
        this.controller = controller;
        this.renderBoard();
    }

    static renderBoard() {
        this.gameBoard.innerHTML = '';
        for (let i = 0; i < 12; i++) {
            let block = document.createElement('div');
            block.classList.add('block');
            block.dataset.id = i;
            block.addEventListener('click', (e) => {
                if (e.target.classList.contains('mole')) {
                    this.controller.onMoleClick(i);
                } else if (e.target.classList.contains('snake')) {
                    this.controller.onSnakeClick();
                }
            });
            let mole = document.createElement('img');
            mole.src = 'mole.jpg'; 
            mole.classList.add('mole');
            let snake = document.createElement('img');
            snake.src = 'snake.jpg';
            snake.classList.add('snake');
            block.appendChild(mole);
            block.appendChild(snake);
            this.gameBoard.appendChild(block);
        }
    }

    static renderMole(blockId) {
        let block = this.gameBoard.querySelector(`[data-id='${blockId}']`);
        let mole = block.querySelector('.mole');
        mole.style.display = 'block';
    }

    static hideMole(blockId) {
        let block = this.gameBoard.querySelector(`[data-id='${blockId}']`);
        let mole = block.querySelector('.mole');
        mole.style.display = 'none';
    }

    static renderSnake(blockId) {
        let block = this.gameBoard.querySelector(`[data-id='${blockId}']`);
        let snake = block.querySelector('.snake');
        snake.style.display = 'block';
    }

    static hideSnake(blockId) {
        let block = this.gameBoard.querySelector(`[data-id='${blockId}']`);
        let snake = block.querySelector('.snake');
        snake.style.display = 'none';
    }

    static renderAllSnakes() {
        let blocks = this.gameBoard.querySelectorAll('.block');
        blocks.forEach(block => {
            let snake = block.querySelector('.snake');
            snake.style.display = 'block';
        });
    }

    static hideAllSnakes() {
        let blocks = this.gameBoard.querySelectorAll('.block');
        blocks.forEach(block => {
            let snake = block.querySelector('.snake');
            snake.style.display = 'none';
        });
    }

    static updateScore(score) {
        this.scoreElement.textContent = `${score}`;
    }

    static updateTimer(time) {
        this.timerElement.textContent = `${time}`;
    }
}