const menu = require('../helpers/menuGenerator');
const faker = require('faker');
const fs = require('fs');

// Instantiate Chance so it can be used

const sampleDataGen = (i) => {
  const dataArr = [];
  const data = [];
    dataArr.push({
      id: i,
      name: `restaurant${i}`,
      menu: {
        lunch: menu.entreeMenuGen(),
        dinner: menu.entreeMenuGen(),
        dessert: menu.dessertMenuGen(),
      },
    });
  return dataArr[0];
};


const sampleData = sampleDataGen;
module.exports = sampleData;
