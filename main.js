// Fetch important elements from HTML
const board = document.querySelector('[data-board]');
const gameStatus = document.querySelector('[data-game-status]');
const playerX = document.querySelector('[data-playerX]');
const playerO = document.querySelector('[data-playerO]');

//Array with all winnig posibilities
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

//Object which stores all important informations about game state
const gameState = {
  usedTiles: [],
  activePlayer: '',
  playerMoves: {
    X: [],
    O: []
  },
  playerWon: ''
};
  
//Functions which renders game grid in HTML, adds dataset atributes and classes to tiles in game board, adds eventlistener for those tiles
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

//Function which checks active player, switches active player after every move, sets new active player, adds active class to active player,
// and removes active class from last player
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

//Functions which checks if any player has won or if ther is a draw, checks if tile selected by player is not already selected, 
//appedns active player symbol to selected tile. Checks for winning conditions or draw, if not it runs setActiveplayer function
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

//Function which calls renderGrid function, clears all informations about game state,restets game status information and class,
//clears all classes and calls setActivePlayer function
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

//Function which checks if active players moves array includes any of eight arrays of winning condtions. If so it chnges game status info, it's class
//and calls lightUpWinnigTiles
const checkWinnigConditions = () => {
  for(let i=0; i<8; i++) {
    let isGameWon = winningConditions[i].every(value => gameState.playerMoves[gameState.activePlayer].includes(value));
    
    if(isGameWon === true) {
      gameStatus.innerHTML = `Player ${gameState.activePlayer} has won`;
      gameState.playerWon = gameState.activePlayer;
      gameStatus.className = 'game-status-win'
      
      lightUpWinnigTiles(i);

      break;
    }
  }
};

//Function which checks if all moves are mode and there is no winning set
const checkIfDraw = () => {
  if(gameState.usedTiles.length == 9) {
    gameState.playerWon = 'Draw'
    gameStatus.innerHTML = `It's a draw. Play again!`
    gameStatus.className = 'game-status-draw'
  }
};

//Function which adds light up class to winning tiles
const lightUpWinnigTiles = (i) => {
  let winningTiles = winningConditions[i]

  winningTiles.forEach(tile => {
    document.querySelector(`[data-tile-id='${tile}']`).className = 'tile-light'
  });
};

//Adds event listener to start new game button
document.querySelector('[data-startButton]').addEventListener('click', startNewGame);
