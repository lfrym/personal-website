let w;
let columns;
let rows;
let board;
let next;
let permUnsized;
let perm;


function preload() {
  permUnsized = loadTable('assets/noname.csv', 'csv', header=false);
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight*0.75);
  canvas.parent('canvasForHTML')
  canvas;
  w = 7;
  columns = floor(width / w);
  rows = floor(height / w);

  board = new Array(columns);
  perm = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Uint8Array(rows);
    perm[i] = new Uint8Array(rows);
    // Place sprite to be written in the top left corner, fill in other space with 0's to match board size
    if (i<permUnsized.getColumnCount()) {
      for (let j = 0; j < rows; j++) {
        if (j<permUnsized.getRowCount()) {
          perm[i][j] = parseInt(permUnsized.getColumn(i)[j]);
        }
        else perm[i][j] = 2;
      }
    }
    else perm[i].fill(2);
  }
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Uint8Array(rows);
  }
}

function draw() {
  background(0);
  cursor('assets/Cursor-64.png', 32, 32);
  generate();
  
  // Batch similar drawing operations
  noStroke();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (perm[i][j] === 1) {
        fill(0, 88, 171);
        rect(i * w, j * w, w-0.5, w-0.5);
      } else if (perm[i][j] === 2) {
        fill(board[i][j] ? 255 : 0);
        rect(i * w, j * w, w-1, w-1);
      }
    }
  }
}

// start new life when mouse is pressed
function mousePressed() {
  let shape = random([0,1,2])
  console.log("shape is "+ shape)

  // Herschell
  if (shape==0) {
    try {
      board[((mouseX - mouseX%w) / w)][((mouseY - mouseY%w) / w)] = 1;
      board[((mouseX - mouseX%w) / w)-1][((mouseY - mouseY%w) / w)] = 1;
      board[((mouseX - mouseX%w) / w)-1][((mouseY - mouseY%w) / w)-1] = 1;
      board[((mouseX - mouseX%w) / w)-1][((mouseY - mouseY%w) / w)+1] = 1;
      board[((mouseX - mouseX%w) / w)+1][((mouseY - mouseY%w) / w)] = 1;
      board[((mouseX - mouseX%w) / w)+1][((mouseY - mouseY%w) / w)+1] = 1;
      board[((mouseX - mouseX%w) / w)+1][((mouseY - mouseY%w) / w)+2] = 1;
    }
    catch (err) { }
  }
  
  // R-pentomino
  else if (shape==1) {
    try {
      board[((mouseX - mouseX%w) / w)][((mouseY - mouseY%w) / w)] = 1;
      board[((mouseX - mouseX%w) / w)-1][((mouseY - mouseY%w) / w)] = 1;
      board[((mouseX - mouseX%w) / w)][((mouseY - mouseY%w) / w)-1] = 1;
      board[((mouseX - mouseX%w) / w)][((mouseY - mouseY%w) / w)+1] = 1;
      board[((mouseX - mouseX%w) / w)+1][((mouseY - mouseY%w) / w)+1] = 1;
    }
    catch (err) { }
  }

  // Multum in parvo
  else if (shape==2) {
    try {
      board[((mouseX - mouseX%w) / w)][((mouseY - mouseY%w) / w)] = 1;
      board[((mouseX - mouseX%w) / w)-1][((mouseY - mouseY%w) / w)-1] = 1;
      board[((mouseX - mouseX%w) / w)-2][((mouseY - mouseY%w) / w)-2] = 1;
      board[((mouseX - mouseX%w) / w)+1][((mouseY - mouseY%w) / w)+1] = 1;
      board[((mouseX - mouseX%w) / w)+2][((mouseY - mouseY%w) / w)+1] = 1;
      board[((mouseX - mouseX%w) / w)+3][((mouseY - mouseY%w) / w)+1] = 1;
      board[((mouseX - mouseX%w) / w)+3][((mouseY - mouseY%w) / w)] = 1;
    }
    catch (err) { }
  }
}


// Fill board with zeroes (or randomly with small modification)
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = 0; //  floor(random(2));  // replace 0 with floor(random(2)) for random fill
      next[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {
  // Use local variables to avoid property lookups
  const cols = columns - 1;
  const rws = rows - 1;
  
  for (let x = 1; x < cols; x++) {
    for (let y = 1; y < rws; y++) {
      // Simplified neighbor counting
      const neighbors = board[x-1][y-1] + board[x][y-1] + board[x+1][y-1] +
                       board[x-1][y] + board[x+1][y] +
                       board[x-1][y+1] + board[x][y+1] + board[x+1][y+1];
      
      // Simplified rules using binary operations
      next[x][y] = neighbors === 3 || (neighbors === 2 && board[x][y]) ? 1 : 0;
    }
  }
  
  // Swap references instead of copying
  [board, next] = [next, board];
}
