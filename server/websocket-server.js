(async () => {
  const fetch = (await import('node-fetch')).default;
  const WebSocket = require('ws');

  const wss = new WebSocket.Server({ port: 8080 });

  let lastData = null;

  // Function to fetch data from the API
  async function fetchData() {
    const url = 'https://api.jsonbin.io/v3/b/673def3ead19ca34f8cd3812/latest';
    const headers = {
      'Content-Type': 'application/json',
      'X-Access-Key': '$2a$10$QMBDDs1cMQYhTZFr2woBJejxL5jvAIjWsvaFtkfjTfuSG7uSMN3eO',
      'Cache-Control': 'no-cache',
    };

    try {
      const response = await fetch(url, { method: 'GET', headers });
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      const data = await response.json();
      // return data.record.salesPerformance;
      return data.record;
    } catch (error) {
      console.error('Error fetching API data:', error.message);
      return null;
    }
  }

  // Function to broadcast updates to all connected clients
  function broadcast(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(JSON.stringify({ type: 'update', data }));
        } catch (error) {
          console.error('Error broadcasting to client:', error.message);
        }
      }
    });
  }

  // Periodically check for updates
  const FETCH_INTERVAL = 10000; // 10 seconds
  setInterval(async () => {
    const newData = await fetchData();

    if (newData && JSON.stringify(newData) !== JSON.stringify(lastData)) {
      lastData = newData;
      broadcast(newData);
    }
  }, FETCH_INTERVAL);

  // Handle client connections
  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send the last known data to newly connected clients
    if (lastData) {
      ws.send(JSON.stringify({ type: 'update', data: lastData }));
    }

    ws.on('close', () => console.log('Client disconnected'));
  });

  console.log(`WebSocket server running on ws://localhost:8080`);
})();
