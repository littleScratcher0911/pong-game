const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Verbunden mit dem Server');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Verarbeite die empfangenen Daten (z. B. Gegnerposition)
};

function sendMove(direction) {
  const moveData = JSON.stringify({ type: 'move', direction });
  socket.send(moveData);
}

const canvas = document.getElementById('gameCanvas');

canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

let touchStartY = 0;

function handleTouchStart(event) {
  touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  const touchY = event.touches[0].clientY;
  const deltaY = touchY - touchStartY;
  // Bewege das Paddle basierend auf deltaY
}

function handleTouchEnd() {
  // Beende die Bewegung
}
