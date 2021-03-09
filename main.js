const board = document.querySelector('[data-board]');
const gameStatus = document.querySelector('[data-game-status]')
const playerX = document.querySelector('[data-playerX]')
const playerY = document.querySelector('[data-playerY]')

const winingConditions = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
]

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
      newMove(event.target.dataset.id);
    })
    gameState.grid.push(null);
    board.appendChild(tile); 
  }
};

const setActivePlayer = () => {
  if(gameState.activePlayer === '' || gameState.activePlayer === 'o') {

    gameState.activePlayer = 'x';
    playerX.className = 'player-status-active';
    gameStatus.innerHTML = "Player's X move";
  } else {

    gameState.activePlayer = 'o';
    playerX.className = '';
    playerY.className = 'player-status-active';
    gameStatus.innerHTML = "Player's Y move";
  }
}

const newMove = (id) => {
  console.log(id);
  console.log(winingConditions);
  
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
  gameState.activePlayer = '';
  gameStatus.innerHTML = 'Push start button'
}

document.querySelector('[data-startButton]').addEventListener('click', startGame);
document.querySelector('[data-restartButton]').addEventListener('click', restartGame);