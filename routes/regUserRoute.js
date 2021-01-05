var express = require("express");
var router = express.Router();
var reguserController = require("../controllers/regUserController");

router.route("/register/create/user").post(function (req, res) {
  reguserController.createUser(req, res);
}),
  router.route("/register/user/login").post(function (req, res) {
    reguserController.userLogin(req, res);
  });
router.route("/register/user/email/send").post(function (req, res) {
  reguserController.sendEmailOtp(req, res);
});
router.route("/register/user/email/verify").post(function (req, res) {
  reguserController.verifyEmailOtp(req, res);
});
router.route("/register/user/mobile/send").post(function (req, res) {
  reguserController.sendSMSOtp(req, res);
});
router.route("/register/user/mobile/verify").post(function (req, res) {
  reguserController.verifySMSOtp(req, res);
});

module.exports = router;
