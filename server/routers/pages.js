import express from 'express';
const router  = express.Router();
import React from 'react';
import ReactDOMServer from 'react-dom/server';

var Falcor = require('falcor');
var FalcorDataSource = require('falcor-http-datasource');

import User from '../../example/users';

// does not render list items, just empty ul tag
router.get('/one', function(req, res) {
    res.send('<!doctype html><body>\n' +
        ReactDOMServer.renderToString(<User />) +
        '</body></html>'
    );
    console.log("/user data sent");
});

module.exports = router;