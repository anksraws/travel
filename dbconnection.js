// FILE THAT CREATES MONGODB CONNECTION

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const express = require('express');
const app = express();

MongoClient.connect(url, {
 useNewUrlParser: true
}, (err, db) => {
 if (err) {
  console.log(err);
 } else {
  global.dbo = db.db("travel");
 }
});