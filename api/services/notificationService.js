const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

exports.sendNotification = (userId, message) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client.userId === userId) {
      client.send(JSON.stringify({ message }));
    }
  });
};
