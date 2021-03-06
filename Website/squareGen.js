/* Sportz Squarez grid generator

The grid generator will create a n*n square grid 1/2 the size of the screen. Players can select unclicked grids on the board which will change to a unique color, and is limited to the number of turns available to that player. Number of turns is split evenly and rounded down, so every player will have an equal number of blocks to select. Any extra blocks will be unused and set to black.

Expected inputs: n_players	: numer of players is expected to vary
								 n_blocks		: size of the grid is expected to vary

last edit: 4/27/2019 - Daniel Whipple
*/

//INITIALIZE///////////////////////////////////////////
///////////////////////////////////////////////////////
var inner_canvas = document.getElementById("clicking canvas");
var top_header_canvas = document.getElementById("top header canvas");
var left_header_canvas = document.getElementById("left header canvas");
var random_button = document.getElementById("Random");
var refresh_button = document.getElementById("Refresh");
var find_winner_button = document.getElementById("find winner");

var n_players = 2; // indicates the number of players
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
var block_length = window.innerWidth / 1.5 / n_blocks;

var user_arr = ["#f9d5e5", "#eeac99", "#e06377", "#c83349", "#5b9aa0", "#b8a9c9", "#622569"]; // color for each player
var unclicked_color = "white"; // color for an unclicked blocks
var unused_block_color = "black"; // color for unused blocks
var block_x; // int value corrosponding to the blocks x value in grid (0, 1, 2, 3...)
var block_y; // int value corrosponding to the blocks y value in grid (0, 1, 2, 3...)
var canvas_origin = inner_canvas.getBoundingClientRect(); // allows correct box to be clicked regardless of where canvas is on the screen

var top_team_score; // user inputted score for the team on top of the block
var side_team_score; // user inputted score for the team on left of the block
var top_score_arr = []; // 1 - nblock size array that randomly orders 1-nblock. used to randomize squares
var side_score_arr = []; // same, for the side team
var winning_block; // compare the side/top_score arr with the user inputted top/side_team_score to determine the winning block.
var both_team_scores; // returned 2d array of both side and top team arrs
var winning_block_xy = [null, null]; //xy location of the winning block

var random_selection = false; // will randomly select any remaining blocks
var board_filled = false;

// we can change the canvas size as we like
inner_canvas.width = window.innerWidth / 1.5;
inner_canvas.height = inner_canvas.width;

top_header_canvas.width = window.innerWidth / 1.5;
top_header_canvas.height = block_length;
top_header_canvas.style.left = block_length;

left_header_canvas.width = block_length;
left_header_canvas.height = window.innerWidth / 1.5;

var c = inner_canvas.getContext('2d');
var topc = top_header_canvas.getContext('2d');
var leftc = left_header_canvas.getContext('2d');


//RUNNING CODE/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// setup grid_arr as "not selected"
make2dArray(n_blocks, n_blocks, grid_arr);
// draw 10*10 grid
drawGrid(n_blocks, top_score_arr, side_score_arr);

// click event, if user clicks canvas
inner_canvas.addEventListener('click', clickGrid, false);

// reorder colors in the color arr
shuffle(user_arr);

both_team_scores = drawNum(topc, leftc, block_length, n_blocks, top_score_arr, side_score_arr);

//FUNCTIONS///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

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
function drawGrid(n_blocks, top_score_arr, side_score_arr) {
  var c = inner_canvas.getContext('2d');
  var block_length = inner_canvas.width / n_blocks;

  for (xBlock = 0; xBlock < n_blocks; xBlock++) {
    for (yBlock = 0; yBlock < n_blocks; yBlock++) {
      c.fillStyle = unclicked_color;
      c.fillRect(xBlock * block_length, yBlock * block_length, block_length, block_length);
    }
  }
  drawGridLines(n_blocks, block_length, c);
}

//
function drawNum(topc, leftc, block_length, n_blocks, top_score_arr, side_score_arr) {
  top_score_arr = setScoreArr(top_score_arr, n_blocks);
  side_score_arr = setScoreArr(side_score_arr, n_blocks);
  var off_set = block_length / 2;

  var scoreArrReturn = [];
  make2dArray(2, 10, scoreArrReturn);
  for (var i = 0; i < 10; i++) {
    scoreArrReturn[0][i] = top_score_arr[i];
    scoreArrReturn[1][i] = side_score_arr[i];
  }


  // clear header canvas
  topc.fillStyle = "white";
  topc.fillRect(0, 0, block_length * n_blocks, block_length);
  leftc.fillStyle = "white";
  leftc.fillRect(0, 0, block_length, block_length * n_blocks);

  // write numbers
  topc.fillStyle = "black";
  topc.font = block_length + "px arial";
  topc.textBaseline = "middle";
  topc.textAlign = "center";
  leftc.fillStyle = topc.fillStyle;
  leftc.font = topc.font;
  leftc.textBaseline = topc.textBaseline;
  leftc.textAlign = topc.textAlign;


  for (i = 0; i < top_score_arr.length; i++) {
    topc.fillText(top_score_arr[i].toString(), i * block_length + off_set, off_set);
    leftc.fillText(side_score_arr[i].toString(), off_set, i * block_length + off_set);
  }

  return scoreArrReturn;
}

