/**
* Module dependencies.
*/
var CommentDAL = require('../dal/commentDal');
var MembershipFilters = require('../../middleware/membershipFilters');

/**
* commentApiController class
*/
(function () {

    /**
    * Attributes.
    */
    var commentDAL = new CommentDAL();
    var filters = new MembershipFilters();

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
        app.post('/api/comments', filters.authorize, this.post);
        app.delete('/api/comments/:id', filters.authorize, this.destroy);
    };

    /**
    * [httppost]
    * commentApiController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    commentApiController.prototype.post = function(req, res) {
        var comment = req.body;
        if(comment.movieId && comment.userId){
            res.send(400);
        }else{
            comment.publicationDate = new Date();
            comment.authorId = req.user.id;
            commentDAL.save(req.body, function (comment) {
                res.send(comment);
            });
        }
    };

    /**
    * [httpdelete]
    * commentApiController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    commentApiController.prototype.destroy = function(req, res) {
        var commentId = req.params.id;
        commentDAL.get(commentId, function(comment){
            if(comment.authorId == req.user.id){
                commentDAL.remove(commentId, function () {
                    res.send('comments deleted');
                });
            }
            else{
                res.send(403);
            }
        });
    };

    module.exports = commentApiController;
})();