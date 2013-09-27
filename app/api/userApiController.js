var MembershipFilters = require('../../middleware/membershipFilters');
var UserDal = require('../dal/userDal');

/**
 * UserApiController class.
 */
(function(){

	/**
	 * Attributes
	 */
	var userDal = new UserDal();
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
		app.get('/api/users/self', filters.authorize,  this.show);
		app.get('/api/users/:id', filters.authorize,  this.show);
		app.put('/api/users/self', filters.authorize,  this.update);
	};

	/**
	* show user informations.
	*/
	UserApiController.prototype.show = function(req, res) {
		var user = {};
		var userId = req.params.id;

		if(userId){
			userDal.getWithComments(userId, function(userEnt){
				if(userEnt){
					res.send(toJson(userEnt, true));
				}
				else{
					res.send(404);
				}
			});
		}else{
			userDal.getWithComments(req.user.id, function(userEnt){
				if(userEnt){
					res.send(toJson(userEnt, true));
				}
				else{
					res.send(404);
				}
			});
		}
	};

	/**
	 * update user informations
	 * @param  {[type]} req
	 * @param  {[type]} res
	 */
	UserApiController.prototype.update = function(req, res) {
		var user = req.body;
		userDal.get(req.user.id, function(entity){
			if(entity){
				entity.firstname = user.firstname;
				entity.lastname = user.lastname;
				entity.gender = user.gender;
				entity.email = user.email;
				entity.city = user.city;
				userDal.update(entity, function(data){
					res.send(toJson(data, false));
				});
			}else{
				res.send(404);
			}
		});
	};

	/**
	 * return dto fropm user entity
	 * @param  {Entity} user
	 * @return {Object} dto
	 */
	function toJson(user, isComplete){
		var dto = {};

		dto.id = user.id;
		dto.username = user.username;
		dto.firstname = user.firstname;
		dto.lastname = user.lastname;
		dto.email = user.email;
		dto.gender = user.gender;
		dto.city = user.city;
		dto.birthday = user.birthday;

		if(isComplete){
			dto.comments = user.appreciations;
		}

		return dto;
	}

	module.exports = UserApiController;
})();