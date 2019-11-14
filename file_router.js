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
        dir_contents = [`<!DOCTYPE html><meta charset="UTF-8"><HTML>`,...dir_contents.map((cur,i,arr)=>{
            return `<a href="javascript:(()=>{window.location.href+='${cur}'})()">${cur}</a></br>`;
        }),`</HTML>`];
        dir_contents = dir_contents.join("");
    }catch(e){
        err = e;
        dir_contents=JSON.stringify({
            originalUrl,
            error:true,
            err_msg:err,
        });
    }

    // res.json({
    //     originalUrl,
    //     dir: dir_contents,
    //     err
    // })
    res.end(dir_contents);
})

module.exports = {router}
