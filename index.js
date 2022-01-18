
/**
 * NodeJS Twitch get-request to twitch chat relay via tmi.js
 *
 * @author    Benjamin Deutscher <ben@bdeutscher.org>
 * @version   2.0.0
 * @copyright 28.05.2021 Benjamin Deutscher
 */
console.log(`Lampe385 Twitch get-request to twitch chat relay (NodeJS ${process.version})`);
let tmi, client;
const fs = require('fs');
var config;
const parseArgs = require('minimist');
const args = parseArgs((process.argv.slice(2)));
let { Resolver } = require('dns').promises;
let dns = new Resolver({'timeout': 750});
dns.setServers(['1.1.1.1', '8.8.8.8']);
require('log-timestamp');

try {
  tmi = require('tmi.js');
  config = require("./config");
} catch(error) {
  console.log("Requirements missing! Try: npm install");
  console.log(error);
  process.exit(1);
}

// ---------------------------
// Setup
// ---------------------------
client = new tmi.Client({
  options: {
    debug: false
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: config.username,
    password: config.token
  },
  channels: config.channels
});
client.connect();

client.on('connected', (address, port) => {
  console.log(`Connected: ${address}:${port}`);
  // client.color('#2c46ff');
});

client.on('join', (channel, username, self) => {
  if(self) console.log(`${username} joined ${channel}`);
});

client.on('notice', (channel, msgid, message) => {
  console.log(`notice: [${channel}] ${msgid} => ${message}`);
});

client.on('message', (channel, userstate, message, self) => {
  if(self) return;

  console.log(`<${userstate['display-name']}> ${message}`);
});

process.on('SIGINT', function() {
  client.disconnect();
  console.log("SIGINT");
  process.exit();
});

// Require express and create an instance of it
var express = require('express');
var app = express();


// on the request to root (localhost:3000/)
app.get('/', function (req, res) {
  res.send('<b>My</b> first express http server');
});

// start the server in the port 5555 !
app.listen(5555, function () {
  console.log('Twitch get-request to chat relay listening on port 5555.');
});

try {
  const data = fs.readFileSync('./commands.json', 'utf8');
  const commands = JSON.parse(data);
  console.log("    Available Commands:")
  commands.forEach(cmd => {
    console.log(`${cmd.name.padStart(20, ' ')}: ${cmd.response}`);
     app.get(`/${cmd.name}`, function (req, res) {
       client.say(args.channel, `${cmd.response}`);
       res.send('done');
     });
  });
  console.log("========================================");
} catch (err) {
  console.log(`Error reading file from disk: ${err}`);
}
console.log(`ANSWERING IN CHANNEL: >>> ${args.channel} <<<`);
console.log("========================================");


// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// EOF
