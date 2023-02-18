const players = ["X", "O"];
const gameArray = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let gameboard;
const winningMessage = document.getElementById("winningMessage");
const resetButton = document.getElementById("resetButton");

const makeGameboard = () => {
  const gameboard = document.createElement("div");
  gameboard.classList.add("gameboard");
  return gameboard;
};

const makeCell = (cellNumber) => {
  const cell = document.createElement("div");
  cell.classList.add("game-cell");
  cell.addEventListener(
    "click",
    (e) => {
      const { target } = e;
      target.textContent = currentPlayer;
      gameArray[cellNumber] = currentPlayer;
      switchPlayers();
      checkBoard();
    },
    { once: true }
  );
  return cell;
};

const switchPlayers = () => {
  if (currentPlayer === players[0]) {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
};

const checkBoard = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  for (let combo of winningCombos) {
    const [position1, position2, position3] = combo;

    if (
      gameArray[position1] !== "" &&
      gameArray[position1] === gameArray[position2] &&
      gameArray[position1] === gameArray[position3]
    ) {
      winningMessage.textContent = `${gameArray[position1]}'s wins!`;
      winningMessage.appendChild(resetButton);
      winningMessage.classList.add("winning-message");
      return;
    }
  }
  const allCellsFull = gameArray.every((cell) => cell !== "");
  if (allCellsFull) {
    winningMessage.textContent = `It's a draw`;
    winningMessage.appendChild(resetButton);
    winningMessage.classList.add("draw-message");
    return;
  }
};

const resetGame = () => {
  winningMessage.classList.remove("winning-message");
  winningMessage.classList.remove("draw-message");
  winningMessage.textContent = "";
  if (gameboard) {
    document.body.removeChild(gameboard);
  }
  gameboard = makeGameboard();
  for (let i = 0; i < 9; i++) {
    gameboard.appendChild(makeCell(i));
  }

  currentPlayer = players[0];
  gameArray.fill("");

  document.body.appendChild(gameboard);
};

resetGame();

resetButton.addEventListener("click", resetGame);