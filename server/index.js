var express = require('express');
var app = express();
var server = require('http').Server(app);
var webpack = require('webpack');

var port = process.env.PORT || 8080;
app.set('port', port);

// static pages
app.use(express.static('./public'));

var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../webpack.config');
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

/* 404 */
app.use(function(req, res, next) {
    var err = new Error('Url is not found! ::: ' + req.url);
    err.status = 404;
    next(err);
});

server.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('navigate to http://localhost:' + port);
});

module.exports = app;