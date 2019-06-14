//MongoDB Native
const dbhelpers = require('./helper')

//Mongoose
// const dbhelpers = require('../database/dbhelpersMongo.js');

//PosgreSQL
// const dbhelpers = require('../database/postgres/dbhelperSQL.js');

//rawPostgres
// const dbhelpers = require('../database/postgres-raw/dbhelperRawSQL.js');
// ---------------------radis--------------------------
const redis = require('redis'); 
const client = redis.createClient()
//default port is 6379

// const RedisClustr = require('redis-clustr');

// const client = new RedisClustr({
//   servers: [
//     {
//       host: '127.0.0.1',
//       port: 30001
//     },
//     {
//       host: '127.0.0.1',
//       port: 30002
//     },
//     {
//       host: '127.0.0.1',
//       port: 30003
//     },
//     {
//       host: '127.0.0.1',
//       port: 30004
//     },
//     {
//       host: '127.0.0.1',
//       port: 30005
//     },
//     {
//       host: '127.0.0.1',
//       port: 30006
//     }
//   ]
// });

client.on('error', (err) => {
    console.log("Error in Redis: " + err)
});
// ---------------------radis--------------------------
const controller = {
  getpurses: (req, res) => {
    let trend = Math.floor((new Date()).getHours()/24*499900);
    let randomNum = 9500000 + trend + Math.floor(Math.random()*100);
    dbhelpers.get('purses',randomNum)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  },
  getshoes: (req, res) => {
    // limit it to 100 options.
    let trend = Math.floor((new Date()).getHours()/24*499900);
    let randomNum = 9500000 + trend + Math.floor(Math.random()*100);
    const shoesRedisKey = `shoes${randomNum}`
    client.get(shoesRedisKey, (err, shoes)=>{
      if (shoes){
        res.status(200).send(JSON.parse(shoes))
      } else {
        dbhelpers.get('shoe', randomNum)
          .then(data => {
            client.setex(shoesRedisKey, 900, JSON.stringify(data))
            res.status(200).send(data)
          })
          .catch(err => res.status(404).send(err))
      }
    })
  },
  getearrings: (req, res) => {
    let trend = Math.floor((new Date()).getHours()/24*499900);
    let randomNum = 9500000 + trend + Math.floor(Math.random()*100);
    dbhelpers.get('earrings',randomNum)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  },
  getbracelets: (req, res) => {
    let trend = Math.floor((new Date()).getHours()/24*499900);
    let randomNum = 9500000 + trend + Math.floor(Math.random()*100);
    dbhelpers.get('bracelet',randomNum)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err))
  },
  getdresses: (req, res) => {
    let trend = Math.floor((new Date()).getHours()/24*499900);
    let randomNum = 9500000 + trend + Math.floor(Math.random()*100);
    dbhelpers.get('dress',randomNum)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send(err))
  },
  postshoes: (req, res) =>{
    dbhelpers.post()
    .then(msg => res.status(201).send(msg))
    .catch(err => res.status(404).send(err))
  }
}

module.exports = controller;