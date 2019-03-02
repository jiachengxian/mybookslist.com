const express = require('express');
const body_parser = require('body-parser');
const client = require('./components/connection/setup_mongo_client');
const app = express();
const PORT = 3000;
const router = express.Router();

//apply body parser to app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to database
client.connect()
.then((database)=>{
    console.log('Successfully connected to MongoDB...');
    app.listen(PORT);
    console.log(`Listening on port ${PORT}`);
    app.use('/',router);
    require('./routes/main_page')(router,database);
})
.catch(console.error);

/*  Reference code for db connection
        db.db(STATIC_DB_NAME).collection(BOOK_COLLECTION_NAME).find({"Title":{$exists:true}}).toArray()
        .then((docs)=>{
            //for each book do x
            docs.forEach(function(doc){
                console.log(doc);
            });
        })
        .catch(console.error);*/