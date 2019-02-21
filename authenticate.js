//FILE THAT HAS THE MIDDLEWARE FOR TOKEN AUTHENTICATION

const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
 //var token = req.body.token;
 var token = req.header('X-auth');
 jwt.verify(token, 'abc123', function(err, decoded) {
  if (err) {
   res.status(401).send({
    status: 401,
    data: {},
    message: err.message
   });
  } else {
   req.decode = decoded;
   next();
  }
 });


};

//middleware for admin authentication
const authenticateAdmin = (req, res, next) => {
 //var token = req.body.token;
 var token = req.header('X-auth');
 console.log(token);
 jwt.verify(token, 'abc345', function(err, decoded) {
  if (err) {
   res.status(401).send({
    status: 401,
    data: {},
    message: err.message
   });
  } else {
   req.decode = decoded;
   next();
  }
 });


};

//middleware for driver authentication
const authenticateDriver = (req, res, next) => {

 var token = req.header('X-auth');
 //var token = req.body.token;
 jwt.verify(token, 'abc234', function(err, decoded) {
  if (err) {
   res.status(401).send({
    status: 401,
    data: {},
    message: err.message
   });
  } else {
   req.decode = decoded;
   next();
  }
 });


}


module.exports = {
 authenticate,
 authenticateAdmin,
 authenticateDriver
};