const exec = require('child_process').exec;

const command = `mongoimport --db silverspoon --collection restaurantmenus --file testdata.json --numInsertionWorkers 25`;

exec(command);
