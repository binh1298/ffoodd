'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment');

const findById = id => {
    
}

const create = ({ username, password }) => {
    
}

const newEmailVerifyKey = ({ id, username }) => {
    
}

const isVerified = id => {
    
}

const verifyEmail = ({id, key}) => {
    
}

const verifyPassword = ({ username, key }) => {
    
}

const updatePasswordById = ({ id, password }) => {
    
}

const findRolesById = id => {
    
}

const findByUsername = username => {

}

/**private */
const generateExpirationDate = () => {
    const date = (new Date).toJSON();
    return moment(date).add(
        process.env.EMAILKEY_DURATION,
        'seconds'
    ).toJSON();
}

const randomKey = length =>Array.from({ length })
    .map(() => Math.floor(Math.random() * 10))
    .join('');

module.exports = {
    findById,
    create,
    findRolesById,
    findByUsername,
    newEmailVerifyKey,
    isVerified,
    verifyEmail,
    verifyPassword,
    updatePasswordById
}
