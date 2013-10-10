var MembershipFilters = require('../../middleware/membershipFilters');
var UserDal = require('../dal/userDal');
var MovieDal = require('../dal/movieDal');
var UserMapper = require('../core/userMapper');
var CommentMapper = require('../core/commentMapper');

/**
 * UserApiController class.
 */
(function(){

	/**
	 * Attributes
	 */
	var userDal = new UserDal();
	var movieDal = new MovieDal();
	var filters = new MembershipFilters();
	var commentMapper = new CommentMapper();
	var userMapper = new UserMapper();

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
		app.get('/api/users/:id/movies', filters.authorize,  this.moviesLiked);
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
					res.send(userMapper.toDto(userEnt, true));
				}
				else{
					res.send(404);
				}
			});
		}else{
			userDal.getWithComments(req.user.id, function(userEnt){
				if(userEnt){
					res.send(userMapper.toDto(userEnt, true));
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
					res.send(userMapper.toDto(data, false));
				});
			}else{
				res.send(404);
			}
		});
	};

	/**
	 * get movies that user liked
	 * @param  {[type]} req
	 * @param  {[type]} res
	 */
	UserApiController.prototype.moviesLiked = function(req, res) {
		var userId = req.params.id;
		movieDal.getLikedMovies(userId, function(movieDtos){
			if(movieDtos){ 
				res.send(movieDtos);
			}else{
				res.send(404);
			}
		});
	};

	module.exports = UserApiController;
})();