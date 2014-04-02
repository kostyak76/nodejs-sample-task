/**
 * dbFactory for data-providers
 *
 * To use this provider you should complete following requirements:

 *  - pattern '{entityName}-data-provider' should be used for data-provider name
 *  - pattern '{dbType}-provider.js' should be used for data-provider file name
 *  - data-provider location should be the next:
 *      /application-folder
 *          |--/{entityName}
 *                  |--/{entityName}-data-provider
 *                          |--{dbType}-provider.js
 *  - this file located in folder 'lib':
 *      /application-folder
 *          |--/lib
 */

/* define dependencies */
var _ = require('underscore'),
    path = require('path'),
    config = require('../configuration').getDbConfiguration();

/**
 * returns data provider by file name
 *
 * @param {Object} providerNameObj
 * @returns {Object} data provider
 */
function getProvider(providerNameObj) {
    var name = path.join(__dirname, '../', providerNameObj.entityPath, providerNameObj.providerPath, providerNameObj.providerFile);
    return require(name);
}

/**
 * decode providerName with providerType
 *
 * @param {String} providerName
 * @param {String} providerType
 * @returns {{entityPath: string, providerPath: string, providerFile: string}}
 */
function decodeProviderName(providerName, providerType) {
    return {
        entityPath: providerName.split('-')[0],
        providerPath: providerName,
        providerFile: providerType + '-provider.js'
    };
}
/**
 * loads data provider according to settings specified in the config
 * and type provider name
 *
 * @returns {Object} data provider
 */
function get(providerName) {
    var providerNameObj = decodeProviderName(providerName, config.dbType);
    return getProvider(providerNameObj);
}

exports.get = get;