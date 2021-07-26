const express = require('express');
const fs = require('fs');
const path = require('path');
var r = require('rethinkdb');
var config = require(__dirname + '/config.js');
var async = require('async');
var bodyParser = require('body-parser');
var cors = require('cors')


const app = express(),
			DIST_DIR = __dirname+'/public',
			HTML_FILE = DIST_DIR + '/public/index.html';
app.use(express.static(DIST_DIR));

app.use(cors());
app.use( bodyParser.json() );

/*
 * Insert a new customer item.
 */
function createCustomerItem(req, res, next) {
	console.log(req);
	var todoItem = req.body;
	todoItem.createdAt = r.now();

	console.dir(todoItem);

	r.table('customers').insert(todoItem, {returnChanges: true}).run(req.app._rdbConn, function(err, result) {
	  if(err) {
		return next(err);
	  }

	  res.json(result.changes[0].new_val);
	});
}

app.get('/', function(req, res) {
	res.sendFile(HTML_FILE);
});

//The REST routes for "customers".
app.route('/add')
  .post(createCustomerItem);

//If we reach this middleware the route could not be handled and must be unknown.
app.use(handle404);

//Generic error handling middleware.
app.use(handleError);

/*
 * Page-not-found middleware.
 */
function handle404(req, res, next) {
	res.status(404).end('not found');
}

/*
* Generic error handling middleware.
* Send back a 500 page and log the error to the console.
*/
function handleError(err, req, res, next) {
	console.error(err.stack);
	res.status(500).json({err: err.message});
}
/*
 * Store the db connection and start listening on a port.
 */
function startExpress(connection) {
	app._rdbConn = connection;
	app.listen(config.express.port);
	console.log('Listening on port ' + config.express.port);
}

/*
 * Connect to rethinkdb, create the needed tables/indexes and then start express.
 * Create tables/indexes then start express
 */
async.waterfall([
	function connect(callback) {
	  r.connect(config.rethinkdb, callback);
	},
	function createDatabase(connection, callback) {
	  //Create the database if needed.
	  r.dbList().contains(config.rethinkdb.db).do(function(containsDb) {
		return r.branch(
		  containsDb,
		  {created: 0},
		  r.dbCreate(config.rethinkdb.db)
		);
	  }).run(connection, function(err) {
		callback(err, connection);
	  });
	},
	function createTable(connection, callback) {
	  //Create the table if needed.
	  r.tableList().contains('customers').do(function(containsTable) {
		return r.branch(
		  containsTable,
		  {created: 0},
		  r.tableCreate('customers')
		);
	  }).run(connection, function(err) {
		callback(err, connection);
	  });
	},
	function createIndex(connection, callback) {
	  //Create the index if needed.
	  r.table('customers').indexList().contains('createdAt').do(function(hasIndex) {
		return r.branch(
		  hasIndex,
		  {created: 0},
		  r.table('customers').indexCreate('createdAt')
		);
	  }).run(connection, function(err) {
		callback(err, connection);
	  });
	},
	function waitForIndex(connection, callback) {
	  //Wait for the index to be ready.
	  r.table('customers').indexWait('createdAt').run(connection, function(err, result) {
		callback(err, connection);
	  });
	}
  ], function(err, connection) {
	if(err) {
	  console.error(err);
	  process.exit(1);
	  return;
	}

	startExpress(connection);
});