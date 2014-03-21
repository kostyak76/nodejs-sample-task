/**
 * adapter for book-data-provider
 *
 * this adapter decide which type of data provider to load
 */

/* define dependencies */
var _ = require('underscore'),
    path = require('path'),
    config = require('../../config.json');

/* define vars */
var bookProviderTypes = {
    "mongo": "mongo-book-data-provider"
};

/**
 * returns data provider by file name
 *
 * @param {String} providerName
 * @returns {Object} data provider
 */
function getProvider(providerName) {
    var name = path.join(__dirname, './', providerName);
    return require(name);
}

/**
 * returns data provider by type
 *
 * @param {String} providerType
 * @returns {Object} data provider
 */
function getProviderByType(providerType){
    return getProvider(bookProviderTypes[providerType]);
}

/**
 * loads data provider according to settings specified in the config
 *
 * @returns {Object} data provider
 */
function loadProvider(){
    var dataProviderType = config.dataProviderType;
    return getProviderByType(dataProviderType);
}

module.exports = loadProvider();