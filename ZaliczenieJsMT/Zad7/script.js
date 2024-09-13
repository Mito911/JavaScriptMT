const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 200;

let balls = [];
let ballCount = 50;
let distanceThreshold = 100;
let animationFrameId = null;


const ballCountInput = document.getElementById('ballCount');
const ballCountValue = document.getElementById('ballCountValue');
const distanceThresholdInput = document.getElementById('distanceThreshold');
const distanceThresholdValue = document.getElementById('distanceThresholdValue');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

ballCountInput.addEventListener('input', (e) => {
    ballCount = parseInt(e.target.value);
    ballCountValue.textContent = ballCount;
});

distanceThresholdInput.addEventListener('input', (e) => {
    distanceThreshold = parseInt(e.target.value);
    distanceThresholdValue.textContent = distanceThreshold;
});


function createBalls() {
    balls = [];
    for (let i = 0; i < ballCount; i++) {
        const radius = 5 + Math.random() * 10;
        balls.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: radius,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}


function drawBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    }
}

function drawLines() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const ballA = balls[i];
            const ballB = balls[j];
            const dx = ballA.x - ballB.x;
            const dy = ballA.y - ballB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < distanceThreshold) {
                ctx.beginPath();
                ctx.moveTo(ballA.x, ballA.y);
                ctx.lineTo(ballB.x, ballB.y);
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}


function moveBalls() {
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
            ball.vx = -ball.vx;
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.vy = -ball.vy;
        }
    }
}


function animate() {
    moveBalls();
    drawBalls();
    drawLines();
    animationFrameId = requestAnimationFrame(animate);
}


startButton.addEventListener('click', () => {
    if (!animationFrameId) {
        createBalls();
        animate();
    }
});

resetButton.addEventListener('click', () => {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
});

createBalls();
