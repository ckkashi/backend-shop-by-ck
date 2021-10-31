const mongoose = require('mongoose')

var prodSchemaa = mongoose.Schema({
    
        userId:  {type:String},
        productId:  {type:String},
        productName:  {type:String},
        productDescription:  {type:String},
        imageAddress:  {type:String},
        productPrice:  {type:String},
        categories: {type:Array}
    
})

var favProdModel = mongoose.model('/favProdByUsers',prodSchemaa)

module.exports = favProdModel