addressInfoController = {};
var pasEncode = require("js-sha256");
// const { dateSearch } = require("./adminController");
const client = require("../config/database.config").getClient();
// ***************

// Function

addressInfoController.createAddressInfo = async function (req, res, next) {
  try {
    var data = req.body;
      if (data) {
        var sql =
          "INSERT INTO user_address_info (ref_user_id,address_no,premises_building,locality,landmark,state,pincode,cor_address_no,cor_premises_building,cor_locality,cor_landmark,cor_state) VALUES(" +
          data.ref_user_id +
          ",'" +
          data.address_no +
          "','" +
          data.premises_building +
          "','" +
          data.locality +
          "','" +
          data.landmark +
          "','" +
          data.state +
          "'," +
          data.pincode +
          ",'" +
          data.cor_address_no +
          "','" +
          data.cor_premises_building +
          "','" +
          data.cor_locality +
          "','" +
          data.cor_landmark +
          "','" +
          data.cor_state +
          "')";
        var AddressInfoInsertResult = await new Promise(function (
          resolve,
          reject
        ) {
          console.log(sql);
          client.query(sql, function (err, result) {
            if (err) {
              reject(new Error("Failed to insert Address Info: " + err.message));
            } else {
              resolve(result);
            }
          });
        });
      }
    return res.json({
      status: true,
      message: " Added User Address Info",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: " Failed To Fetch User Address Info",
    });
  }
};

addressInfoController.getUserAddressInfo = async function (req, res) {
  try {
    var data = req.query;
    if (data) {
      var sql =
        "select * from user_address_info WHERE ref_user_id='" +
        data.ref_user_id +
        "'";
      console.log(sql);
      var regUserInsertResult = await new Promise(function (resolve, reject) {
        client.query(sql, function (err, result) {
          if (err) {
            reject(new Error("Failed to fetch reg User Info: " + err.message));
            return res.json({
              status: false,
              message: "Failed To Fetch User Address Info",
              error: err.message,
            });
          } else {
            resolve(result);
            if (result.length > 0) {
              return res.json({
                status: true,
                message: "Fetched User Address Info",
                data: result,
              });
            } else {
              return res.json({
                status: false,
                message: "Failed To Fetch User Address Info",
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
      message: "Failed To Fetch User Experience Details",
      error: error,
    });
  }
};
// Schema / Table Creation 
addressInfoController.tables = () => {
    client.query(
      "create table if not exists user_address_info (address_id serial, ref_user_id int,address_no varchar(40), premises_building varchar(30), locality varchar(30),landmark varchar(50), state varchar(20),pincode int, cor_address_no varchar(50),cor_premises_building varchar(50), cor_locality varchar(50), cor_landmark varchar(50),cor_state varchar(20), cor_pincode int)"
    );
    console.log("Created Address info");
  };
  
module.exports = addressInfoController;
// address_id,ref_user_id,address_no,premises_building,locality,landmark,state,pincode,cor_address_no,cor_premises_building ,cor_locality,cor_landmark,cor_state,cor_pincode