// importing important package

const express=require('express')
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const crypto=require('crypto')

const router=express.Router()


// logic for the disk management for upload pdf
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,path.join(__dirname, "uploads"))
    },

    filename:(req,file,callback)=>{
        callback(null,`${crypto.randomUUID()}.pdf`)

    }
})




const maxFile=Number(process.env.MAX_FILE_SIZE)||10



//logic for uploading the file and check the file is correct or not 
const upload=multer({
    storage,
    limits:{fileSize:maxFile*1024*1024},

    fileFilter:(req,file,callback)=>{
        const extension=path.extname(file.originalname).toLowerCase()==='.pdf'

        const pdfMMtype=file.mimetype==='application/pdf'

        if(extension && pdfMMtype){
            return callback(null,true)
        }

        callback(new Error("only pdf file is uploadable, mind it"))


    }


})



// the api for uploading the pdf file
router.post("/",upload.single('pdf'),(req,res)=>{
    if(!req.file){return res.status(400).json({message:"give a pdf file"})}


    res.status(201).json({
        message:"file uploaded successfully"
    })



})

module.exports=router