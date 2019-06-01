const STATIC_DB_NAME = 'Static_Data';
const BOOK_COLLECTION_NAME = 'Books';
const AUTHOR_COLLECTION_NAME = 'Authors';

module.exports = function handle_main_page_routes(router,db){
    //handle get request on main page
    router.route('/get_book_json/:title').get(function(req,res){
        db.db(STATIC_DB_NAME).collection(BOOK_COLLECTION_NAME).find({"Title":req.params['title']}).toArray()
        .then((docs)=>{
            //for each book do x
            docs.forEach(function(doc){
                //console.log(doc);
                res.json(doc);
            });
        })
        .catch(console.error);
    });
    router.route('/get_author_json/:name').get(function(req,res){
        db.db(STATIC_DB_NAME).collection(AUTHOR_COLLECTION_NAME).find({"Name":req.params['name']}).toArray()
        .then((docs)=>{
            docs.forEach(function(doc){
                res.json(doc);
            })
        })
    });
    router.route('/search/book/:search_query').get(function(req,res){
        db.db(STATIC_DB_NAME).collection(BOOK_COLLECTION_NAME).find({"Title":{'$regex':req.params['search_query'], '$options': 'i'}}, {"Title":1})
        .toArray()
        .then((docs,err)=>{
            if(err) res.writeHead(500, err.message);
            else if(!docs.length) res.writeHead(404);
            else{
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(docs.map(function(doc){return {'Title':doc.Title}})));
            }
            res.end();
        })
    });
}