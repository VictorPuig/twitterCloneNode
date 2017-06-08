var spawn = require('child_process').spawn;
var dbName = 'twitter';
var resolve = function resolve(str) {
  return str.replace(/%([^%]+)%/g, function(_,n) {
    return process.env[n];
  });
};

var mongoRoute = resolve('%ProgramFiles%\\MongoDB\\Server\\3.4\\bin\\mongo.exe');

console.log('Clearing database ', dbName, '...');
spawn(mongoRoute,  ['twitter', '--eval', 'db.dropDatabase()']);
console.log('Done');
