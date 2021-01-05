var express = require("express");
var router = express.Router();
var authController = require('../controllers/authController');

router.route('/auth')

    .get(function (req, res) {
        authController.fetchAuthDetails(req, res)
    })

    .post(function (req, res) {
        authController.insertAuthDetails(req, res)
    })

    .put(function (req, res) {
        authController.updateAuthDetails(req, res)
    })

    .delete(function (req, res) {
        authController.deleteAuthDetails(req, res)
    });

router.route('/logIn')

    .post(function (req, res) {
        authController.createLogIn(req, res)
    });

module.exports = router;

