/**
* Module dependencies.
*/
var MovieDAL = require('../dal/movieDal');
var CategoryDal = require('../dal/categoryDal');
var UserDal = require('../dal/userDal');
var MembershipFilters = require('../../middleware/membershipFilters');

/**
* movieApiController class
*/
(function () {

    /**
    * Attributes.
    */
    var movieDAL = new MovieDAL();
    var categoryDAL = new CategoryDal();
    var userDal = new UserDal();
    var filters = new MembershipFilters();

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
        app.post('/api/movies/:id/like', filters.authorize, this.like);
        app.post('/api/movies/:id/dislike', filters.authorize, this.dislike);
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
    * [httppost]
    * movieApiController like action.
    * @param {req} http request.
    * @param {res} http response.
    */
    movieApiController.prototype.like = function(req, res) {
        var movieId = req.params.id;
        movieDAL.likeMovie(req.user.id, movieId, function(data){
            if(data){
                res.send('liked');
            }else{
                res.send(404);
            }
        });
    };

    /**
    * [httppost]
    * movieApiController dislike action.
    * @param {req} http request.
    * @param {res} http response.
    */
    movieApiController.prototype.dislike = function(req, res) {
        var movieId = req.params.id;
        movieDAL.dislikeMovie(req.user.id, movieId, function(data){
            if(data){
                res.send('disliked');
            }else{
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