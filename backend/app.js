const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// for routes here : should include an http error route!
const HttpError = require('./http-error');

const app = express();

app.use(bodyParser.json());

// app.use routes here!

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured!' });
});

mongoose.connect('mongodb+srv://MasterUser:Master_99User@cluster0.qod8qgr.mongodb.net/?retryWrites=true&w=majority').then(() => {
    app.listen(3050);
    }).catch(err => {
        console.log(err);
    });