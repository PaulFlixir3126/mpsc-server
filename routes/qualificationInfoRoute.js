var express = require("express");
var router = express.Router();
var qualificationController = require("../controllers/qualificationInfoController");

router
  .route("/register/user/qualification")
 
  .get(function (req, res) {
    qualificationController.getUserQualificationInfo(req, res);
  })

  .post(function (req, res) {
    qualificationController.createQualificationInfo(req, res);
  })

//   .put(function (req, res) {
//     qualificationController.updateDetails(req, res);
//   }) 

//   .delete(function (req, res) {
//     qualificationController.deleteDetails(req, res);
//   })
;

module.exports = router;
