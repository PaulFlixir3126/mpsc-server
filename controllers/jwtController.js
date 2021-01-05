

jwtController = {};
var pg = require("pg");
const client = require('../config/database.config').getClient();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var loginDetails = ({
    employeeID: Number,
    Login: String,
    password: String

});

loginDetails.setPassword = function (password) {
    this.Login = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.Login, 10000, 512, 'sha512').toString('hex');
};

loginDetails.validatePassword = function (password) {
    const password = crypto.pbkdf2Sync(password, this.Login, 10000, 512, 'sha512').toString('hex');
    return this.password === password;
};

loginDetails.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        employeeID: this.employeeID,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

loginDetails.toAuthJSON = function () {
    return {
        employeeID: this.employeeID,
        Login: this.Login,
        password: this.password,
        token: this.generateJWT(),
    };
};