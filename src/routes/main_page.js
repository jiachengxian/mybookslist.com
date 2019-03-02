const STATIC_DB_NAME = 'Static_Data';
const BOOK_COLLECTION_NAME = 'Books';

module.exports = function handle_main_page_routes(router,db){
    //handle get request on main page
    router.route('/').get('/', function(res,req){

    });
}