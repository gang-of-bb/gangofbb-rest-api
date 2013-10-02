/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');
var MovieMapper = require('../core/movieMapper');

/**
* movieDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();
    var movieMapper = new MovieMapper();

    /**
    * Constructor.
    */
    function movieDAL() {
		
    }

	/**
     * get movie by id
     * @param  {Integer}   movieId
     * @param  {Function} callback
     */
    movieDAL.prototype.get = function(movieId, callback) {
        dbContext.movie.find(
        { 
            where: { id: movieId },
            include: [dbContext.category, { model: dbContext.comment, as: 'Comments' }]
        })
        .success(function(movie) {
            callback(movieMapper.toDto(movie, true));
        });
    };

    /**
     * get all movie
     * @param  {Function} callback
     */
    movieDAL.prototype.getAll = function(predicate, callback) {
        predicate.include = [{ model: dbContext.comment, as: 'Comments' }];
        dbContext.movie.findAll(predicate).success(function(movies) {
            callback(movieMapper.toDtos(movies, false));
        });
    };

    /**
     * get movies liked by user
     * @param  {[type]}   userId
     * @param  {Function} callback
     */
    movieDAL.prototype.getLikedMovies = function(userId, callback) {
        dbContext.user.find(userId).success(function(user){
            if(user){
                user.getMovies().success(function(movies) {
                    callback(movieMapper.toDtos(movies));
                });
            }else{
                callback(null);
            }
        });
    };

    /**
     * like movie.
     * @param  {[type]}   userId
     * @param  {[type]}   movieId
     * @param  {Function} callback
     */
    movieDAL.prototype.likeMovie = function(userId, movieId, callback) {
        dbContext.movie.find(movieId).success(function(movie){
            if(movie){      
                dbContext.user.find(userId).success(function(user){
                    if(user){
                        movie.addLiker(user).success(function(){
                            callback(true);
                        });
                    }else{
                        callback(false);
                    }
                });
            }else{
                callback(false);
            }
        });
    };

    /**
     * dislike movie
     * @param  {[type]}   userId
     * @param  {[type]}   movieId
     * @param  {Function} callback
     */
    movieDAL.prototype.dislikeMovie = function(userId, movieId, callback) {
        dbContext.movie.find(movieId).success(function(movie){
            if(movie){      
                dbContext.user.find(userId).success(function(user){
                    if(user){
                        movie.removeLiker(user).success(function(){
                            callback(true);
                        });
                    }else{
                        callback(false);
                    }
                });
            }else{
                callback(false);
            }
        });
    };

    module.exports = movieDAL;
})();