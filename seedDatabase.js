const sampleData = require('./data/sampleData');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/silverspoon';

mongoose.connect('mongodb://mongo/silverspoon');

const restaurantSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  menu: {
    lunch: [{
      foodItem: String,
      cost: Number,
      tags: String,
    }],
    dinner: [{
      foodItem: String,
      cost: Number,
      tags: String,
    }],
    dessert: [{
      foodItem: String,
      cost: Number,
      tags: String,
    }],
  },
}).index({ name: 1 });

const Restaurant = mongoose.model('restaurantMenus', restaurantSchema);

// Restaurant.init().then(() => mongoose.disconnect());

const save = (options, cb) => {
  const { data } = options;
  const Model = options.model;
  let count = 0;
  const idArr = [];
  data.forEach((item) => {
    const instance = new Model({
      id: item.id,
      name: item.name,
      menu: {
        lunch: item.menu.lunch,
        dinner: item.menu.dinner,
        dessert: item.menu.dessert,
      },
    });
    if (!idArr.includes(item.id)) {
      idArr.push(item.id);
      Model.create(instance, (err, result) => {
        count += 1;
        if (err) {
          console.log('ERR: duplicate title already found in collection');
        }
        if (count === data.length) {
          cb(result);
        }
      });
    } else {
      count += 1;
    }
  });
};

const find = (options, cb) => {
  const query = options.query || 'menu.lunch';
  const name = options.name || 'restaurant15555555';
  if (query === '{}') {
    Restaurant.findOne({ 'name': name }).exec((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    });
  } else {
    Restaurant.findOne({ 'name': name }).select(query).exec((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    });
  }
};

module.exports.save = save;
module.exports.find = find;
module.exports.Restaurant = Restaurant;
