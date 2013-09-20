var MembershipFilters = require('../../middleware/membershipFilters');

/**
* homeController class
*/
(function () {

    var filters = new MembershipFilters();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function HomeController(app) {
        this.routes(app);
    }

    /**
     * Controller routes
     * @param  {express} app
     */
    HomeController.prototype.routes = function(app) {
        app.get('/', this.index);
        app.get('/home', this.index);
        app.get('/home/index', this.index);
        app.get('/home/documentation', this.docs);
        app.get('/home/application', filters.authorize, this.app);
    };

    /**
     * [HttpGet].
     * index action
     * @param  {request} req
     * @param  {response} res
     */
    HomeController.prototype.index = function(req, res) {
        res.render('home/index');
    };

    /**
     * [HttpGet].
     * docs action
     * @param  {request} req
     * @param  {response} res
     */
    HomeController.prototype.docs = function(req, res) {
        res.render('home/docs');
    };

    /**
     * application page
     * @param  {[type]} req
     * @param  {[type]} res
     */
    HomeController.prototype.app = function(req, res) {
        res.render('home/application');
    };

    module.exports = HomeController;
})();