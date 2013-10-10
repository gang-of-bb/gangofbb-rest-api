/**
 * UserMapper class.
 */
(function(){

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

        if(isComplete){
        	var commentsDto   = {};
			commentsDto.count = user.comments == null ? null : user.comments.length;
			commentsDto.items = this.userCommentToDtos(user.comments);
			dto.comments = commentsDto;
        }

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

	/**
	 * comment with user to commentDto
	 * @param  {[type]} comments
	 */
	UserMapper.prototype.userCommentToDto = function(comment) {
		var dto = {};
		dto.content = comment.content;
		dto.publicationDate = comment.publicationDate;
		dto.id = comment.id;
		if(comment.author){
			dto.author = this.toDto(comment.author, false);
		}else{
			dto.authorId = comment.authorId;
		}
		return dto;
	};

	/**
	 * array of userComment toDto
	 * @param  {[type]} comments
	 */
	UserMapper.prototype.userCommentToDtos = function(comments) {
		var dtos = [];
		for (var i = 0; i < comments.length; i++) {
			dtos.push(this.userCommentToDto(comments[i]));
		};
		return dtos;
	};

	module.exports = UserMapper;
})();