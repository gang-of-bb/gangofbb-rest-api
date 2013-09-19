/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* commentDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function commentDAL() {
		
    }

    /**
     * save comment
     * @param  {Object}   comment
     * @param  {Function} callback
     */
    commentDAL.prototype.save = function(comment, callback) {
        var comment = dbContext.comment.build(comment);
        comment.save().success(function(comment) {
            callback(comment);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * delete an comment
     * @param  {Integer}   commentId
     * @param  {Function} callback
     */
    commentDAL.prototype.remove = function(commentId, callback) {   
        dbContext.comment.find(commentId).success(function(comment) {
			comment.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = commentDAL;
})();