module.exports = function (db, DataTypes) {

	var comment = db.define('comment', {
		
			
				content: DataTypes.TEXT,
			
		
	});
	return comment;
}