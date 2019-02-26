const express = require('express');
const assert = require('assert');
const client = require('./components/connection/setup_mongo_client');
const app = express();
const PORT = 3000;

var db;

//connect to database
client.connect()
.then(()=>{
    console.log('Successfully connected to MongoDB...');
    app.listen(PORT);
    console.log(`Listening on port ${PORT}`);
    db = client.db('Static_Data');
})
.catch(console.error);


//basic router for '/' page - TODO: move all route code to /routes
app.get('/', function(res,req){
    db.collection("Books").find({"Title":{$exists:true}},function(err,docs){
        assert.equal(err,null);
        assert.notEqual(docs.length,0);

        //for each book do x
        docs.forEach(function(doc){
            console.log(doc);
        });
    });
});