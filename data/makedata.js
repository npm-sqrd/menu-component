const sampleData = require('./sampleData');
const fs = require('fs');

for (let i = 10000000; i < 20000001; i += 1) {
  fs.appendFileSync('./testdata.json', JSON.stringify(sampleData(i))+'\n');
}

// mongoimport --db silverspoontest --collection restaurantmenus --file testdata.json --numInsertionWorkers 25
