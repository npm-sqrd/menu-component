require('newrelic');
const http = require('http');
const fs = require('fs');
const path = require('path');
const dbHelpers = require('../../seedDatabase');
const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient('redis://redis:6379');

http.createServer((req, res) => {
  if (req.url === '/') {
    const htmlFile = path.join(__dirname, '../client/index.html');
    fs.readFile(htmlFile, 'UTF-8', (err, html) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    });
  } else if (req.url === '/bundle.js') {
    const bundle = path.join(__dirname, '../public', req.url);
    const fileStream = fs.createReadStream(bundle, 'UTF-8');
    res.writeHead(200);
    fileStream.pipe(res);
  } else if (req.url === '/app.js') {
    const bundle = path.join(__dirname, '../../public/app.js');
    const fileStream = fs.createReadStream(bundle, 'UTF-8');
    res.writeHead(200);
    fileStream.pipe(res);
  } else if (req.url === '/app-server.js') {
    const bundle = path.join(__dirname, '../../public/app-server.js');
    const fileStream = fs.createReadStream(bundle, 'UTF-8');
    res.writeHead(200);
    fileStream.pipe(res);
  } else if (req.url.match(/\/restaurants\/\S*\/menu\/\S*\/\S*/)) {
    const urlArr = req.url.split('/');
    const name = urlArr[2];
    const meal = urlArr[4];
    const tag = urlArr[5];
    const redisKey = `${name}${meal}${tag}`;
    const queryObj = {
      name: name,
      query: `menu.${meal}`,
    };
    client.get(redisKey, (err, reply) => {
      if (reply || err === null) {
        dbHelpers.find(queryObj, (error, result) => {
          const menu = result.menu[meal];
          const filteredMenu = menu.filter(item => item.tags === tag);
          client.setex(redisKey, 180, JSON.stringify(filteredMenu));
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(filteredMenu));
        });
      } else if (reply) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(reply);
      }
    });
  } else if (req.url.match(/\/restaurants\/\S*\/menu\/\S*/)) {
    const urlArr = req.url.split('/');
    const name = urlArr[2];
    const meal = urlArr[4];
    const redisKey = `${name}${meal}`;
    const queryObj = {
      name: name,
      query: `menu.${meal}`,
    };
    client.get(redisKey, (err, reply) => {
      if (reply || err === null) {
        dbHelpers.find(queryObj, (err, result) => {
          client.setex(redisKey, 180, JSON.stringify(result));
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result.menu[meal]));
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(reply);
      }
    });
  }
}).listen(3500);
