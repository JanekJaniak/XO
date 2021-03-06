const board = document.querySelector('[data-board]')

let grid = []
let tileNumber = 9 

const renderGrid = () => {
  let i;
  for(i=0; i<tileNumber; i++) {
    let tile = document.createElement('div');
    tile.innerHTML = '';
    tile.dataset.id = i;
    tile.className = 'tile'
    grid.push(tile);
    board.appendChild(tile) 
  }
}

renderGrid()

