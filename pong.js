const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
let leftY = 250, rightY = 250;
let ballX = 400, ballY = 300, ballVX = 5, ballVY = 4;

let upPressed = false, downPressed = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") upPressed = true;
  if (e.key === "ArrowDown") downPressed = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") upPressed = false;
  if (e.key === "ArrowDown") downPressed = false;
});

function draw() {
  // Hintergrund
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Paddles
  ctx.fillStyle = "white";
  ctx.fillRect(20, leftY, paddleWidth, paddleHeight);     // Left
  ctx.fillRect(770, rightY, paddleWidth, paddleHeight);   // Right

  // Ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
  ctx.fill();

  // Bewegung
  if (upPressed && rightY > 0) rightY -= 6;
  if (downPressed && rightY + paddleHeight < canvas.height) rightY += 6;

  // KI links (einfach)
  if (ballY < leftY + paddleHeight / 2) leftY -= 3;
  else if (ballY > leftY + paddleHeight / 2) leftY += 3;

  // Ballbewegung
  ballX += ballVX;
  ballY += ballVY;

  // Kollision oben/unten
  if (ballY <= 0 || ballY >= canvas.height) ballVY *= -1;

  // Kollision mit Paddles
  if (ballX <= 30 && ballY > leftY && ballY < leftY + paddleHeight) ballVX *= -1;
  if (ballX >= 760 && ballY > rightY && ballY < rightY + paddleHeight) ballVX *= -1;

  // Punkt
  if (ballX < 0 || ballX > canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballVX *= -1;
  }

  requestAnimationFrame(draw);
}

draw();
