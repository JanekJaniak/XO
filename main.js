const board = document.querySelector('[data-board]');
const gameStatus = document.querySelector('[data-game-status]');
const playerX = document.querySelector('[data-playerX]');
const playerO = document.querySelector('[data-playerO]');

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const gameState = {
  usedTiles: [],
  activePlayer: '',
  playerMoves: {
    X: [],
    O: []
  },
  playerWon: ''
};
  
const renderGrid = () => {
  for(let i=0; i<9; i++) {
    let tile = document.createElement('div');

    tile.innerHTML = '';
    tile.dataset.tileId = i;
    tile.className = 'tile';
    tile.addEventListener('click', (event) => {
      addNewMove(event.target);
    })

    gameState.usedTiles.push(null);
    board.appendChild(tile); 
  }
};

const setActivePlayer = () => {
  if(gameState.activePlayer === '' || gameState.activePlayer === 'O') {
    gameState.activePlayer = 'X';
    playerO.className = '';
    playerX.className = 'player-status-active';
    gameStatus.innerHTML = "Player's X move";
  } else {
    gameState.activePlayer = 'O';
    playerX.className = '';
    playerO.className = 'player-status-active';
    gameStatus.innerHTML = "Player's O move";
  }
};

const addNewMove = (target) => {
  if(gameState.playerWon == '') {
    const targetTile = target.dataset.tileId

    if(!gameState.usedTiles.includes(targetTile)) {
      gameState.playerMoves[gameState.activePlayer].push(parseInt(targetTile));
      gameState.usedTiles.push(targetTile);
      target.innerHTML = gameState.activePlayer
      
      checkWinnigConditions()

      if(gameState.playerWon == '') {
        setActivePlayer()
        checkIfDraw()
      }
      
    } else {
      gameStatus.innerHTML = 'Choose another cell'
    }
  } 
};

const startNewGame = () => {
  board.innerHTML = '';
  renderGrid();
  playerX.className = '';
  playerO.className = '';
  gameState.activePlayer = '';
  gameState.usedTiles = [];
  gameState.playerMoves.X = [];
  gameState.playerMoves.O = [];
  gameStatus.innerHTML = 'Push start button';
  gameStatus.className = 'game-status'
  gameState.playerWon = '';
  setActivePlayer();
};

const checkWinnigConditions = () => {
  for(let i=0; i<8; i++) {
    let isGameWon = winningConditions[i].every(value => gameState.playerMoves[gameState.activePlayer].includes(value));
    
    if(isGameWon === true) {
      gameStatus.innerHTML = `Player ${gameState.activePlayer} has won`;
      gameState.playerWon = gameState.activePlayer;
      gameStatus.className = 'game-status-win'
      
      lightWinnigTiles(i);

      break;
    }
  }
};

const checkIfDraw = () => {
  if(gameState.usedTiles.length == 9) {
    gameState.playerWon = 'Draw'
    gameStatus.innerHTML = `It's a draw. Play again!`
    gameStatus.className = 'game-status-draw'
  }
};

const lightWinnigTiles = (i) => {
  let winningTiles = winningConditions[i]

  winningTiles.forEach(tile => {
    document.querySelector(`[data-tile-id='${tile}']`).className = 'tile-light'
  });
};

document.querySelector('[data-startButton]').addEventListener('click', startNewGame);