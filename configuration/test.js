var defaultPort = 3000;

var dbs = {
    mongo: {
        dbType: "mongo",
        dbName: "nodejs-mongo-sample-test",
        host: "localhost",
        port: 27017
    }
};

var configuration = {
    port: process.env.PORT || defaultPort,
    host: 'localhost',
    db: dbs.mongo,
    sessionStore: dbs.mongo,
    elastic: {
        host: "localhost",
        port: 9200
    },
    log: {
        enabled: false
    },
    session: {
        secret: 'so very secret',
        key: 'logicify.sample',
        cookie: {maxAge: 3600000}
    },
    cookieParser: {
        secret: 'shhhh, very secret'
    },
    isHTTPS: function (req) {
        return true;
    }
};

module.exports = configuration;
