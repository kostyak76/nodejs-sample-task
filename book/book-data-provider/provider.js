/**
 * this object describes book-data-provider interface
 */

/**
 * Data provider for books.
 *
 * @interface
 */
function BookDataProvider(){}

/**
 * create connection to database
 *
 * $this {BookProvider}
 * @param {Function} cb Callback function
 */
BookDataProvider.prototype.init = function(cb){};

/**
 * find all `book` in collection
 *
 * @this {BookProvider}
 * @param {Function} cb Callback function
 */
BookDataProvider.prototype. findAll = function(cb){};

/**
 * save book into the database
 *
 * @this {BookProvider}
 * @param {bookModel} book Book object to save in the database
 * @param {Function} cb Callback function
 */
BookDataProvider.prototype.save = function(book, cb){};

/**
 * find Array of book objects by specified Array of id
 *
 * @this {BookProvider}
 * @param {Array.<ObjectID>} ids Array of id to look for
 * @param {Function} cb Callback function
 */
BookDataProvider.prototype.findByIds = function(ids, cb){};

/**
 * update book in the database
 *
 * @this {BookProvider}
 * @param {bookModel} bookUpdate Book object to update
 * @param {Function} cb Callback function
 */
BookDataProvider.prototype.update = function(bookUpdate, cb){};


module.exports = BookDataProvider;