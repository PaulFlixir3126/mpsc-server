var express = require("express");
var router = express.Router();
var addressController = require("../controllers/addressInfoController");

router
  .route("/register/user/address")

  .get(function (req, res) {
    addressController.getUserAddressInfo(req, res);
  })

  .post(function (req, res) {
    addressController.createAddressInfo(req, res);
  })

//   .put(function (req, res) {
//     addressController.updateDetails(req, res);
//   })

//   .delete(function (req, res) {
//     addressController.deleteDetails(req, res);
//   })
;

module.exports = router;
