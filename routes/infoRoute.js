const express = require('express')

const routerr = express.Router()

const cors = require('cors')
const bdp = require('body-parser')
let infoModel = require('../models/infoSchema')


routerr.use(bdp.urlencoded({extended:true}))
routerr.use(bdp.json())

routerr.post('/addUserInfo',(req,res)=>{
    let userInfo = new infoModel({
        userId:req.body.userId,
        username:req.body.username,
        userContact:req.body.userContact,
        userAddress:req.body.userAddress,
        userProfileUrl:req.body.userProfileUrl,
        userPaymentDetail:req.body.userPaymentDetail
    })
    userInfo.save()
    .then((response)=>{
        res.send('User created successfully.')
    }).catch((err)=>{
        res.send('Error')
    })
})

routerr.post('/getUserInfo',async(req,res)=>{
    var uId = req.body.userId;
    var userData = await infoModel.find({
        userId : req.body.userId
    })
    res.send(userData)
})

routerr.put('/updateUserInfo',async(req,res)=>{
    var find = await infoModel.findOneAndUpdate(
        {
            userId:req.body.userId,
        },
        {
            username:req.body.username,
            userAddress:req.body.userAddress,
            userContact:req.body.userContact
        }
    ).then((result)=>{
        res.send('Information Updated')
    }).catch((error)=>{
        res.send(error)
    });
})



module.exports = routerr

