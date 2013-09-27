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
            callback(toDto(movie, true));
        });
    };

    /**
     * get all movie
     * @param  {Function} callback
     */
    movieDAL.prototype.getAll = function(predicate, callback) {
        predicate.include = [{ model: dbContext.comment, as: 'Comments' }];
        dbContext.movie.findAll(predicate).success(function(movies) {
            callback(toDtos(movies, false));
        });
    };


        /**
     * movies entity to dto
     * @param  {Entity} movie
     * @return {Object} dto
     */
    var toDtos = function(movies, isComplete){
        var dtos = [];

        for (var i = 0; i < movies.length; i++) {
            dtos.push(toDto(movies[i], isComplete));
        };

        return dtos;
    };

    /**
     * movie entity to dto
     * @param  {Entity} movie
     * @return {Object} dto
     */
    var toDto = function(movie, isComplete){
        var dto = {};

        dto.id            = movie.id;
        dto.title         = movie.title;
        dto.description   = movie.description;
        dto.image         = movie.image;
        dto.trailerUrl    = movie.trailerUrl;
        dto.rate          = movie.rate;
        dto.category      = movie.category;
        
        var commentsDto   = {};
        commentsDto.count = movie.comments.length;

        if(isComplete){
            commentsDto.items = movie.comments;
        }
        dto.comments = commentsDto;

        return dto;
    };

    module.exports = movieDAL;
})();