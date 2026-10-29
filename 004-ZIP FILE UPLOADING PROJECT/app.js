const express=require('express')
const zipupload=require('./zipupload')
const app=express()

app.use('/api',zipupload)


module.exports=app