require('dotenv').config()
const exec = require('child_process').exec;
const path = require('path');
const express = require('express');
const app = express();
const process = require('process');
const PORT = process.env.PORT;

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'))
});

app.get('/shutdown', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shutting-down.html'))
  // shutdown computer
  shutdown(function (output) {
    console.log('received shutdown command');
  });
})

app.get('/cancelShutdown', (req, res) => {
  cancelShutdown(function (output) {
    console.log('received cancel shutdown command');
  });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`)
})

// Create shutdown function
function shutdown(callback) {
  exec('shutdown -s -t 0030', function (error, stdout, stderr) { callback(stdout); });
}

function cancelShutdown(callback) {
  exec('shutdown -a', function (error, stdout, stderr) { callback(stdout); });
}