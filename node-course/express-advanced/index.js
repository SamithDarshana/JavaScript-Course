const express = require("express");
const app = express();
const Joi = require("joi");
const morgan = require('morgan')
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')

const courses = require('./routes/courses')
const home = require('./routes/home')

const logger = require('./middleware/logger')
const authenticate = require('./middleware/authenticate')

app.use(express.json());

// console.log('Application name: ' + config.get('name'))
// console.log('Application password: ' + config.get('mail.password'))
//console.log(process.env.NODE_ENV)
//console.log(app.get('env'))

// export DEBUG="app:startup"  =  $env:DEBUG=""
 
if(app.get('env') === 'development'){
    app.use(morgan('dev'))
    //console.log('Morgan enabled...')   
    // using debugger
    startupDebugger('Morgan enabled...')
}

// create middleware function
app.use(logger)
app.use(authenticate)

// routes
app.use('/api/courses', courses)
app.use('/', home)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));
