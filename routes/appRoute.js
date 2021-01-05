var appRouter = new Object();


appRouter.initialize = function (app) {

    /*### employee route ###*/
    var employeeRoute = require('./register');
    app.use('/', employeeRoute);

    /*### auth route ###*/
    var authRoute = require('./register/user');
    app.use('/', authRoute);

    /*### timesheet route ###*/
    var timeSheetRoute = require('./timeSheetRoute');
    app.use('/', timeSheetRoute);

    /*### admin route ###*/
    var adminRoute = require('./adminRoute');
    app.use('/', adminRoute);
    
}

module.exports = appRouter;
