var express = require("express"),
  app = express(),
  pg = require("pg");
logger = require("morgan");
var appHelper = require("./appHelper");
var session = require("express-session");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var router = express.Router();
bodyParser = require("body-parser");
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
path = require("path");

// if (!appHelper.checkEnvironments()) {
//   throw new Error(
//     "EnvironmentsNotFound. Please set all the required application environments and try again"
//   );
// }

const port = 6001;
app.listen(port, () => console.log(`Server running on ${port}`));

var reguserRouter = require("./routes/regUserRoute");
var personalInfoRouter = require("./routes/personalinfoRoute");
var addressInfoRouter = require("./routes/addressInfoRoute");
var othersInfoRouter = require("./routes/othersInfoRoute");
var qualificationRouter = require("./routes/qualificationInfoRoute");
var experienceRouter = require("./routes/experienceInfoRoute");
var fileInfoRouter = require("./routes/userfileInfoRoute");
// var appRouter = require("./routes/appRoute");
var reguser = require("./controllers/regUserController");
var personalInfo = require("./controllers/personalinfoController");
var addressInfo = require("./controllers/addressInfoController");
var othersInfo = require("./controllers/othersInfoController");
var qualification = require("./controllers/qualificationInfoController");
var experience = require("./controllers/experienceInfoController");
var fileInfo = require("./controllers/userfileInfoController");

reguser.tables();
personalInfo.tables();
addressInfo.tables();
othersInfo.tables();
qualification.tables();
experience.tables();
fileInfo.tables();

// app.use(appRouter);
app.use(reguserRouter);
app.use(addressInfoRouter);
app.use(personalInfoRouter);
app.use(othersInfoRouter);
app.use(qualificationRouter);
app.use(experienceRouter);
app.use(fileInfoRouter);

// var appRouter = require('./routes/appRouter');
// appRouter.initialize(app);
