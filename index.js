require('dotenv').config();

var express = require('express');
var tedious = require('tedious');

var app = express();

var Connection = require('tedious').Connection;

var config = {
    server: process.env.DB_SERVER,
    options: { "encrypt": true, "database": process.env.DB_DATABASE },
    authentication: {
        type: "default",
        options: {
            userName: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        }
    }
};

var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log('Error: ', err)
    }
    // If no error, then good to go...
    executeStatement();
});

app.use(function(req, res, next) {
    req.sql = tediousExpress(req, { connectDatabase });
    next();
});