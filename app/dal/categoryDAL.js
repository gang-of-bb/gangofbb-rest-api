/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* categoryDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function categoryDAL() {
		
    }

    /**
     * get all category
     * @param  {Function} callback
     */
    categoryDAL.prototype.getAll = function(callback) {
        dbContext.category.findAll({ include: [{ model: dbContext.movie, as: 'Movies' }] })
            .success(function(categories){
                callback(toDtos(categories));
        });
    };

    /**
     * return categoryDto array
     * @param  {[type]} categories with movies include
     */
    var toDtos = function(categories){
        var categoryDtos = [];
        for (var i = 0; i < categories.length; i++) {
            categoryDtos.push(toDto(categories[i]));
        };
        return categoryDtos;
    };

    /**
     * return dto from category with movies includes
     * @param  {[type]} category
     */
    var toDto = function(category){
        var categoryDto = {};
        categoryDto.id = category.id;
        categoryDto.name = category.name;
        categoryDto.createdAt = category.createdAt;
        categoryDto.updatedAt = category.updatedAt;
        categoryDto.movies = category.movies.length;
        return categoryDto;
    };

    module.exports = categoryDAL;
})();