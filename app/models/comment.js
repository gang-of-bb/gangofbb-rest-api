module.exports = function (db, DataTypes) {

	var comment = db.define('comment', {
		content: DataTypes.TEXT,
		publicationDate : DataTypes.DATE
	}, {
		timestamps: false,
	});
	return comment;
}