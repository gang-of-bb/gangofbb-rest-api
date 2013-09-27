module.exports = function (db, DataTypes) {

	var User = db.define('user', {
		username: DataTypes.STRING,
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		city: DataTypes.STRING,
		birthday: DataTypes.DATE,
		gender: DataTypes.ENUM('male', 'female')
	}, {
		timestamps: false,
	});

	return User;
}