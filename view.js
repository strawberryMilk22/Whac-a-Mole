export default class View {
    static init(controller) {
        this.controller = controller;
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.gameBoard = document.getElementById('gameBoard');
        this.startButton = document.getElementById('startButton');
        this.renderBoard();
    }

    static renderBoard() {
        this.gameBoard.innerHTML = '';
        for (let i = 0; i < 12; i++) {
            let block = document.createElement('div');
            block.classList.add('block');
            block.dataset.id = i;
            block.addEventListener('click', () => this.controller.onBlockClick(i));
            let mole = document.createElement('img');
            mole.src = 'mole.jpg';
            mole.classList.add('mole');
            block.appendChild(mole);
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

    static updateScore(score) {
        this.scoreElement.textContent = `${score}`;
    }

    static updateTimer(time) {
        this.timerElement.textContent = `${time}`;
    }
}