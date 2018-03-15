const db = require('./db/dbHelpers');
const sampleData = require('./data/sampleData');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/silverspoon';

mongoose.connect('mongodb://localhost/silverspoon');

// db.save({ data: sampleData, model: db.Restaurant }, (result) => {
//   if (result) {
//     console.log('all added to db');
//     mongoose.disconnect();
//   }
// });
