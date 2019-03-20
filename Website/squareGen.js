/* Sportz Squarez grid generator

The grid generator will create a n*n square grid 1/2 the size of the screen. Players can select unclicked grids on the board which will change to a unique color, and is limited to the number of turns available to that player. Number of turns is split evenly and rounded down, so every player will have an equal number of blocks to select. Any extra blocks will be unused and set to black.

Expected inputs: n_players	: numer of players is expected to vary
								 n_blocks		: size of the grid is expected to vary

last edit: 3/8/2019
*/

//INITIALIZE///////////////////////////////////////////
var canvas = document.querySelector('canvas');
// we can change the canvas size as we like
canvas.width = window.innerWidth / 2;
canvas.height = canvas.width;

var n_players = 25; // indicates the number of players
var n_blocks = 10; // number of blocks per side (n*n grid)

var mouse = {
  x: undefined, // x and y coordinates for mouse
  y: undefined
};

var total_blocks = n_blocks * n_blocks; // total blocks in grid
var turns_per_player = Math.floor(total_blocks / n_players); // rounds down number of turns
var total_player_turns = turns_per_player * n_players; // summed turns per player
var extra_blocks = total_blocks - total_player_turns; // number of blocks that will be unused
var iuser = 0; // current user
var iturn = 0; // current turn of user
var grid_arr = []; // contains the iuser of the corelated box that has been clicked (turned into 2d arr)

var user_arr = ["#f9d5e5", "#eeac99", "#e06377", "#c83349", "#5b9aa0", "#b8a9c9", "#622569"]; // color for each player
var unclicked_color = "white"; // color for an unclicked blocks
var unused_block_color = "black"; // color for unused blocks


//RUNNING CODE/////////////////////////////////////////////////

// setup grid_arr as "not selected"
make2dArray(n_blocks, n_blocks, grid_arr);
// draw 10*10 grid
drawGrid(n_blocks);

// click event, if user clicks canvas
canvas.addEventListener('click', clickGrid, false);


//FUNCTIONS///////////////////////////////////////////////////

// clickGrid - clicks on appropiate block within the grid and changes the blocks color
function clickGrid(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  var c = canvas.getContext('2d');
  var block_length = canvas.width / n_blocks;
  var block_x = Math.floor(mouse.x / block_length); // int value corrosponding to the blocks x value in grid (0, 1, 2, 3...)
  var block_y = Math.floor(mouse.y / block_length); // int value corrosponding to the blocks y value in grid (0, 1, 2, 3...)

  if (grid_arr[block_x][block_y] == "not selected") {
    // check if player is out of turns
    if (turns_per_player == iturn) {
      iuser++;
      iturn = 0;
    }
    iturn++;

    // check if all the moves have been selected
    if (iuser < n_players) {
      // more players than hardcoded colors
      if (iuser >= user_arr.length) {
        user_arr.push(generateHexColor());
      }

      // click on block with players color
      grid_arr[block_x][block_y] = iuser;
      c.fillStyle = user_arr[iuser];
      c.fillRect(block_x * block_length, block_y * block_length, block_length, block_length);

    } else {
      // else the extra blocks are unused and colored in
      for (var i = 0; i < n_blocks; i++) {
        for (var j = 0; j < n_blocks; j++) {
          if (grid_arr[i][j] == "not selected") {
            grid_arr[i][j] = "null";
            c.fillStyle = unused_block_color;
            c.fillRect(i * block_length, j * block_length, block_length, block_length);
          }
        }
      }

    }
  }
  // code to unclick previously clicked blocks
  else {
    // protect previously selected grids by other players
    /*       grid_arr[block_x][block_y] = "not selected";
          c.fillStyle = unclicked_color;
          c.fillRect(block_x * block_length, block_y * block_length, block_length, block_length); */
  }
}

// drawGrid - draws n_blocks * n_blocks grid
// n_blocks : number of blocks per side of the grid
function drawGrid(n_blocks) {
  var c = canvas.getContext('2d');
  var block_length = canvas.width / n_blocks;

  for (xBlock = 0; xBlock < n_blocks; xBlock++) {
    for (yBlock = 0; yBlock < n_blocks; yBlock++) {
      c.rect(xBlock * block_length, yBlock * block_length, block_length, block_length);
      c.stroke();
      c.fillStyle = unclicked_color;
      c.fillRect(xBlock * block_length, yBlock * block_length, block_length, block_length);
    }
  }
}

// make2dArray - changes an empty array into a 2d array
// row	: total rows in 2d array 
// col	: total columns in 2d array
// arr	: the array input (changes to 2d array)
function make2dArray(row, col, arr) {
  for (var i = 0; i < row; i++) {
    arr[i] = [];
    for (var j = 0; j < col; j++) {
      arr[i][j] = "not selected";
    }
  }
}

// generateHexColor - returns random hex color
function generateHexColor() {
  return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
}