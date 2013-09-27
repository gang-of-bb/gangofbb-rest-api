/**
* Module dependencies.
*/
var CategoryDAL = require('../dal/categoryDAL');

/**
* categoryApiController class
*/
(function () {

    /**
    * Attributes.
    */
    var categoryDAL = new CategoryDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function categoryApiController(app) {
        this.routes(app);
    }

    /**
    * categoryApiController routes.
    * @param {app} - express app.
    */
    categoryApiController.prototype.routes = function(app) {
        app.get('/api/categories', this.getAll);
    };

    /**
    * [httpget]
    * categoryApiController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    categoryApiController.prototype.getAll = function(req, res) {
        categoryDAL.getAll(function (categories) {
            res.send(categories);
        });
    };

    module.exports = categoryApiController;
})();