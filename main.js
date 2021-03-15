const board = document.querySelector('[data-board]');
const gameStatus = document.querySelector('[data-game-status]')
const playerX = document.querySelector('[data-playerX]')
const playerY = document.querySelector('[data-playerY]')

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const gameState = {
  grid: [],
  activePlayer: '',
  playerMoves: {
    X: [],
    O: []
  },
  playerWon: ''
}
  
const renderGrid = () => {
  for(let i=0; i<9; i++) {
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
  if(gameState.playerWon == '') {
    const targetTile = target.dataset.tileId

    if(!gameState.grid.includes(targetTile)) {
      gameState.playerMoves[gameState.activePlayer].push(parseInt(targetTile));
      gameState.grid.push(targetTile);
      target.innerHTML = gameState.activePlayer
      
      checkWinnigConditions()

      if(gameState.playerWon == '') {
        setActivePlayer()
      } 
      
    } else {
      gameStatus.innerHTML = 'Choose another cell'
    }
  } 
}

const startNewGame = () => {
  board.innerHTML = '';
  renderGrid();
  playerX.className = '';
  playerY.className = '';
  gameState.activePlayer = '';
  gameState.grid = [];
  gameState.playerMoves.X = [];
  gameState.playerMoves.O = [];
  gameStatus.innerHTML = 'Push start button';
  gameState.playerWon = '';
  setActivePlayer();
}

const checkWinnigConditions = () => {
  for(let i=0; i<8; i++) {
    let isGameWon = winningConditions[i].every(value => gameState.playerMoves[gameState.activePlayer].includes(value));
    
    if(isGameWon === true) {
      gameStatus.innerHTML = `Player ${gameState.activePlayer} has won`;
      gameState.playerWon = gameState.activePlayer;
      break;
    }
  }
}

document.querySelector('[data-startButton]').addEventListener('click', startNewGame);