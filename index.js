
/**
 * NodeJS Twitch get-request to twitch chat relay via tmi.js
 *
 * @author    Benjamin Deutscher <ben@bdeutscher.org>
 * @version   1.0.0
 * @copyright 28.05.2021 Benjamin Deutscher
 */
console.log(`Lampe385 Twitch get-request to twitch chat relay (NodeJS ${process.version})`);
let tmi, client;
var config;
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

// Bot TEXT commands
// =================

// !rules
app.get('/rules', function (req, res) {
  client.say(config.default_channel, `!rules hier nochmal die Chat-Regeln zum Nachlesen:`);
  res.send('done');
});

// !werke
app.get('/werke', function (req, res) {
  client.say(config.default_channel, `Unter !portfolio und !instagram könnt ihr Josys andere Werke sehen josyHype`);
  res.send('done');
});

// !ref-allg
app.get('/ref-allg', function (req, res) {
  client.say(config.default_channel, `Unter !ref könnt ihr euch die Vorlage der aktuellen Arbeit einsehen josyLove`);
  res.send('done');
});

// !socials
app.get('/socials', function (req, res) {
  client.say(config.default_channel, `!socials`);
  res.send('done');
});

// !website
app.get('/website', function (req, res) {
  client.say(config.default_channel, `!website`);
  res.send('done');
});

// !raubzug 250
app.get('/heist', function (req, res) {
  client.say(config.default_channel, `!raubzug 250`);
  res.send('done');
});

// kein Zwingor
app.get('/zwingor', function (req, res) {
  client.say(config.default_channel, `Bitte nutzt keine Zwinkersmilies josyZwingor`);
  res.send('done');
});

// !timer info
app.get('/timer-info', function (req, res) {
  client.say(config.default_channel, `!timer info`);
  res.send('done');
});

// !timer start
app.get('/timer-start', function (req, res) {
  client.say(config.default_channel, `!timer start`);
  res.send('done');
});

// !timer stop
app.get('/timer-stop', function (req, res) {
  client.say(config.default_channel, `!timer stop`);
  res.send('done');
});

// Bot SOUND commands
// ==================

// !alarm
app.get('/alarm', function (req, res) {
  client.say(config.default_channel, `!alarm`);
  res.send('done');
});

// saechsisch aus
app.get('/alarm-aus', function (req, res) {
  client.say(config.default_channel, `!alarm aus`);
  res.send('done');
});

// !mimimi
app.get('/mimimi', function (req, res) {
  client.say(config.default_channel, `!mimimi`);
  res.send('done');
});

// !nixgemacht
app.get('/nix-gemacht', function (req, res) {
  client.say(config.default_channel, `!nixgemacht`);
  res.send('done');
});

// !kitty
app.get('/kitty', function (req, res) {
  client.say(config.default_channel, `!kitty`);
  res.send('done');
});

// !magge
app.get('/magge', function (req, res) {
  client.say(config.default_channel, `!magge`);
  res.send('done');
});

// !spät
app.get('/spaet', function (req, res) {
  client.say(config.default_channel, `!spät`);
  res.send('done');
});

// !danger
app.get('/danger', function (req, res) {
  client.say(config.default_channel, `!danger`);
  res.send('done');
});

// !pewpew
app.get('/pewpew', function (req, res) {
  client.say(config.default_channel, `!pewpew`);
  res.send('done');
});

// !ohno
app.get('/oh-no', function (req, res) {
  client.say(config.default_channel, `!ohno`);
  res.send('done');
});

// !badum
app.get('/badum', function (req, res) {
  client.say(config.default_channel, `!badum`);
  res.send('done');
});

// !wow
app.get('/wow', function (req, res) {
  client.say(config.default_channel, `!wow`);
  res.send('done');
});

// !ohyeah
app.get('/oh-yeah', function (req, res) {
  client.say(config.default_channel, `!ohyeah`);
  res.send('done');
});

// !move
app.get('/move', function (req, res) {
  client.say(config.default_channel, `!move`);
  res.send('done');
});

// !sehnix
app.get('/sehnix', function (req, res) {
  client.say(config.default_channel, `!sehnix`);
  res.send('done');
});


// Sonder commands

// !special
app.get('/special', function (req, res) {
  client.say(config.default_channel, `!special`);
  res.send('done');
});

// !giveaway
app.get('/giveaway', function (req, res) {
  client.say(config.default_channel, `!giveaway`);
  res.send('done');
});

// !rabatt
app.get('/rabatt', function (req, res) {
  client.say(config.default_channel, `!rabatt`);
  res.send('done');
});


// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// EOF
