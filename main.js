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
    x: [],
    o: []
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
      newMove(event.target.dataset.tileId);
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

  if(!gameState.grid.includes(id)) {
    gameState.playerMoves[gameState.activePlayer].push(id);
    gameState.grid.push(id);


    checkWinnigConditions()
  } else {
    gameStatus.innerHTML = 'Choose another cell'
  }

  console.log(id);
  console.log(winningConditions);
  console.log(gameState.playerMoves.x);
  
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
  gameState.grid = '';
  gameStatus.innerHTML = 'Push start button'
}

const checkWinnigConditions = () => {
  console.log('no win');
}

document.querySelector('[data-startButton]').addEventListener('click', startGame);
document.querySelector('[data-restartButton]').addEventListener('click', restartGame);