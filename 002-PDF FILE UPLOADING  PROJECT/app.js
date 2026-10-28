const express=require('express')
const uploadjs=require('./pdfUpload')

const app=express()
app.use(express.json())
app.use('/api/pdfupload',uploadjs)


//error handling logic
app.use((err,req,res,next)=>{
    if (err.code===process.env.MAX_FILE_SIZE){
        return res.status(413).json({
            message:"file is too large"
        })
    }

    return res.status(400).json({message:err.message})


})

module.exports=app