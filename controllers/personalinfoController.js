personalinfoController = {};
var pasEncode = require("js-sha256");
const client = require("../config/database.config").getClient();
// ***************

// Function

personalinfoController.createPersonalInfo = async function (req, res, next) {
  try {
    var data = req.body;
    data["ref_user_id"] = 0;
    var sql =
      // "INSERT INTO `user_personal_info`(`ref_user_id`, `holding_aadhar`, `aadhar_no`, `aadhar_name`, `salutation`, `full_name`, `mother_name`, `dob`, `gender`, `email_id`, `mobile_no`, `nationality`, `marital_status`, `height`, `weight`, `caste_category`, `certificate_no`, `issue_date`) VALUES (0,'"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+"','"+data.holding_aadhar+")"
      "INSERT INTO user_personal_info (ref_user_id,holding_aadhar,aadhar_no,aadhar_name,salutation,full_name,mother_name,dob,gender,email_id,mobile_no,nationality,marital_status,height,weight,caste_category,certificate_no,issue_date) VALUES(" +
      data.ref_user_id +
      ",'" +
      data.holding_aadhar +
      "','" +
      data.aadhar_no +
      "','" +
      data.aadhar_name +
      "','" +
      data.salutation +
      "','" +
      data.full_name +
      "','" +
      data.mother_name +
      "','" +
      data.dob +
      "','" +
      data.gender +
      "','" +
      data.email_id +
      "','" +
      data.mobile_no +
      "','" +
      data.nationality +
      "','" +
      data.marital_status +
      "','" +
      data.height +
      "','" +
      data.weight +
      "','" +
      data.caste_category +
      "','" +
      data.certificate_no +
      "','" +
      data.issue_date +
      "')";
    console.log(sql);
    var personalInfoInsertResult = await new Promise(function (
      resolve,
      reject
    ) {
      console.log("inm");
      client.query(sql, function (err, result) {
        if (err) {
          reject(new Error("Failed to insert personalInfo: " + err.message));

          console.log(err);
        } else {
          resolve(result);
          console.log(result);
        }
      });
    });

    // for (i = 0; i < data1.length; i++) {
    //   var data = data1[i];

    // }
    return res.json({
      status: true,
      message: "personalInfo success",
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "personalInfo post failed",
    });
  }
};

personalinfoController.getUserPersonalInfo = async function (req, res) {
  try {
    var data = req.query;
    if (data) {
      var sql =
        "select * from user_personal_info WHERE ref_user_id='" +
        data.ref_user_id +
        "'";
      console.log(sql);
      var regUserInsertResult = await new Promise(function (resolve, reject) {
        client.query(sql, function (err, result) {
          if (err) {
            reject(new Error("Failed to fetch reg User Info: " + err.message));
            return res.json({
              status: false,
              message: "User Personal Failed",
              error: err.message,
            });
          } else {
            resolve(result);
            if (result.length > 0) {
              return res.json({
                status: true,
                message: "User Personal Success",
                data: result,
              });
            } else {
              return res.json({
                status: false,
                message: "failed",
              });
            }
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Personal Failed",
      error: error,
    });
  }
};

// Schema / Table Creation
personalinfoController.tables = () => {
  client.query(
    "create table if not exists user_personal_info (personal_id serial, ref_user_id int, holding_aadhar boolean, aadhar_no int, aadhar_name varchar(50), salutation varchar(50), full_name varchar(50), mother_name varchar(50), dob date, gender varchar(50), email_id varchar(50), mobile_no int, nationality varchar(30), marital_status varchar(15), height varchar(15), weight varchar(15), caste_category varchar(20), certificate_no varchar(30), issue_date date)"
  );
  console.log("Created personal info");
};

module.exports = personalinfoController;
