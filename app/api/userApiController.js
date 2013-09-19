var MembershipFilters = require('../../middleware/membershipFilters');

/**
 * UserApiController class.
 */
(function(){

	var filters = new MembershipFilters();

	/**
	* Constructor.
	*/
	function UserApiController(app){
		this.routes(app);
	};

	/**
	 * routes
	 * @param  {[type]} app
	 */
	UserApiController.prototype.routes = function(app) {
		app.get('/api/users/self', filters.authorize,  this.user);
	};

	/**
	* Method description.
	*/
	UserApiController.prototype.user = function(req, res) {
		var userDto = {};
		userDto.id = req.user.id;
		userDto.username = req.user.username;
		res.send(userDto);
	};

	module.exports = UserApiController;
})();