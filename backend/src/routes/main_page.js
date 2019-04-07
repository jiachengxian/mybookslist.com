const STATIC_DB_NAME = 'Static_Data';
const BOOK_COLLECTION_NAME = 'Books';

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
}