#!/usr/bin/env node

var BetaworldServer = require('../libraries/betaworld-server.lib.js');

startServer();

function startServer() {

    "use strict";

    var server = new BetaworldServer();

    server.start();
}

