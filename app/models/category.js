module.exports = function (db, DataTypes) {

	var category = db.define('category', {
		name: DataTypes.STRING
	});
	
	return category;
}