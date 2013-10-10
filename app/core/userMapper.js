var CommentMapper = require('./commentMapper');

/**
 * UserMapper class.
 */
(function(){

	/**
	 * Attributes
	 */
	var commentMapper = new CommentMapper();

	/**
	* Constructor.
	*/
	function UserMapper(){

	};

	/**
	 * return dto from user entity
	 * @param  {Entity} user
	 * @return {Object} dto
	 */
	UserMapper.prototype.toDto = function(user, isComplete) {
		var dto = {};

		dto.id            = user.id;
		dto.username      = user.username;
		dto.firstname     = user.firstname;
		dto.lastname      = user.lastname;
		dto.email         = user.email;
		dto.gender        = user.gender;
		dto.city          = user.city;
		dto.birthday      = user.birthday;
		
		var commentsDto   = {};
		commentsDto.count = user.appreciations == null ? null : user.appreciations.length;

        if(isComplete){
			commentsDto.items = commentMapper.toDtos(user.appreciations);
			dto.isliked       = movie.isliked;
        }
        dto.comments = commentsDto;

		return dto;
	};

	/**
	 * return dtos array from user entity array
	 * @param  {Array(user)}  users
	 * @param  {Boolean} isComplete
	 */
	UserMapper.prototype.toDtos = function(users, isComplete) {
		var dtos = [];

        for (var i = 0; i < users.length; i++) {
            dtos.push(this.toDto(users[i], isComplete));
        };

        return dtos;
	};

	module.exports = UserMapper;
})();