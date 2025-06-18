const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let players = [];

wss.on('connection', (ws) => {
  players.push(ws);
  console.log('Ein Spieler verbunden');

  ws.on('message', (message) => {
    // Sende die Nachricht an alle anderen Spieler
    players.forEach((player) => {
      if (player !== ws && player.readyState === WebSocket.OPEN) {
        player.send(message);
      }
    });
  });

  ws.on('close', () => {
    players = players.filter((player) => player !== ws);
    console.log('Ein Spieler getrennt');
  });
});

console.log('Server läuft auf ws://localhost:8080');
