const assert = require('assert');
const client = require('./setup_Connection.ts');

const static_DB_name = 'Static_Data';
const book_collection_name = 'Books';
const author_collection_name = 'Authors';


//connect to database
client.connect(function(err){
    assert.equal(err,null);
    console.log("Connected to MongoDB...");

    //find static data -> books collection
    const collection = client.db(static_DB_name).collection(book_collection_name);

    //find all books that have a title
    collection.find({"Title":{$exists:true}}).toArray(function(err,docs){
        assert.equal(err,null);
        assert.notEqual(docs.length,0);

        //for each book do x
        docs.forEach(function(doc){
            console.log(doc);
        });
    });

    client.close();
});
