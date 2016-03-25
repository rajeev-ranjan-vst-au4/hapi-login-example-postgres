require('env2')('./config.env'); // see: https://github.com/dwyl/env2
var assert = require('assert');
var pg = require('pg');

function create_tables (callback) {
  var client = new pg.Client(process.env.DATABASE_URL);
  client.connect(function(err) {
    assert(!err); // die if we cannot connect
    var file = require('path').resolve(__dirname + '/database_setup.sql');
    var query = require('fs').readFileSync(file, 'utf8').toString();
    console.log('\n', query);
    client.query(query, function(err, result) {
      client.end(); // close connection to database
      require('decache')(_pg);
      return callback(err, result);
    });
  });
}

create_tables(function (err, data) {
  console.log(err, data, 'DB Table Created & Test Data Inserted');
});
