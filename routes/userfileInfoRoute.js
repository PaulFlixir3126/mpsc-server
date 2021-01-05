var express = require("express");
var router = express.Router();
var fileUploadController = require("../controllers/userfileInfoController");

router
  .route("/register/user/file/image")

//   .get(function (req, res) {
//     fileUploadController.fetchAllTaskDetails(req, res);
//   })

  .post(function (req, res) {
    fileUploadController.UploadUserImage(req, res);
  })

//   .put(function (req, res) {
//     fileUploadController.updateDetails(req, res);
//   })

//   .delete(function (req, res) {
//     fileUploadController.deleteDetails(req, res);
//   })
;
router.route("/register/user/file/signature").post(function (req,res){
    fileUploadController.UploadUserSignature(reg,res);
})


module.exports = router;
