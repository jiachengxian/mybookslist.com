const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-ieve0.mongodb.net/test?retryWrites=true";
const Client = new MongoClient(uri, { useNewUrlParser: true });

//export connection client
module.exports = Client;