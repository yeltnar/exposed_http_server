const express = require("express");
const fs = require("fs");

const router = express.Router();

router.use("/",express.static("./mnt",{fallthrough:true}));

router.use((req,res,next)=>{
    
    const {originalUrl} = req;

    let dir_contents;
    let err;
    try{
        dir_contents = fs.readdirSync(`./mnt${originalUrl}`);
    }catch(e){
        err = e;
    }

    res.json({
        originalUrl,
        dir: dir_contents,
        err
    })
})

module.exports = {router}
