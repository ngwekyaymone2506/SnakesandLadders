let audio = document.getElementById("audio");
let sound = document.getElementById("icon");
let btn = document.querySelector(".dice-btn");
let start;
let DiceNum;

// Get the player type from local storage
let playerType = localStorage.getItem("playerType");
// Display the player type
let mode = document.getElementById("mode");
mode.innerText = `Player Vs ${playerType}`;

let info = document.getElementById("info");
let winnerDisplay = document.getElementById("winner-display");

let firstPlayer = document.getElementById("first");
firstPlayer.style.color = "darkblue";
let secPlayer = document.getElementById("second");
secPlayer.style.color = "darkred";

createBoxes();
const NumOfDie = 6;
let players = [1, 1];
let currentPlayer = 0;
let winner;
let finish = false;
let ladders = {
  2: 38,
  7: 14,
  8: 31,
  15: 26,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  78: 98,
  87: 94,
};
let snakes = {
  16: 6,
  46: 25,
  49: 11,
  62: 19,
  64: 60,
  74: 53,
  89: 68,
  92: 88,
  95: 75,
  99: 80,
};
/* This method is to close the description when click cancel logo */
let cancel = document.getElementById("cancel");
cancel.addEventListener("click", () => {
  let desBox = document.getElementById("desBox");
  desBox.style.display = "none";
  toggleRollButton(true);
  if (typewriterSound.play) typewriterSound.pause();
});

// Description: Function to show the description box initially
window.addEventListener("load", function () {
  let desBox = document.getElementById("desBox");
  //Initailly enable roll btn
  toggleRollButton(false);
  // Show desBox with direct style manipulation
  setTimeout(() => {
    desBox.style.display = "flex";
    desBox.style.animation = "pop 0.5s linear";
    // Play typewriter sound for the first two lines
    typewriter(8500);
    // Hide desBox after animations are finished
    setTimeout(() => {
      desBox.style.display = "none";
      toggleRollButton(true);
    }, 13000);
  }, 1000); // Delay before showing desBox
});

/* Description: This method is for background theme sound */
function toggleAudio() {
  if (audio.paused) {
    audio.play();
    audio.volume = 0.5;
    icon.src = "./volume.png";
  } else {
    audio.pause();
    icon.src = "./mute.png";
  }
}
let bs = document.querySelectorAll(".box");
bs[0].innerHTML = `<button class='p-0'></button>`; //red token
bs[0].innerHTML += `<button class='p-1'></button>`; //blue token
// Function to move the player
// Function to move the player
function moveWhenDice(step) {
  start = players[currentPlayer];
  let current = document.querySelector(`.p-${currentPlayer}`);
  let stop = start + step;
  let color = ["darkblue", "darkred"];

  if (!finish) {
    let play = setInterval(() => {
      if (start < stop) {
        start++;
        moveSound();
      } else {
        // Climb up if there's a ladder
        meetLadders();
        // Slide down if there's a snake
        meetSnakes();
        players[currentPlayer] = start;
        // Check if there's a winner
        if (start >= 100) {
          start = 100; // Ensure move sound is muted at 100
          finish = true;
          winCheck(playerType);
        }
        // Switch players' turns
        currentPlayer = (currentPlayer + 1) % 2;

        document.querySelector(".champ").style.background =
          color[currentPlayer];
        document.querySelector(".turn").innerHTML = `Player ${
          currentPlayer + 1
        }'s Turn!`;
        clearInterval(play);

        // If it's the bot's turn, initiate the bot's move
        if (currentPlayer === 1 && playerType === "Bot") {
          setTimeout(botRoll, 1000);
        } else {
          toggleRollButton(true); // Enable roll button for Player 1
        }
      }
      bs[start - 1].append(current);
    }, 600);
    toggleRollButton(false);
  }
}

/* Description: This method is to check who wins and also reveal the winner */
function winCheck(player) {
  if (start >= 100 && players[currentPlayer] >= 100) {
    finish = true;
    winner = currentPlayer + 1; // Set winner correctly
    if (player === "Player") {
      audio.volume = 0;
      victorySound();
      info.innerHTML =
        currentPlayer === 0 ? "Player 1 Wins!!" : "Player 2 Wins!!";
    } else if (player === "Bot") {
      audio.volume = 0;
      victorySound();
      info.innerHTML = currentPlayer === 0 ? "You Wins!!" : "Bot Wins!!";
    }
    document.querySelector(".roll").style.display = "none";
    playAgain(player);
  }
}

