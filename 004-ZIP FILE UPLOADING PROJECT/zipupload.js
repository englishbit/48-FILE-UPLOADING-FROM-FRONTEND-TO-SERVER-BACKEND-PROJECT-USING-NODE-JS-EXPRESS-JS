const express=require('express')
const multer=require('multer')
const fs=require('fs')
const path=require('path')

const router=express.Router()

// the whole path finding & making the folder

const uploadDir=path.resolve(process.cwd(),process.env.UPLOAD_DIR || "uploads")

fs.mkdirSync(uploadDir,{recursive:true})

//memory configuraation with multer

const storage=multer.diskStorage({
    destination:(req,res,cb) =>{
        cb(null,uploadDir)
    },
    filename:(req,res,cb)=>{
        const filename=`${Date.now()}-${Math.random().toString().slice(2)}.zip`
        cb(null,filename)

    }
    
})

//file uploading logic

const upload=multer({
    storage,
    limits:{fileSize:25*1024*1024},
    fileFilter:(req,file,cb)=>{
        const zip=path.extname(file.originalname).toLowerCase()===".zip"

        if(!zip){
            return cb(new Error("only zip file is allowed"))
        }

        cb(null,true)
    }

})


//the api development

router.post("/upload-zip",(req,res)=>{
    upload.single("zipFile")(req,res,(err)=>{
        if(err){return res.status(400).json({error:err.message})}

        if(!req.file){return res.status(400).json({message:"zip file required"})}
           
        res.status(201).json({message:"file uploaded successfully"})


    })



})

module.exports=router