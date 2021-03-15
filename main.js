const board = document.querySelector('[data-board]');
const gameStatus = document.querySelector('[data-game-status]')
const playerX = document.querySelector('[data-playerX]')
const playerY = document.querySelector('[data-playerY]')

const winningConditions = [
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
    X: [],
    O: []
  }
}
  
const renderGrid = () => {
  let i;
  for(i=0; i<9; i++) {
    let tile = document.createElement('div');
    tile.innerHTML = '';
    tile.dataset.tileId = i;
    tile.className = 'tile';
    tile.addEventListener('click', (event) => {
      addNewMove(event.target);
    })
    gameState.grid.push(null);
    board.appendChild(tile); 
  }
};

const setActivePlayer = () => {
  if(gameState.activePlayer === '' || gameState.activePlayer === 'O') {

    gameState.activePlayer = 'X';
    playerY.className = '';
    playerX.className = 'player-status-active';
    gameStatus.innerHTML = "Player's X move";
  } else {

    gameState.activePlayer = 'O';
    playerX.className = '';
    playerY.className = 'player-status-active';
    gameStatus.innerHTML = "Player's O move";
  }
}

const addNewMove = (target) => {
  const targetTile = target.dataset.tileId

  if(!gameState.grid.includes(targetTile)) {
    gameState.playerMoves[gameState.activePlayer].push(targetTile);
    gameState.grid.push(targetTile);
    target.innerHTML = gameState.activePlayer

    checkWinnigConditions()
    setActivePlayer()
  } else {
    gameStatus.innerHTML = 'Choose another cell'
  }

  console.log(gameState.playerMoves.X);
  console.log(gameState.playerMoves.O);
}

const startNewGame = () => {
  board.innerHTML = '';
  renderGrid();
  playerX.className = '';
  playerY.className = '';
  gameState.activePlayer = '';
  gameState.grid = [];
  gameStatus.innerHTML = 'Push start button'
  setActivePlayer();
}

const checkWinnigConditions = () => {
  console.log('no win');
}

document.querySelector('[data-startButton]').addEventListener('click', startNewGame);