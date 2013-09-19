/**
* Module dependencies.
*/
var CommentDAL = require('../dal/commentDAL');

/**
* commentApiController class
*/
(function () {

    /**
    * Attributes.
    */
    var commentDAL = new CommentDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function commentApiController(app) {
        this.routes(app);
    }

    /**
    * commentApiController routes.
    * @param {app} - express app.
    */
    commentApiController.prototype.routes = function(app) {
        app.post('/api/comments', this.post);
        app.delete('/api/comments', this.delete);
    };

    /**
    * [httppost]
    * commentApiController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    commentApiController.prototype.post = function(req, res) {
        commentDAL.save(req.body, function (comment) {
            res.send(comment);
        });
    };

    /**
    * [httpdelete]
    * commentApiController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    commentApiController.prototype.delete = function(req, res) {
        commentDAL.remove(req.body.id, function () {
            res.send({mesage: 'comment delete'});
        });
    };

    module.exports = commentApiController;
})();