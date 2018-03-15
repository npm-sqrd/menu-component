const db = require('./db/dbHelpers');
const sampleData = require('./data/sampleData');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/silverspoon';

mongoose.connect('mongodb://localhost/silverspoon');
