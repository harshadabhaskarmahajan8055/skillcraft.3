const cells = document.querySelectorAll('[data-cell]');
const statusDiv = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
let gameActive = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const currentClass = isXTurn ? 'X' : 'O';

    // Check if the cell is already occupied or if the game is over
    if (cell.classList.contains('X') || cell.classList.contains('O') || !gameActive) {
        return;
    }

    cell.classList.add(currentClass);

    if (checkWin(currentClass)) {
        statusDiv.textContent = `${currentClass} Wins!`;
        gameActive = false;
        return;
    }

    // Check for a draw
    if (Array.from(cells).every(cell => cell.classList.contains('X') || cell.classList.contains('O'))) {
        statusDiv.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    // Toggle turns
    isXTurn = !isXTurn;
    statusDiv.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].classList.contains(currentClass));
    });
}

function restartGame() {
    cells.forEach(cell => cell.classList.remove('X', 'O'));
    isXTurn = true;
    gameActive = true;
    statusDiv.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

restartGame(); // Initialize game state
