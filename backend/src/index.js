const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const client = require('./components/connection/setup_mongo_client');
const app = express();
const PORT = 8000;
const router = express.Router();

//apply body parser to app
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//set permissions
app.use(cors({origin:"http://localhost:3000"}));

//connect to database
client.connect()
.then((database)=>{
    console.log('Successfully connected to MongoDB...');
    app.listen(PORT);
    console.log(`Listening on port ${PORT}`);
    app.use('/',router);
    require('./routes/routes.js')(router,database);
})
.catch(console.error);
