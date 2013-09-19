/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* movieDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

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
            callback(movie);
        });
    };

    /**
     * get all movie
     * @param  {Function} callback
     */
    movieDAL.prototype.getAll = function(predicate, callback) {
        dbContext.movie.findAll(predicate).success(function(movies) {
            callback(movies);
        });
    };

    module.exports = movieDAL;
})();