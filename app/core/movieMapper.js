var CommentMapper = require('./commentMapper');

/**
 * MovieMapper class.
 */
(function(){

    var commentMapper = new CommentMapper();

	/**
	* Constructor.
	*/
	function MovieMapper(){};

    /**
     * movie entity to dto
     * @param  {Entity} movie
     * @return {Object} dto
     */
	MovieMapper.prototype.toDto = function(movie, isComplete) {		
		var dto = {};

        dto.id            = movie.id;
        dto.title         = movie.title;
        dto.description   = movie.description;
        dto.image         = movie.image;
        dto.trailerUrl    = movie.trailerUrl;
        dto.rate          = movie.rate;
        dto.category      = movie.category;
        
        var commentsDto   = {};
        commentsDto.count = movie.comments == null ? null : movie.comments.length;

        if(isComplete){
            commentsDto.items = commentMapper.toDtos(movie.comments);
            dto.isliked = movie.isliked;
        }
        dto.comments = commentsDto;

        return dto;
	};

    /**
     * movies entity to dto
     * @param  {Entity} movie
     * @return {Object} dto
     */
	MovieMapper.prototype.toDtos = function(movies, isComplete) {
		var dtos = [];

        for (var i = 0; i < movies.length; i++) {
            dtos.push(this.toDto(movies[i], isComplete));
        };

        return dtos;
	};

	module.exports = MovieMapper;
})();