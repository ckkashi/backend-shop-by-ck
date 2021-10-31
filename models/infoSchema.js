const mongoose = require('mongoose')

var schemaa = mongoose.Schema({
    userId:{type:String},
    username:{type:String},
    userContact:{type:String},
    userAddress:{type:String},
    userProfileUrl:{type:String},
    userPaymentDetail:{type:String}
})

var infoModel = mongoose.model('/userInfo',schemaa)

module.exports = infoModel