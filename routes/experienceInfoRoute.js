var express = require("express");
var router = express.Router();
var experienceController = require("../controllers/experienceInfoController");

router
  .route("/register/user/experience")

//   .get(function (req, res) {
//     experienceController.fetchAllTaskDetails(req, res);
//   })

  .post(function (req, res) {
    experienceController.createExperienceInfo(req, res);
  })

//   .put(function (req, res) {
//     experienceController.updateDetails(req, res);
//   })

//   .delete(function (req, res) {
//     experienceController.deleteDetails(req, res);
//   })
;

module.exports = router;
