const express=require('express')
const docUpload=require('./docfileupload')
const app=express()
app.use('/api',docUpload)

module.exports=app