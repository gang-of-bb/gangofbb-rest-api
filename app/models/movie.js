module.exports = function (db, DataTypes) {

	var movie = db.define('movie', {
		title: DataTypes.STRING,
		description: DataTypes.TEXT,
		image : DataTypes.STRING,
		trailerUrl : DataTypes.STRING
	});
	
	return movie;
}