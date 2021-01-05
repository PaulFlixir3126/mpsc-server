regUserController = {};
var pasEncode = require("js-sha256");
const client = require("../config/database.config").getClient();

const configjs = require("../config/config");
const twilioClient = require("twilio")(
  configjs.twilioAccountSID,
  configjs.twilioAuthToken
);
const sha256 = require("sha256");
const sgMail = require("@sendgrid/mail");
const userfileInfoController = require("./userfileInfoController");
sgMail.setApiKey(configjs.SENDGRID_API_KEY);
// ***************

// Function 

regUserController.createUser = async function (req, res, next) {
  try {
    var data = req.body;
      if (data) {
        var sql =
          "INSERT INTO user_table (username,password,email,mobile_no,dob) VALUES('" +
          data.username +
          "','" +
          sha256(data.password)+
          "','" +
          data.email +
          "','" +
          data.mobile_no +
          "','" +
          data.dob +
          "')";
          console.log(sql)
        var regUserInsertResult = await new Promise(function (
          resolve,
          reject
        ) {
          client.query(sql, function (err, result) {
            if (err) {
              reject(new Error("Failed to insert reg User Info: " + err.message));
            } else {
              resolve(result);
            }
          });
        });
      }
    return res.json({
      status: true,
      message: "reg User Info success",
    });
  } catch (error) {
    console.log(error)
    return res.json({
      status: false,
      message: "reg User Info post failed",
      error: error
    });
  }
};

regUserController.sendEmailOtp = async function(req, res,next) {
  // exports.sendOtpMail = async (data, otp) => {
    let digits = "0123456789abcdefghijklmnopqrstuvwxyz";
    let otpLength = 6;
    let otp = "";
    for (let i = 1; i <= otpLength; i++) {
      var index = Math.floor(Math.random() * digits.length);
  
      otp = otp + digits[index];
    }
    try {
  
      const msg = {
        to: req.body.email,
        from: configjs.senderMailID,
        subject: "One Time Password", // Subject line
        html:
          '<body style="background-color:#f4f2f2">' +
          '<div style="width:100%; background-color:white; padding-top: 10px; padding-left: 10px;">' +
          "Dear User" +
          "" +
          '<div style="margin-top:20px;">' +
          "Please use this code <b> " +
          otp +
          "</b> to verify your email. <br>" +
          "</div>" +
          "<br>" +
          '<span style="color:gray">Note: This OTP is valid for 30min and can only be used once</span> <br>' +
          '<div style="margin-top:20px;">' +
          '<span style="font-size: 20px;">Regards</span><br>' +
          '<span style="font-size: 18px;">MPSC</span>' +
          "</div>" +
          "</div>" +
          "</body>",
      };
      let sendmail = await sgMail.send(msg);
        return res.json({
          status: true,
          message: "Otp sent successfully",
          data: sendmail,
          secretkey: sha256(otp)
        });
    } catch (err) {
      console.log(err);
      return res.json({
        status: false,
        message: "Otp Send Failed ",
        error: err
      });
    }
}

regUserController.verifyEmailOtp = async function(req, res,next) {
    try {
      let gototp = sha256(req.body.emailverify)
      if(req.body.secret == gototp){
        return res.json({
          status: true,
          message: "Email Verification successfully",
        });
      }else{
        return res.json({
          status: false,
          message: "Email Verification failed ",
        });
      }
        
    } catch (err) {
      console.log(err);
      return res.json({
        status: false,
        message: "Email Verification failed ",
      });
    }
}

regUserController.sendSMSOtp = async function(req, res,next) {
    let primaryNumber = "";
    let channelcode = "";
    data = req.body ? req.body : req;
    primaryNumber = data.mobile_no;
    channelcode = 'sms';
    try {
      twilioClient.verify
          .services(configjs.twilioServiceID)
          .verifications.create({
            to: `+91${primaryNumber}`,
            channel: channelcode,
          })
          .then((data) => {
            res.status(200).send({
              message: "code sent",
              status: true,
              data: data,
            });
          });
    } catch (error) {
      return error;
    }
}
regUserController.verifySMSOtp = async function(req, res,next) {
  let primaryNumber = "";
  data = req.body ? req.body : req;
  primaryNumber = data.mobile_no;
  verifyCode = data.otp;
  console.log('called',primaryNumber,verifyCode)
  try {
    twilioClient.verify
    .services(configjs.twilioServiceID)
    .verificationChecks.create({
      to: `+91${primaryNumber}`,
      code: verifyCode,
    })
    .then((data) => {
      if (data.valid) {
        res.status(200).send({
          message: "Success",
          status: true,
          data: data,
        });
      } else {
        res.status(200).send({
          message: "Failed",
          status: false,
          data: data,
        });
      }
    }).catch((error) =>{
console.log(error);
    });
  } catch (error) {
    return error;
  }
}

regUserController.userLogin = async function(req,res){

  try {
    var data = req.body;
      if (data) {
        var sql =
          "select * from user_table WHERE email='" +
          data.email +
          "' AND password='" +
          sha256(data.password) +
          "'";
          console.log(sql)
        var regUserInsertResult = await new Promise(function (
          resolve,
          reject
        ) {
          client.query(sql, function (err, result) {
            if (err) {
              reject(new Error("Failed to fetch reg User Info: " + err.message));
              return res.json({
                status: false,
                message: "User Login Failed",
                error:  err.message
              });
            } else {
              resolve(result);
              if(result.length > 0){
                return res.json({
                  status: true,
                  message: "User Login Success",
                  data: result
                });
              }else{
                return res.json({
                  status: false,
                  message: "Email / Password wrong",
                  // data: result
                });
              }
              
            }
          });
        });
      }
  } catch (error) {
    console.log(error)
    return res.json({
      status: false,
      message: "login Failed",
      error: error
    });
  }

}
 
// Schema / Table Creation 
regUserController.tables = () => {
    client.query(
      "create table if not exists user_table (user_id serial, username varchar(100), password varchar(100), email varchar(100), mobile_no double, dob date)"
      );
    console.log("Created usertable");
  };
  
module.exports = regUserController;
// user_id,username,password,email,mobile_no,dob,verification_img,text_img_verify