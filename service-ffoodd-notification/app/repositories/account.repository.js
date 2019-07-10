'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment');
const { ObjectID } = require('mongodb');

module.exports = ({ db }) => {
  const collection = db.collection('accounts');
  
  return {};
}
