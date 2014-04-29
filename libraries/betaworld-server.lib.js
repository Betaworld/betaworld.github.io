var express = require('express'),
    stylus = require('stylus'),
    reload = require('reload'),
    http = require('http'),
    nib = require('nib');

module.exports = function BetaworldServer() {

    'use strict';

    /* INITIALIZATION */

    var self = this;

    self.version = require('../package.json').version;

    info('Initializing Betaworld Server v.' + self.version);
    self.app = express();

    /* PUBLIC FUNCTIONS */

    self.start = function () {
        configure();
        setupRoutes();

        info('Starting Server');
        var port = 3000;
        self.app.listen(port);
        info('- Betaworld Server Listening On Port: ' + port);
    };

    /* PRIVATE FUNCTIONS */

    function configure() {
        info('Configuring Server:');

        self.app.configure(function () {
            configureLogging();
            configureViewEngine();
            configureStylesheets();
            configureStaticFiles();
        });

        function configureLogging() {
            info('- Using Dev Request Logger');
            self.app.use(express.logger('dev'));
        }

        function configureViewEngine() {
            info('- Setting Jade As The View Engine');
            self.app.set('view engine', 'jade');
        }

        function configureStylesheets() {
            info('- Using Stylus For Dynamic Stylesheets');
            self.app.use(stylus.middleware(
                {
                    src: 'assets',
                    dest: 'public',
                    compile: compileStylesheet
                }
            ));

            function compileStylesheet(str, path) {
                info('Compiling Stylesheet: ' + path);
                //refreshBrowser();
                return stylus(str)
                    .set('filename', path)
                    .use(nib())
                    .use(defineRandomNumber);

                function defineRandomNumber(style) {
                    style.define('randomNumber', randomNumber);
                    function randomNumber(maximumNumber) {
                        return Math.floor(Math.random() * maximumNumber + 1);
                    }
                }
            }
        }

        function configureStaticFiles() {
            info('- Using Static /public Directory');
            self.app.use(express.static('public'));
            info('- Using Static /assets Directory');
            self.app.use(express.static('assets'));
        }
    }

    function setupRoutes() {
        info('Setting Up Routes');
        setupRoute('/', 'index.html.jade');
    }

    function setupRoute(route, templateFileName) {
        self.app.get(route, renderTemplate);
        function renderTemplate(req, res) {
            res.render(templateFileName, renderComplete);
            function renderComplete(err, html) {
                if (err) { throw err; }
                res.send(html);
            }
        }
    }

    function info(message) {
        console.log('[INFO] ' + message);
    }

};