const express=require('express')
const multer=require('multer')
const fs=require('fs')
const path=require('path')

const router=express.Router()

//logic for making the upload folder
const uploadDir=path.resolve(process.cwd(),process.env.UPLOAD_DIR || "uploads")
fs.mkdirSync(uploadDir,{recursive:true})

//storage configuration 
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
         cb(null,uploadDir)
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${Math.random().toString(36).slice(2)}.doc`)
    }
})


// logic for uploading system
const upload=multer({
    storage,
    limits:{fileSize:10*1024*1024},
    fileFilter:(req,file,cb)=>{
        const extension=path.extname(file.originalname).toLowerCase()===".doc"
        const mimtype=file.mimetype==="application/msword"

        if(extension && mimtype){
            return cb(null,true)
        }

        cb(new Error("give only doc file ok!"))
    }

})


//logic for api 

router.post('/upload-doc',(req,res)=>{
    upload.single("docFile")(req,res,(err)=>{
        if(err instanceof multer.MulterError){
            return res.status(400).json({error:err.message})
        }
        if(err){return res.status(400).json({error:err.message})}

        if(!req.file){return res.status(400).json({message:"give a docfile"})}

        res.status(201).json({messgage:"successfully file is uploaded"})
    })


})


module.exports=router