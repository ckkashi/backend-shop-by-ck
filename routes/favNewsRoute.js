const express = require('express')

const routerr = express.Router()

const cors = require('cors')
const bdp = require('body-parser')
let favProdModel = require('../models/favNewsSchema')

routerr.use(bdp.urlencoded({extended:true}))
routerr.use(bdp.json())




routerr.post('/addFavProd',async(req,res)=>{

    var chk = await favProdModel.findOne({
        userId:req.body.userId,
        title:req.body.title
    })
    if(chk){
        res.send('It is already in your fav list.')
    }else{
        let favProd = new favProdModel({
            userId:req.body.userId,
            productId:  req.body.productId,
            productName:  req.body.productName,
            productDescription:  req.body.productDescription,
            imageAddress:  req.body.imageAddress,
            productPrice:  req.body.productPrice,
            categories: req.body.categories
        })
        favProd.save()
        .then((response)=>{
            res.send('Product Added to fav list')
        }).catch((err)=>{
            res.send('Error')
        })
    }

    
})

routerr.post('/getFavProd',async(req,res)=>{
    var uId = req.body.userId;
    var userFavProd = await favProdModel.find({
        userId : uId
    })
    res.send(userFavProd)
})

routerr.post('/deleteFavProd',async(req,res)=>{
    var docId = req.body.docId;
    console.log(docId);
    /*try{*/
        var deleteDoc = favProdModel.findByIdAndDelete({
            _id:req.body.docId,
        }/*,
        (err)=>{
            if (!err) {
                res.send = 'Remove from fav list';
            }
        else {
                res.send = 'error';
            }
        }*/
        ).then((result)=>{
            if(result!=null) res.send('Removed from favourite.')
            // res.send({"result":result})
        }).catch((err)=>{
            if(err) throw err;
        })
        
    /*}catch(e){throw e;}*/
})

module.exports = routerr