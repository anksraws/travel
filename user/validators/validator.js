// FILE THAT DOES VALIDATION OF NAME, EMAIL AND PASSWORD PARAMETERS FOR USER
const Joi = require('joi');

const validator = (req, res, next) => {
 const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
   minDomainAtoms: 2
  }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
 });

 Joi.validate({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
 }, schema, function(err, value) {
  if (err) {
   res.json({
    message: 'Insufficient information was supplied. Please check and try again.',
    status: 400,
    data: err.details[0].message.replace(/["]/ig, ''),
   });
  } else {
   next();
  }
 });
}

module.exports = {
 validator
}