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
