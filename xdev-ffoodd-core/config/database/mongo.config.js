'use strict';

const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4
};

const connect = () => new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost:27017/myapp', options)
        .then(err => {
            if (err) 
                return reject(err);
            resolve();
        });
})

module.exports = Object.create({}, { connect })