/* Description: This method is for typewriter sound effect */
let typewriterSound = new Audio("typewriter.mp3");
function typewriter(duration) {
  typewriterSound.currentTime = 0;
  typewriterSound.play();

  setTimeout(() => {
    typewriterSound.pause();
    typewriterSound.currentTime = 0;
  }, duration);
}

/* Description: This method is for victory sound */
function moveSound() {
  let moveS = new Audio("move.mp3");
  moveS.play();
}

/* Description: This method is for victory sound */
function victorySound() {
  var victory = new Audio("victory sound.m4a");
  victory.play();
}

/* Description: This method is to play sound effect for dice roll */
function diceSoundEffect() {
  var diceSound = new Audio("dice sound.mp3");
  diceSound.play();
}

/* Description: This method is to show pop-up when there's a winner and to play again */
function playAgain(type) {
  setTimeout(() => {
    document.getElementById("display").style.display = "block";
    if (type === "Player") {
      winnerDisplay.innerHTML =
        currentPlayer === 1 ? "Player 1 Wins!!" : "Player 2 Wins!!";
    } else if (type === "Bot") {
      winnerDisplay.innerHTML =
        currentPlayer === 1 ? "You Wins!!" : "Bot Wins!!";
    }
  }, 200);
  setTimeout(() => {
    document.getElementById("playAgain").addEventListener("click", () => {
      window.location.reload(true);
      audio.volume = 0.4;
    });
  }, 300);
}

/* Description: This method is to Handle snakes encounter */
function meetSnakes() {
  if (snakes.hasOwnProperty(start)) {
    var snakeSound = new Audio("snake sound.m4a");
    snakeSound.play();
    document.getElementById("info").innerHTML = `Ahh Snake, Help!! ...`;
    document.getElementById("info").style.color = "darkred";
    start = snakes[start];
  }
}

/* Description: This method is to Handle ladders encounter */
function meetLadders() {
  if (ladders.hasOwnProperty(start)) {
    var ladderSound = new Audio("ladder sound.m4a");
    ladderSound.play();
    document.getElementById("info").innerHTML = `Yay.. Got a Ladder ...`;
    document.getElementById("info").style.color = "darkred";
    start = ladders[start];
  }
}

/* Description: This method is to roll a dice */
function roll() {
  if (finish == false) {
    toggleRollButton(false);
    diceSoundEffect();
    let die = document.querySelector(".roll");
    let count = 1;
    let dice = setInterval(() => {
      DiceNum = Math.floor(Math.random() * NumOfDie + 1);
      die.style.backgroundImage = `url(./${DiceNum}.png)`;

      if (count > 10) {
        document.getElementById("info").innerHTML = `Player ${
          currentPlayer + 1
        } rolled ${DiceNum}`;
        document.getElementById("info").style.color = `black`;
        moveWhenDice(DiceNum);
        clearInterval(dice);
      }
      count++;
    }, 50);
  }
}

/* Description: This method is for Bot's dice roll and move */
function botRoll() {
  if (finish == false) {
    toggleRollButton(false);
    diceSoundEffect();
    let die = document.querySelector(".roll");
    let count = 1;
    let dice = setInterval(() => {
      DiceNum = Math.floor(Math.random() * NumOfDie + 1);
      die.style.backgroundImage = `url(./${DiceNum}.png)`;

      if (count > 10) {
        document.getElementById("info").innerHTML = `Bot rolled ${DiceNum}`;
        document.getElementById("info").style.color = `black`;
        moveWhenDice(DiceNum);

        clearInterval(dice);
      }
      count++;
    }, 50);
  }
}

/* Description: This method is to toggle roll button */
function toggleRollButton(enabled) {
  if (enabled) {
    btn.style.display = "block";
    btn.setAttribute("onclick", "roll()");
    btn.style.cursor = "pointer";
  } else {
    btn.style.display = "none";
    btn.removeAttribute("onclick");
    btn.style.cursor = "not-allowed";
  }
}

//this func will act like player board
playerBoard(playerType);
function playerBoard(player) {
  winner = currentPlayer + 1;
  if (player === "Player") {
    firstPlayer.innerHTML = `Player 1 : BLUE`;
    secPlayer.innerHTML = `Player 2 : RED`;
  } else if (player === "Bot") {
    firstPlayer.innerHTML = `Player 1 : YOU`;
    secPlayer.innerHTML = `Player 2 : BOT`;
  }
}

// Create the game board with 100 grids
function createBoxes() {
  let boxes = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      y = (9 - i) * 50;
      x = j * 50;
      n = i * 10 + j + 1;
      if (i % 2 == 1) x = (9 - j) * 50;

      boxes += `<div class='box' style='margin:${y}px ${x}px;'></div>`;
    }
  }
  document.getElementById("board").innerHTML = boxes;
}
