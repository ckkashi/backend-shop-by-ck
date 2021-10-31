const express = require('express')
const routerr = express.Router()

routerr.use('/favProd',require('./favNewsRoute'))
routerr.use('/user',require('./authRoute'))

module.exports = routerr