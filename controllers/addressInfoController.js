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
          "INSERT INTO user_address_info (ref_user_id,address_no,premises_building,locality,landmark,state,pincode,cor_address_no,cor_premises_building,cor_locality,cor_landmark,cor_state,cor_pincode) VALUES(" +
          data.ref_user_id +
          ",'" +
          data.address_no +
          "','" +
          data.premises_building +
          "','" +
          data.locality +
          "','" +
          data.landmark +
          "'," +
          data.state +
          "," +
          data.pincode +
          "," +
          data.cor_address_no +
          ",'" +
          data.cor_premises_building +
          "','" +
          data.cor_locality +
          "','" +
          data.cor_landmark +
          "','" +
          data.cor_state +
          "','" +
          data.cor_pincode +
          "')";
        var AddressInfoInsertResult = await new Promise(function (
          resolve,
          reject
        ) {
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
      message: "Address Info success",
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Address Info post failed",
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