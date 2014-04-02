/**
 * dependencies
 */

var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    BSON = require('mongodb').BSON,
    ObjectID = require('mongodb').ObjectID,
    LOG = require('../../lib/log.js'),
    config = require("../../configuration").getDbConfiguration(),
    BookDataProvider = require('./provider');

/**
 * Data provier for books (mongo).
 * It takes configuration either from config.json or the env variable of mongolab given
 * by heroku.
 *
 * @constructor
 * @implements {BookDataProvider}
 */
BookProvider = function () {
};

/**
 * @inheritDoc
 */
BookProvider.prototype.init = function (cb) {
    this.db = new Db(config.dbName, new Server(config.host, config.port, {auto_reconnect: true}), {safe: true});
    this.db.open(function (err, db) {
        if (err) {
            cb(err);
            return;
        }

        LOG("Connected to DB successfully");
        if(!config.username){
            cb();
            return;
        }

        LOG('About to perform authentication.');
        db.authenticate(config.username, config.password, cb);
    });
};

/**
 * select `book` collection
 * @this {BookProvider}
 * @param {Function} cb Callback function
 */
BookProvider.prototype.getCollection = function (cb) {
    this.db.collection('books', function (error, collection) {
        if (error) cb(error);
        else cb(null, collection);
    });
};

/**
 * @inheritDoc
 */
BookProvider.prototype.findAll = function (cb) {
    this.getCollection(function (error, article) {
        if (error) cb(error)
        else {
            article.find().toArray(function (error, results) {
                if (error) cb(error)
                else cb(null, results)
            });
        }
    });
};

/**
 * @inheritDoc
 */
BookProvider.prototype.save = function (book, cb) {
    this.getCollection(function (error, collection) {
        if (error) {
            cb(error);
        } else {
            book.inserted_at = new Date();

            if (!book.Tags) {
                book.Tags = [];
            }
            for (var j = 0; j < book.Tags.length; j++) {
                book.Tags[j].inserted_at = new Date();
            }
            collection.insert(book, function () {
                cb(null, book);
            });
        }
    });
};


/**
 * @inheritDoc
 */
BookProvider.prototype.findByIds = function (ids, cb) {
    this.getCollection(function (error, collection) {
        if (error) {
            cb(error);
        } else {
            var objectIds = ids.map(function (id) {
                return ObjectID.createFromHexString(id);
            });
            var mongoDbQuery = {
                _id: {
                    $in: objectIds
                }
            };
            collection.find(mongoDbQuery).toArray(function (err, docs) {
                cb(err, docs);
            });
        }
    })
};


/**
 * @inheritDoc
 */
BookProvider.prototype.update = function (bookUpdate, cb) {
    this.getCollection(function (error, collection) {
        if (error) {
            cb(error)
        }
        else {
            var id = bookUpdate._id;
            delete bookUpdate._id;

            collection.findAndModify(
                {_id: ObjectID.createFromHexString(id)},
                [],
                {$set: bookUpdate},
                {new: true},
                function (err, updated) {
                    if (err) {
                        LOG("Book not updated.");
                        cb(err);
                    }
                    else {
                        cb(err, updated);
                    }
                });
        }
    });
};

module.exports = new BookProvider();