#! /usr/bin/env node

/*dependencies*/
var Application = require('../app'),
    appInstance = new Application(),
    LOG = require('../lib/log'),
    cluster = require('cluster'),
    cpus = require('os').cpus().length;

/*global vars*/
var cpusToUse = (cpus === 1)
    ? cpus
    : (cpus - 1);

// different code for workers and clients
if (cluster.isMaster) {

    //fork workers.
    for (var i = 0; i < cpusToUse; i++) {
        LOG("starting a new worker process ...");
        cluster.fork();
    }

    // restart workers if they die for any reason
    cluster.on("exit", function (worker, code, signal) {
        LOG("worker " + worker.process.pid + " died, restarting ...");
        cluster.fork();
    });

} else {

    //start application with workers
    appInstance.init(function (err) {
        appInstance.bindServer();
        appInstance.bindSecureServerIfNeeded();
    });

}
