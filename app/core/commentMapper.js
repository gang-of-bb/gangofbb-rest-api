var UserMapper = require('./userMapper');

/**
 * CommentMapper class.
 */
(function(){
	
	/**
	 * Attributes
	 */
	var userMapper = new UserMapper();

	/**
	* Constructor.
	*/
	function CommentMapper(){

	};

	/**
	 * [ToDto description]
	 * @param {[type]} comment [description]
	 */
	CommentMapper.prototype.toDto = function(comment) {
		var dto = {};
		dto.content = comment.content;
		dto.publicationDate = comment.publicationDate;
		dto.id = comment.id;
		if(comment.author){
			dto.author = userMapper.toDto(comment.author, true);	
		}else{
			dto.authorId = comment.authorId;
		}
		return dto;
	};

	/**
	 * [toDtos description]
	 * @param  {[type]} comments [description]
	 * @return {[type]}          [description]
	 */
	CommentMapper.prototype.toDtos = function(comments) {
		var dtos = [];
		for (var i = 0; i < comments.length; i++) {
			dtos.push(this.toDto(comments[i], true));
		};
		return dtos;
	};

	module.exports = CommentMapper;
})();