const fs = require('fs');
const express = require('express');

const frontend = fs.readFileSync(__dirname + '/index.html', 'utf8');

const app = express();

const timeout = time => new Promise(res => setTimeout(res, time));
const writer = res => data => new Promise(resolve => res.write(data, resolve))

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(frontend));
  res.end(frontend);
});

app.get('/api', async (req, res) => {
  const resWrite = writer(res);
  for (let i = 0; i < 50; i++) {
    await resWrite(JSON.stringify({ counting: i }));
    await timeout(50);
  }
 
  res.end();
});

app.listen(3000, () => console.log('Click here http://localhost:3000'));
