/* Sportz Squarez grid generator

The grid generator will create a n*n square grid 1/2 the size of the screen. Players can select unclicked grids on the board which will change to a unique color, and is limited to the number of turns available to that player. Number of turns is split evenly and rounded down, so every player will have an equal number of blocks to select. Any extra blocks will be unused and set to black.

Expected inputs: n_players	: numer of players is expected to vary
								 n_blocks		: size of the grid is expected to vary

last edit: 3/20/2019 - whipple
*/

//INITIALIZE///////////////////////////////////////////
var canvas = document.querySelector('canvas');
var random_button = document.getElementById("Random");
var refresh_button = document.getElementById("Refresh");

// we can change the canvas size as we like
canvas.width = window.innerWidth / 2;
canvas.height = canvas.width;
var c = canvas.getContext('2d');

var n_players = 6; // indicates the number of players
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
var block_length = canvas.width / n_blocks;

var user_arr = ["#f9d5e5", "#eeac99", "#e06377", "#c83349", "#5b9aa0", "#b8a9c9", "#622569"]; // color for each player
var unclicked_color = "white"; // color for an unclicked blocks
var unused_block_color = "black"; // color for unused blocks
var block_x; // int value corrosponding to the blocks x value in grid (0, 1, 2, 3...)
var block_y; // int value corrosponding to the blocks y value in grid (0, 1, 2, 3...)
var canvas_origin = canvas.getBoundingClientRect(); // allows correct box to be clicked regardless of where canvas is on the screen

var random_selection = false; // will randomly select any remaining blocks


//RUNNING CODE/////////////////////////////////////////////////

// setup grid_arr as "not selected"
make2dArray(n_blocks, n_blocks, grid_arr);
// draw 10*10 grid
drawGrid(n_blocks);

// click event, if user clicks canvas
canvas.addEventListener('click', clickGrid, false);


//FUNCTIONS///////////////////////////////////////////////////

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

// generates a random integer from the range of min-max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// draws grid lines over the user selection grid
function drawGridLines(n_blocks, block_length, c) {
  for (xBlock = 0; xBlock < n_blocks; xBlock++) {
    for (yBlock = 0; yBlock < n_blocks; yBlock++) {
      c.rect(xBlock * block_length, yBlock * block_length, block_length, block_length);
      c.stroke();
    }
  }
}

// redraws the drawGridLines function over a single block (redraws the border of a block)
function drawBlockLine(block_x, block_y, block_length, c) {
  c.rect(block_x * block_length, block_y * block_length, block_length, block_length);
  c.stroke();
}

// drawGrid - draws n_blocks * n_blocks grid
// n_blocks : number of blocks per side of the grid
function drawGrid(n_blocks) {
  var c = canvas.getContext('2d');
  var block_length = canvas.width / n_blocks;

  for (xBlock = 0; xBlock < n_blocks; xBlock++) {
    for (yBlock = 0; yBlock < n_blocks; yBlock++) {
      c.fillStyle = unclicked_color;
      c.fillRect(xBlock * block_length, yBlock * block_length, block_length, block_length);
    }
  }
  drawGridLines(n_blocks, block_length, c);
}

//EVENTS///////////////////////////////////////////////////

// clickGrid - clicks on appropiate block within the grid and changes the blocks color
function clickGrid(event) {

  canvas_origin = canvas.getBoundingClientRect();

  if (random_selection == false) {
    mouse.x = event.x - canvas_origin.left;
    mouse.y = event.y - canvas_origin.top;

    block_x = Math.floor(mouse.x / block_length);
    block_y = Math.floor(mouse.y / block_length);

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

      // redraws grid lines around selected block
      drawBlockLine(block_x, block_y, block_length, c);

    }
    // code to unclick previously clicked blocks
    else {
      // protect previously selected grids by other players
      /*       grid_arr[block_x][block_y] = "not selected";
            c.fillStyle = unclicked_color;
            c.fillRect(block_x * block_length, block_y * block_length, block_length, block_length); */
    }
  }
}

// fillRandom - fills the remaining squares randomly
// currently this function only locks the random selection
random_button.onclick = function() {
  iuser = 0;
  iturn = 0;
  random_selection = true;
  drawGrid(n_blocks);

  // reset the array values to all unclicked
  for (xBlock = 0; xBlock < n_blocks; xBlock++) {
    for (yBlock = 0; yBlock < n_blocks; yBlock++) {
      grid_arr[xBlock][yBlock] = "not selected";
    }
  }

  var remaining_blocks = total_blocks; // if we want random to not reset board, then this needs to be the total remainng blocks, not just set it to the total blocks

  // this is not a very efficient way of randomizing the blocks, but it allows us to easily implement this when some of the blocks have already been selected by a user
  while (remaining_blocks > 0) {
    block_x = getRandomInt(0, n_blocks - 1);
    block_y = getRandomInt(0, n_blocks - 1);

    if (grid_arr[block_x][block_y] == "not selected") {
      remaining_blocks--;

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
          remaining_blocks = 0;
        }
      }

    }

  }
  drawGridLines(n_blocks, block_length, c);
};

// resets the grid to original grid of unclicked blocks when 'refresh' button clicked
refresh_button.onclick = function() {
  // reset user and turn counter so correct colors will be selected
  iuser = 0;
  iturn = 0;
  // turn off possible lock that random sets
  random_selection = false;

  drawGrid(n_blocks);

  // reset the array values to all unclicked
  for (xBlock = 0; xBlock < n_blocks; xBlock++) {
    for (yBlock = 0; yBlock < n_blocks; yBlock++) {
      grid_arr[xBlock][yBlock] = "not selected";
    }
  }

};
