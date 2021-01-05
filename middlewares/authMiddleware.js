const jsonwebtoken = require('jsonwebtoken');
module.exports = {
  authenticate: function (req, res, next) {
    const token = req.headers.token;
    if (token === undefined || token === null || token === '') {
      return res.status(401).send({
        status: false,
        message: "Authentication Failed, A valid JWT need to be supplied in the request headers"
      });
    }
    console.log('Verifying JWT ...');
    const JWTSecret = process.env.TASK_TRACKER_JWT_SECRET;
    jsonwebtoken.verify(token, JWTSecret, function (err, decoded) {
      if (err) {
        console.log('JWT verification failed with error: ' + err.message);
        return res.status(401).send({
          status: false,
          message: 'Authentication Failed'
        });
      }
      
      console.log('JWT verification success, decoded object: ', decoded);
      next();
    });
  }
};