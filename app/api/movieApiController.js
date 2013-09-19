/**
* Module dependencies.
*/
var MovieDAL = require('../dal/movieDAL');
var CategoryDal = require('../dal/categoryDAL');

/**
* movieApiController class
*/
(function () {

    /**
    * Attributes.
    */
    var movieDAL = new MovieDAL();
    var categoryDAL = new CategoryDal();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function movieApiController(app) {
        this.routes(app);
    }

    /**
    * movieApiController routes.
    * @param {app} - express app.
    */
    movieApiController.prototype.routes = function(app) {
        app.get('/api/movies', this.getAll);
        app.get('/api/movies/:id', this.get);
    };

    /**
    * [httpget]
    * movieApiController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    movieApiController.prototype.getAll = function(req, res) {
        var predicate = movieSearchPredicateBuilder(req.query);        
        movieDAL.getAll(predicate, function (movies) {
            res.send(movies);
        });
    };

    /**
    * [httpget]
    * movieApiController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    movieApiController.prototype.get = function(req, res) {
        var movieId = req.params.id;
        movieDAL.get(movieId, function (movie) {
            if(movie){
            	res.send(movie);
            }
            else{
            	res.send(404);
            }
        });
    };

    /**
     * return predicate from queryString
     * @param  {[String]} queryString
     * @return {[prdicate]}
     */
    function movieSearchPredicateBuilder(queryString){
        var predicate = {order: 'id DESC'};
        var whereClause = [];

        var categoryId = queryString.categoryId;
        var keyword = queryString.keyword;
        var offset = queryString.offset;
        var limit = queryString.limit;

        var whereSql = "";
        if(keyword)
            whereSql += "title LIKE '"+keyword+"%'";
        if(categoryId){
            if(whereSql){whereSql += " AND ";}
            whereSql += "categoryId = " + categoryId;
        }
        if(whereSql)
            whereClause.push(whereSql);

        if(limit)
            predicate.limit = limit;
        if(offset)
            predicate.offset = offset;

        predicate.where = whereClause.length == 0 ? null : whereClause;

        return predicate;
    }

    module.exports = movieApiController;
})();