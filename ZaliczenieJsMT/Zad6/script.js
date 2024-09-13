// Pobieranie elementów z DOM
const ball = document.getElementById('ball');
const hole = document.getElementById('hole');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const highScoresList = document.getElementById('high-scores');

let ballPosition = { x: 150, y: 150 }; // Startowa pozycja kulki
let holePosition = { x: 240, y: 240 }; // Startowa pozycja dziury
let score = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

// Funkcja do rysowania kulki na ekranie
function drawBall() {
    ball.style.left = `${ballPosition.x}px`;
    ball.style.top = `${ballPosition.y}px`;
}

// Funkcja do rysowania dziury na ekranie
function drawHole() {
    hole.style.left = `${holePosition.x}px`;
    hole.style.top = `${holePosition.y}px`;
}

// Sprawdzenie, czy kulka dotarła do dziury
function checkCollision() {
    const ballRadius = 15; // promień kulki
    const holeRadius = 20; // promień dziury

    const dx = ballPosition.x + ballRadius - (holePosition.x + holeRadius);
    const dy = ballPosition.y + ballRadius - (holePosition.y + holeRadius);
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Jeśli dystans między środkami jest mniejszy niż suma promieni, mamy kolizję
    return distance < (ballRadius + holeRadius);
}

// Funkcja uruchamiająca licznik czasu
function startTimer() {
    if (timerInterval) return; // Nie uruchamiaj ponownie, jeśli licznik już działa
    timerInterval = setInterval(() => {
        timer += 0.01;
        timerElement.textContent = `Czas: ${timer.toFixed(2)} s`;
    }, 10);
}

// Funkcja resetująca grę po trafieniu
function resetGame() {
    ballPosition = { x: 150, y: 150 }; // Resetowanie pozycji kulki
    score += 1;
    scoreElement.textContent = `Ilość trafień: ${score}`;
    gameStarted = false;
    clearInterval(timerInterval);
    timerInterval = null;
    timer = 0;
    timerElement.textContent = `Czas: 0.00 s`;
    saveHighScore(score);
    drawBall();
    setRandomHolePosition();
}

// Zapis wyników w LocalStorage
function saveHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ score, date: new Date().toLocaleString() });
    highScores.sort((a, b) => b.score - a.score); // Sortuj malejąco według trafień
    highScores.splice(5); // Zachowaj tylko 5 najlepszych wyników
    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores();
}

// Wyświetlanie najlepszych wyników
function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoresList.innerHTML = highScores.map(score =>
        `<li>${score.score} trafień - ${score.date}</li>`).join('');
}


function setRandomHolePosition() {
    holePosition = {
        x: Math.random() * (260 - 40), // Szerokość pola gry - szerokość dziury
        y: Math.random() * (260 - 40)  // Wysokość pola gry - wysokość dziury
    };
    drawHole();
}

function updateBallPosition(event) {
    const { alpha, beta, gamma } = event; 

    ballPosition.x += gamma / 10; // Ruch w osi X
    ballPosition.y += beta / 10;  // Ruch w osi Y

    ballPosition.x = Math.max(0, Math.min(270, ballPosition.x));
    ballPosition.y = Math.max(0, Math.min(270, ballPosition.y));

    drawBall();


    if (checkCollision()) {
        resetGame();
    }
}


window.addEventListener('deviceorientation', (event) => {
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    updateBallPosition(event);
});


function init() {
    drawBall();
    drawHole();
    displayHighScores();
}

init();
