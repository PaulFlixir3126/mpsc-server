qualificationInfoController = {};
var pasEncode = require("js-sha256");
// const { dateSearch } = require("./adminController");
const client = require("../config/database.config").getClient();
// ***************

// Function

qualificationInfoController.createQualificationInfo = async function (req, res, next) {
  try {
    var data = req.body;
    
      if (data) {
        var sql =
          "INSERT INTO user_qualification_info (ref_user_id,q_type,name_of_degree,subject,board_university,precentage,remark) VALUES(" +
          data.ref_user_id +
          ",'" +
          data.q_type +
          "','" +
          data.name_of_degree +
          "','" +
          data.subject +
          "','" +
          data.board_university +
          "'," +
          data.precentage +
          ",'" +
          data.remark +
          "')";
        var qualificationInfoInsertResult = await new Promise(function (
          resolve,
          reject
        ) {
          client.query(sql, function (err, result) {
            if (err) {
              reject(new Error("Failed to insert qualification Info: " + err.message));
            } else {
              resolve(result);
            }
          });
        });
      }
    return res.json({
      status: true,
      message: "qualification Info success",
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "qualification Info post failed",
    });
  }
};
qualificationInfoController.getUserQualificationInfo = async function (req, res) {
  try {
    var data = req.query;
    if (data) {
      var sql =
        "select * from user_qualification_info WHERE ref_user_id='" +
        data.ref_user_id +
        "'";
      console.log(sql);
      var regUserInsertResult = await new Promise(function (resolve, reject) {
        client.query(sql, function (err, result) {
          if (err) {
            reject(new Error("Failed to fetch reg User Info: " + err.message));
            return res.json({
              status: false,
              message: "User Qualification Failed",
              error: err.message,
            });
          } else {
            resolve(result);
            if (result.length > 0) {
              return res.json({
                status: true,
                message: "User Qualification Success",
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
      message: "Qualification Failed",
      error: error,
    });
  }
};
// Schema / Table Creation 
qualificationInfoController.tables = () => {
    client.query(
      "create table if not exists user_qualification_info (qualification_id serial, ref_user_id int, q_type varchar(20), name_of_degree varchar(20), subject varchar(20), board_university varchar(50), precentage float, remark varchar(250))"
    );
    console.log("Created Qualification info");
  };
  
module.exports = qualificationInfoController;
// qualification_id,ref_user_id,q_type,name_of_degree,subject,board_university,precentage,remark