//this is the default configuration

var defaultPort = 3000;
var dbs = {
    mongo: {
        dbType: "mongo",
        dbName: "nodejs-mongo-sample",
        host: "localhost",
        port: 27017
    },
    postgres: {
        dbType: "postgres",
        connectUrl: "postgres://postgres:postgres@localhost:5432/node-sample-task"
    }
};

var configuration = {
    port: process.env.PORT || defaultPort,
    host: 'localhost',
    db: dbs.postgres,
    sessionStore: dbs.mongo,
    elastic: {
        host: "localhost",
        port: 9200
    },
    log: {
        enabled: true
    },
    session: {
        secret: 'so very secret',
        key: 'logicify.sample',
        cookie: {maxAge: 3600000}
    },
    cookieParser: {
        secret: 'shhhh, very secret'
    },
    https: {
        port: 5000,
        key: 'certificates/https/server.key',
        cert: 'certificates/https/server.crt'
    },
    isHTTPS: function(req){
        return Boolean(req.secure);
    }
};

module.exports = configuration;
