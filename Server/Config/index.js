const MongoClient = require('mongodb').MongoClient;
const MongoURI = 'mongodb://localhost:27017';
const db_name = 'Restaurant';
const client = new MongoClient(MongoURI, { useUnifiedTopology: true });

client.connect();
const db = client.db(db_name);
module.exports = db;