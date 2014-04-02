/**
 * dependencies
 */

var Sequelize = require('sequelize'),
    config = require('../../configuration').getDbConfiguration(),
    eventEmitterToAsync = require('../../lib/util').eventEmitterToAsync,
    async = require('async'),
    ObjectID = require('mongodb').ObjectID;

/*global vars*/
var Book;

/**
 * BookDataProvider implementations for postgres datastore
 *
 * @constructor
 * @implements {BookDataProvider}
 */
PostgresBookProvider = function () {
};

/**
 * @inheritDoc
 */
PostgresBookProvider.prototype.init = function (cb) {
    var seqLize = new Sequelize(config.connectUrl);

    //define model
    Book = seqLize.define('Book', {
        _id: {type: Sequelize.STRING(24), unique: true, primaryKey: true},
        Title: Sequelize.STRING(255),
        Text: Sequelize.TEXT,
        Author: Sequelize.STRING(127),
        Tags: Sequelize.ARRAY(Sequelize.STRING(20))
    });

    //sync
    eventEmitterToAsync(seqLize.sync(), cb);
};

/**
 * @inheritDoc
 */
PostgresBookProvider.prototype.findAll = function (cb) {
    eventEmitterToAsync(Book.findAll(), cb);
};

/**
 * @inheritDoc
 */
PostgresBookProvider.prototype.save = function (book, cb) {
    book._id = new ObjectID().toHexString();
    eventEmitterToAsync(Book.create(book), cb);
};

/**
 * @inheritDoc
 */
PostgresBookProvider.prototype.update = function (bookUpdate, cb) {

    async.waterfall([

        //find
        function (cb1) {
            eventEmitterToAsync(Book.find(bookUpdate._id), function(err, book){
                if(!err && !book){
                    err = "no book was found";
                }
                cb1(err, book);
            });
        },

        //update
        function (book, cb1) {
            delete bookUpdate._id;
            eventEmitterToAsync(book.updateAttributes(bookUpdate), cb1);
        }
    ], cb);

};

/**
 * @inheritDoc
 */
PostgresBookProvider.prototype.findByIds = function (ids, cb) {
    eventEmitterToAsync(Book.findAll({where: {_id: ids}}), cb);
};

module.exports = new PostgresBookProvider();