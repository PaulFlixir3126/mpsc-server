var express = require("express");
var router = express.Router();
var personalController = require("../controllers/personalinfoController");

router
  .route("/register/user/personal")

//   .get(function (req, res) {
//     personalController.fetchAllTaskDetails(req, res);
//   })

  .post(function (req, res) {
    personalController.createPersonalInfo(req, res);
  })

//   .put(function (req, res) {
//     personalController.updateDetails(req, res);
//   })

//   .delete(function (req, res) {
//     personalController.deleteDetails(req, res);
//   })
;

module.exports = router;
