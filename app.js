const express = require('express');
const bodyParser = require('body-parser');

const drivers = require('./driver/router/driverRouter.js')
const users = require('./user/router/userRouter.js');
const admins = require('./admin/router/adminRouter.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: true
}));

app.use('/users', users)
app.use('/drivers', drivers )
app.use('/admins', admins)
//app.use('/booking', booking)
app.listen(4000, () => {
 console.log('server running')
})