var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var webpack = require('webpack');

var FalcorServer = require('falcor-express');

/* ---- import falcor routers ---- */
import NavigationRouter     from './api/falcor/routers/navigation';
import UserRouter           from './api/falcor/routers/user';

var userRouter = require('./routers/user');
var pagesRouter = require('./routers/pages');

import chatFactory from './routers/chat';
var chatRouter = chatFactory(io);

var port = process.env.PORT || 8080;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---- falcor models API ---- */
app.use('/navigation/model.json',   FalcorServer.dataSourceRoute(() => new NavigationRouter()));
app.use('/user/model.json',         FalcorServer.dataSourceRoute(() => new UserRouter()));

// express routers
// page '/user'
app.use('/', userRouter);
app.use('/', chatRouter);
app.use('/', pagesRouter);

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