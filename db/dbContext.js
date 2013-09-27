/**
* DbContext class
*/
(function () {

    var modelsPath = __dirname + '/../app/models/';

    /**
    * Constructor.
    * Add your entities 'DbSet' instance here like user.
    */
    function DbContext() {
        this.db = require('./dbConnection');
        this.entities();
        this.modelBuilder();
    }

    /**
     * Attach your model to DbContext like user to perform database sync.
     */
    DbContext.prototype.entities = function() {
        this.user = this.db.import(modelsPath + 'user');
        this.movie = this.db.import(modelsPath + 'movie');
        this.category = this.db.import(modelsPath + 'category');
        this.comment = this.db.import(modelsPath + 'comment');
    };

    /**
    * Manage Database entities associations here.
    */
    DbContext.prototype.modelBuilder = function () {
        this.category.hasMany(this.movie, {as : 'Movies'});
        this.movie.belongsTo(this.category);
        
        this.movie.hasMany(this.comment, {as : 'Comments'});
        this.comment.belongsTo(this.movie);

        this.user.hasMany(this.comment, {as : 'Comments', foreignKey: 'authorId'});
        this.user.hasMany(this.comment, {as : 'Appreciations', foreignKey: 'userId'});
        this.comment.belongsTo(this.user);
    };

    module.exports = DbContext;
})();