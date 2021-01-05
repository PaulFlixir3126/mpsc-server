userfileInfoController = {};
var pasEncode = require("js-sha256");
// const { dateSearch } = require("./adminController");
const client = require("../config/database.config").getClient();

// Schema / Table Creation 
userfileInfoController.tables = () => {
    client.query(
      "create table if not exists user_userfile_info (exprience_id serial, ref_user_id int, file_name varchar(20),file_extension varchar(20), file varchar(1000))"
    );
    console.log("Created User File info");
  };
  
module.exports = userfileInfoController;