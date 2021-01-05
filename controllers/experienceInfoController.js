exprienceInfoController = {};
var pasEncode = require("js-sha256");
// const { dateSearch } = require("./adminController");
const client = require("../config/database.config").getClient();
// ***************

// Function

exprienceInfoController.createExperienceInfo = async function (req, res, next) {
  try {
    var data = req.body;
    if (data) {
      var sql =
        "INSERT INTO user_exprience_info (ref_user_id,emp_present_past,selected_mpsc,organisation,board_university,office_inst_own_govt,pay_scale,basic_pay,gross_salary) VALUES(" +
        data.ref_user_id +
        ",'" +
        data.emp_present_past +
        "','" +
        data.selected_mpsc +
        "','" +
        data.organisation +
        "','" +
        data.board_university +
        "','" +
        data.office_inst_own_govt +
        "'," +
        data.pay_scale +
        "," +
        data.basic_pay +
        "," +
        data.gross_salary +
        ")";
      var exprienceInfoInsertResult = await new Promise(function (
        resolve,
        reject
      ) {
        client.query(sql, function (err, result) {
          if (err) {
            reject(
              new Error("Failed to insert exprience Info: " + err.message)
            );
          } else {
            resolve(result);
          }
        });
      });
    }
    return res.json({
      status: true,
      message: "exprience Info success",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "exprience Info post failed",
    });
  }
};

exprienceInfoController.getUserExperienceInfo = async function (req, res) {
  try {
    var data = req.query;
    if (data) {
      var sql =
        "select * from user_exprience_info WHERE ref_user_id='" +
        data.ref_user_id +
        "'";
      console.log(sql);
      var regUserInsertResult = await new Promise(function (resolve, reject) {
        client.query(sql, function (err, result) {
          if (err) {
            reject(new Error("Failed to fetch reg User Info: " + err.message));
            return res.json({
              status: false,
              message: "User Experience Failed",
              error: err.message,
            });
          } else {
            resolve(result);
            if (result.length > 0) {
              return res.json({
                status: true,
                message: "User Experience Success",
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
      message: "Experience Failed",
      error: error,
    });
  }
};

exprienceInfoController.updateExperienceInfo = async function (req, res, next) {
  try {
    var data = req.body;
    if (data) {
      var sql =
        "UPDATE user_exprience_info SET emp_present_past = '" +
        data.emp_present_past +
        "',selected_mpsc='" +
        data.selected_mpsc +
        "',organisation='" +
        data.organisation +
        "',board_university='" +
        data.board_university +
        "',office_inst_own_govt='" +
        data.office_inst_own_govt +
        "',pay_scale='" +
        data.pay_scale +
        "',basic_pay='" +
        data.basic_pay +
        "',gross_salary='" +
        data.gross_salary +
        "'WHERE exprience_id  = " +
        data.exprience_id +
        "";
      var exprienceInfoInsertResult = await new Promise(function (
        resolve,
        reject
      ) {
        client.query(sql, function (err, result) {
          if (err) {
            reject(
              new Error("Failed to insert exprience Info: " + err.message)
            );
          } else {
            resolve(result);
          }
        });
      });
    }
    return res.json({
      status: true,
      message: "exprience Info success",
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "exprience Info post failed",
    });
  }
}; 

// Schema / Table Creation
exprienceInfoController.tables = () => {
  client.query(
    "create table if not exists user_exprience_info (exprience_id serial, ref_user_id int, emp_present_past varchar(20),selected_mpsc varchar(20), organisation varchar(50), board_university varchar(50), office_inst_own_govt varchar(30), pay_scale float,basic_pay float,gross_salary float)"
  );
  console.log("Created Exprience info");
};

module.exports = exprienceInfoController;

// ref_user_id,emp_present_past,selected_mpsc,organisation,board_university,office_inst_own_govt,pay_scale,basic_pay,gross_salary
