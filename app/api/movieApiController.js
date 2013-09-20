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
        var predicateicate = movieSearchPredicateBuilder(req.query);  
        movieDAL.getAll(predicateicate, function (movies) {
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
     * @return {[predicate]}
     */
    function movieSearchPredicateBuilder(queryString){
        var predicate = {order: 'id DESC'};

        var categoryId = queryString.categoryId;
        var keyword = queryString.keyword;
        var offset = queryString.offset;
        var limit = parseInt(queryString.limit);
        
        if(limit)
        {
            if(limit > 200)
            {
                limit = 200;
            }
        }
        else {
            limit = 20;
        }
        predicate.limit = limit;

        if(offset)
            predicate.offset = offset;

        if(keyword && categoryId)
            predicate.where = ["categoryId = ? AND title LIKE ?", categoryId, keyword+'%'];
        else if(keyword)
            predicate.where = ["title LIKE ?", keyword+'%'];
        else if(categoryId)
            predicate.where = ['categoryId = ?', categoryId];

        return predicate;
    }

    module.exports = movieApiController;
})();