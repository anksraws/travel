module.exports.message = (res, status, data , message) => {

res.status(status).send({
   status,
   data ,
   message
  });
};
