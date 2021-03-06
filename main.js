const board = document.querySelector('[data-board]')

let grid = []

const renderGrid = () => {
  let i;
  for(i=0; i<9; i++) {
    let tile = document.createElement('div');
    tile.innerHTML = '';
    tile.dataset.id = i;
    tile.className = 'tile'
    grid.push(tile);
    board.appendChild(tile) 
  }
}

renderGrid()

