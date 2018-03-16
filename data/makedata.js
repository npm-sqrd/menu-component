const sampleData = require('./sampleData');
const fs = require('fs');
const exec = require('child_process').exec;

const writeStream = fs.createWriteStream('./testdata.json');

const makeData = (num) => {
  const command = `mongoimport --db silverspoon --collection restaurantmenus --file testdata.json --numInsertionWorkers 25`;
  let freeSpace = true;
  let index = num;

  while (index < 20000000 && freeSpace) {
    freeSpace = writeStream.write(JSON.stringify(sampleData(index)) + '\n');
    index += 1;
  }
  if (index > 19999999) {
    console.log('Running seed command')
    exec(command);
  }
  if (index % 100000 === 0) {
    console.log('Just hit', index);
  }
  if (index < 20000000) {
    writeStream.once('drain', () => makeData(index));
  }
};

makeData(10000000);




// for (let i = 10000000; i < 11000000; i += 1) {
//   fs.appendFileSync('./testdataspeed.json', JSON.stringify(sampleData(i))+'\n');
// }

// mongoimport --db silverspoontest --collection restaurantmenus --file testdata.json --numInsertionWorkers 8

// ***failed attempt***
// const writeDataFast = () => {
//   const innerRecursive = (numLeft) => {
//     if (numLeft === 10000000) {
//       console.log('finished');
//       return;
//     }
//     fs.appendFileSync('./testdataspeed.json', JSON.stringify(sampleData(numLeft))+'\n');
//     innerRecursive(numLeft - 1);
//   };
//   innerRecursive(11000000)
// };
//
// writeDataFast();
// const writeDataFast = (num) => {
//   while (num !== 20000000) {
//     fs.appendFileSync('./testdataspeed.json', JSON.stringify(sampleData(num))+'\n');
//     num += 1;
//   }
// };
//
// writeDataFast(19000000);
