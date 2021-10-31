const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bdp = require('body-parser')
const routes = require('./routes/mainRoute')

const app = express()
const port = process.env.PORT || 3000

app.use(routes)

mongoose.connect('mongodb+srv://shopbyck:12345@cluster0.laczz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log('app connected with mongodb')
})

mongoose.connection.on('error',()=>{
    console.log('app not connected with mongodb')
})

app.use(cors())
app.use(bdp.urlencoded(
    {extended:true}
))
app.use(bdp.json())

app.get('/',(req,res)=>{
    res.send('App is also running')
})

app.listen(port,()=>{
    console.log('server has been started and running on port '+port)
})