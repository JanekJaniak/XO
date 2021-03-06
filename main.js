const board = document.querySelector('[data-board]');
const gameStatus = document.querySelector('[data-game-status]')
const playerX = document.querySelector('[data-playerX]')
const playerY = document.querySelector('[data-playerY]')  

const gameState = {
  grid: [],
  activePlayer: '',
  playerMoves: {
    x: [],
    o: []
  }
}
  
const renderGrid = () => {
  let i;
  for(i=0; i<9; i++) {
    let tile = document.createElement('div');
    tile.innerHTML = '';
    tile.dataset.id = i;
    tile.className = 'tile';
    tile.addEventListener('click', (event) => {
      move(event.target.dataset.id);
    })
    gameState.grid.push(null);
    board.appendChild(tile); 
  }
};

const setActivePlayer = () => {
  if(gameState.activePlayer === '') {

    gameState.activePlayer = 'x';
    playerX.className = 'player-status-active';
    gameStatus.innerHTML = "Player's X move";
  }
}

const move = (id) => {
  console.log(id);
  
}

const startGame = () => {
  board.innerHTML = ''
  renderGrid();
  setActivePlayer();
}

const restartGame = () => {
  board.innerHTML = '';
  playerX.className = '';
  playerY.className = '';
  gameStatus.innerHTML = 'Push start button'
}

document.querySelector('[data-startButton]').addEventListener('click', startGame);
document.querySelector('[data-restartButton]').addEventListener('click', restartGame);