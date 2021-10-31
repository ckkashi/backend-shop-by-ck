const express = require('express')
const bcrypt = require('bcryptjs')
const routerr = express.Router()

const cors = require('cors')
const bdp = require('body-parser')
let authModel = require('../models/authSchema')


routerr.use(bdp.urlencoded({extended:true}))
routerr.use(bdp.json())

routerr.post('/registerUser',async (req,res)=>{
    console.log(req.body.name)
    let chkingUser = await authModel.findOne({email:req.body.email})
    // console.log({name:req.body.name,email:req.body.email,pass:req.body.pass,find:chkingUser})

    if(chkingUser){
        res.status(403).send('user already registered')
    }else{
        var userPass = await bcrypt.hash(req.body.pass,10)
        let userData = new authModel({
            email:req.body.email,
            pass:userPass,
            username:req.body.username,
            userContact:req.body.userContact,
            userAddress:req.body.userAddress,
            userProfileUrl:req.body.userProfileUrl,
            userPaymentDetail:req.body.userPaymentDetail
        })
        userData.save()
        .then((response)=>{
            res.status(200).send("User Singup successfully")
        })
        .catch((err)=>{
            res.status(400).send("User Singup Unsuccessfully")
        })
    }
})

routerr.post('/loginUser',async(req,res)=>{
    let chkingUser = await authModel.findOne({email:req.body.email})
    if(chkingUser){
        let chkPass = await bcrypt.compare(req.body.pass,chkingUser.pass)
        console.log(chkPass)
        if(chkPass){
            // res.status(200).send("successfully login "+chkingUser.username)
            res.status(200).send(chkingUser)
        }else{
            res.status(403).send(
            "incorrect password"
        )

        }
    }else{
        res.status(403).send(
            "user not found on this email"
        )
    }
})



//old code

routerr.post('/addUserInfo',(req,res)=>{
    let userInfo = new authModel({
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
    var userData = await authModel.find({
        userId : req.body.userId
    })
    res.send(userData)
})

routerr.put('/updateUserInfo',async(req,res)=>{
    var find = await authModel.findOneAndUpdate(
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