// checks if the value is a number and greater than 2 (need at least two players) and less than max 100 players
// sets txt field to red if a bad input wsa entered
function checkValidNumber(num) {
  var max = 100;
  var min = 2;
  var txt = document.getElementById("nPlayers");

  if (isNaN(num) || num < min || num > max) {
    txt.style.backgroundColor = "red";
    document.getElementById("nPlayers").value = 2;
    return 2;
  }

  txt.style.backgroundColor = "";
  return num;
}


// sets the top and side team range of randomly ordered values based on nblocks
function setScoreArr(team, size) {
  team = [];
  for (var i = 0; i < size; i++) {
    team.push(i);
  }

  return shuffle(team);
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//EVENTS///////////////////////////////////////////////////
///////////////////////////////////////////////////////////

// clickGrid - clicks on appropiate block within the grid and changes the blocks color
function clickGrid(event) {

  canvas_origin = inner_canvas.getBoundingClientRect();

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
        // check if last block selected
        if (turns_per_player == iturn && iuser == n_players - 1) {
          board_filled = true;
        }

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
        board_filled = true;
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
  shuffle(user_arr);

  // This updates the number of players based on texbox value
  n_players = checkValidNumber(~~document.getElementById("nPlayers").value);
  turns_per_player = Math.floor(total_blocks / n_players);
  total_player_turns = turns_per_player * n_players;
  extra_blocks = total_blocks - total_player_turns;

  iuser = 0;
  iturn = 0;
  random_selection = true;
  drawGrid(n_blocks, top_score_arr, side_score_arr);

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
  both_team_scores = drawNum(topc, leftc, block_length, n_blocks, top_score_arr, side_score_arr);
  board_filled = true;
};

// resets the grid to original grid of unclicked blocks when 'refresh' button clicked
refresh_button.onclick = function() {
  shuffle(user_arr);
  board_filled = false;
  // This updates the number of players based on texbox value
  n_players = checkValidNumber(~~document.getElementById("nPlayers").value);
  turns_per_player = Math.floor(total_blocks / n_players);
  total_player_turns = turns_per_player * n_players;
  extra_blocks = total_blocks - total_player_turns;

  // reset user and turn counter so correct colors will be selected
  iuser = 0;
  iturn = 0;
  // turn off possible lock that random sets
  random_selection = false;

  drawGrid(n_blocks, top_score_arr, side_score_arr);

  // reset the array values to all unclicked
  for (xBlock = 0; xBlock < n_blocks; xBlock++) {
    for (yBlock = 0; yBlock < n_blocks; yBlock++) {
      grid_arr[xBlock][yBlock] = "not selected";
    }
  }
  both_team_scores = drawNum(topc, leftc, block_length, n_blocks, top_score_arr, side_score_arr);
};

// find winning block
find_winner_button.onclick = function() {
  if (board_filled == true) {

    // redraw block under old winning location
    if (winning_block_xy[0] != null) {
      c.fillStyle = user_arr[grid_arr[winning_block_xy[0]][winning_block_xy[1]]];
      c.fillRect(winning_block_xy[0] * block_length, winning_block_xy[1] * block_length, block_length, block_length);
      drawBlockLine(winning_block_xy[0], winning_block_xy[1], block_length, c);
    }
    
	// get scores from number inputs 
   side_team_score = ~~document.getElementById("Side team score").value;
   top_team_score = ~~document.getElementById("Top team score").value;
   
      var side_location = both_team_scores[1].indexOf(side_team_score);
      var top_location = both_team_scores[0].indexOf(top_team_score);

      winning_block_xy = [top_location, side_location];

			// highlight the winning block (gold block filled in with original block color)
      c.fillStyle = "gold";
      c.fillRect(top_location * block_length, side_location * block_length, block_length, block_length);
      c.fillStyle = user_arr[grid_arr[winning_block_xy[0]][winning_block_xy[1]]];
      c.fillRect(winning_block_xy[0] * block_length + (block_length * 0.1), winning_block_xy[1] * block_length + (block_length * 0.1), block_length * 0.8, block_length * 0.8);
      drawBlockLine(winning_block_xy[0], winning_block_xy[1], block_length, c);
  }
}
