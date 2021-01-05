otherInfoController = {};
var pasEncode = require("js-sha256");
// const { dateSearch } = require("./adminController");
const client = require("../config/database.config").getClient();
// ***************

// Function

otherInfoController.createOtherInfo = async function (req, res, next) {
  try {
    var data = req.body;
      if (data) {
        var sql =
          "INSERT INTO other_details (ref_user_id,ex_serviceman,ex_serviceman_division,date_of_appointment,date_of_retirement,certificate_no,sports_person,name_of_game,position_medal,tournament_from,tournament_to,level_of_tournament,tournament_certificate_no) VALUES(" +
          data.ref_user_id +
          ",'" +
          data.ex_serviceman +
          "','" +
          data.ex_serviceman_division +
          "','" +
          data.date_of_appointment +
          "','" +
          data.date_of_retirement +
          "'," +
          data.certificate_no +
          "," +
          data.sports_person +
          "," +
          data.name_of_game +
          ",'" +
          data.position_medal +
          "','" +
          data.tournament_from +
          "','" +
          data.tournament_to +
          "','" +
          data.level_of_tournament +
          "','" +
          data.tournament_certificate_no +
          "')";
        var othersInfoInsertResult = await new Promise(function (
          resolve,
          reject
        ) {
          client.query(sql, function (err, result) {
            if (err) {
              reject(new Error("Failed to insert others Info: " + err.message));
            } else {
              resolve(result);
            }
          });
        });
      }
    return res.json({
      status: true,
      message: "others Info success",
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "others Info post failed",
    });
  }
};

otherInfoController.getUserOthersInfo = async function (req, res) {
  try {
    var data = req.query;
    if (data) {
      var sql =
        "select * from other_details WHERE ref_user_id='" +
        data.ref_user_id +
        "'";
      console.log(sql);
      var regUserInsertResult = await new Promise(function (resolve, reject) {
        client.query(sql, function (err, result) {
          if (err) {
            reject(new Error("Failed to fetch reg User Info: " + err.message));
            return res.json({
              status: false,
              message: "User Others Failed",
              error: err.message,
            });
          } else {
            resolve(result);
            if (result.length > 0) {
              return res.json({
                status: true,
                message: "User Others Success",
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
      message: "Others Failed",
      error: error,
    });
  }
};

// Schema / Table Creation 
otherInfoController.tables = () => {
    client.query(
      "create table if not exists other_details (other_id serial, ref_user_id int, ex_serviceman boolean, ex_serviceman_division varchar(30), date_of_appointment date, date_of_retirement date, certificate_no varchar(30), sports_person boolean, name_of_game varchar(30), position_medal varchar(30), tournament_from date, tournament_to date,level_of_tournament varchar(20), tournament_certificate_no varchar(30))"
    );
    console.log("Created Address info");
  };
  
module.exports = otherInfoController;

// ref_user_id,ex_serviceman,ex_serviceman_division,date_of_appointment,date_of_retirement,certificate_no,sports_person,name_of_game,position_medal,tournament_from,tournament_to,level_of_tournament,certificate_no