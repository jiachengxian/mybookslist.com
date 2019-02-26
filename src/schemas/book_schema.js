/*
MongoDB schema for book DB
Placeholder for now - will need when we build web scraper to get books off of other sites
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const book_schema = new Schema({
    Title:String,
    Author:String,
    Publish_Date:Date,
    Description:String,
    ISBN:[],
    Publisher:String,
    Image_Link:String,
    Rating:{type:Number,default:0},
    Tags:[{Tag:String}]
}, {collection:'Books'});

module.exports = mongoose.model('Books',book_schema);