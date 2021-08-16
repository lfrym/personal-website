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
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  perm = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
    perm[i] = new Array(rows);
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
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

function draw() {
  background(0);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((perm[i][j] == 1))  {
        fill(0, 88, 171);
        stroke(0, 88, 171);
        rect(i * w, j * w, w-0.5, w-0.5);
      }
      else if ((perm[i][j] == 2)) {
        if ((board[i][j] == 1)) fill(255);
        else fill(0,0,0);
        stroke(0,0,0);
        rect(i * w, j * w, w-1, w-1);
      }
    }
  }

}

// start new life when mouse is pressed
function mousePressed() {
  try {
    board[((mouseX - mouseX%w) / w)][((mouseY - mouseY%w) / w)] = 1;
    board[((mouseX - mouseX%w) / w)-1][((mouseY - mouseY%w) / w)] = 1;
    board[((mouseX - mouseX%w) / w)-1][((mouseY - mouseY%w) / w)-1] = 1;
    board[((mouseX - mouseX%w) / w)-1][((mouseY - mouseY%w) / w)+1] = 1;
    board[((mouseX - mouseX%w) / w)+1][((mouseY - mouseY%w) / w)] = 1;
    board[((mouseX - mouseX%w) / w)+1][((mouseY - mouseY%w) / w)+1] = 1;
    board[((mouseX - mouseX%w) / w)+1][((mouseY - mouseY%w) / w)+2] = 1;
  }
  catch(err){}
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

  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
      else                                             next[x][y] = board[x][y]; // Stasis
    }
  }

  // Swap!
  let temp = board;
  board = next;
  next = temp;
}
