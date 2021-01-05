var express = require("express");
var router = express.Router();
var otherController = require("../controllers/othersInfoController");

router
  .route("/register/user/other")

  .get(function (req, res) {
    otherController.getUserOtherInfo(req, res);
  })

  .post(function (req, res) {
    otherController.createOtherInfo(req, res);
  })

//   .put(function (req, res) {
//     otherController.updateDetails(req, res);
//   })

//   .delete(function (req, res) {
//     otherController.deleteDetails(req, res);
//   })
;

module.exports = router;
