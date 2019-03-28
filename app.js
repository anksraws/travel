//MAIN FILE THAT STARTS THE SERVER
//trying git commands
//new changes
//another changes
const express = require('express');
const bodyParser = require('body-parser');

const drivers = require('./driver/router/driverRouter.js')
const users = require('./user/router/userRouter.js');
const admins = require('./admin/router/adminRouter.js');
const dbo = require('./dbconnection.js');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: true
}));

app.use('/users', users)
app.use('/drivers', drivers)
app.use('/admins', admins)

app.listen(4000, () => {
 console.log('server running')
})