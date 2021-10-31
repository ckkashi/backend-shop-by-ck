const mongoose = require('mongoose')

var schemaa = mongoose.Schema({
    email:{type:String},
    pass:{type:String},
    username:{type:String},
    userContact:{type:String},
    userAddress:{type:String},
    userProfileUrl:{type:String},
    userPaymentDetail:{type:Map}
})

var model = mongoose.model('/authSchema',schemaa)

module.exports = model