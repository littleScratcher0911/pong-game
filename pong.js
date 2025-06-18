const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Audio
const hitSound = new Audio('assets/hit.wav');
const scoreSound = new Audio('assets/score.wav');
const music = new Audio('assets/music.mp3');
music.loop = true;
music.volume = 0.3;
music.play();

const paddleWidth = 10, paddleHeight = 100;
let leftY = 250, rightY = 250;
let ballX = 400, ballY = 300, ballVX = 6, ballVY = 3;
let playerScore = 0, aiScore = 0;
const paddleSpeed = 6;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") rightY -= paddleSpeed;
  if (e.key === "ArrowDown") rightY += paddleSpeed;
});

// KI Schwierigkeit (0.02 = einfach, 0.08 = schwer)
const aiDifficulty = 0.06;

function draw() {
  // Hintergrund
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mittel-Linie
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = "#0ff";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  // Paddles
  ctx.fillStyle = "#0ff";
  ctx.fillRect(20, leftY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - 30, rightY, paddleWidth, paddleHeight);

  // Ball
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
  ctx.fill();

  // Score
  ctx.font = "36px Orbitron";
  ctx.fillText(playerScore, canvas.width / 2 - 60, 40);
  ctx.fillText(aiScore, canvas.width / 2 + 40, 40);

  // Ballbewegung
  ballX += ballVX;
  ballY += ballVY;

  // Kollision oben/unten
  if (ballY <= 0 || ballY >= canvas.height) ballVY *= -1;

  // KI bewegt sich in Richtung Ball
  let target = ballY - paddleHeight / 2;
  leftY += (target - leftY) * aiDifficulty;

  // Kollision mit Paddles
  if (
    ballX <= 30 &&
    ballY > leftY &&
    ballY < leftY + paddleHeight
  ) {
    ballVX *= -1;
    ballVY += (ballY - (leftY + paddleHeight / 2)) * 0.1;
    hitSound.play();
  }

  if (
    ballX >= canvas.width - 30 &&
    ballY > rightY &&
    ballY < rightY + paddleHeight
  ) {
    ballVX *= -1;
    ballVY += (ballY - (rightY + paddleHeight / 2)) * 0.1;
    hitSound.play();
  }

  // Punkte
  if (ballX < 0) {
    scoreSound.play();
    playerScore++;
    resetBall();
  }
  if (ballX > canvas.width) {
    scoreSound.play();
    aiScore++;
    resetBall();
  }

  requestAnimationFrame(draw);
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballVX = -ballVX;
  ballVY = (Math.random() - 0.5) * 8;
}

draw();
