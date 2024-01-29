const Posts = require("../models/post")

const S3services=require('../services/S3-services')// Used AWS S3Bucket for media upload

exports.uploadPost=async (req,res)=>{
    try{
     const file=req.file;

     const filename=`InstaPost/${new Date()}`

     const fileurl=await S3services.uploadToS3(file.buffer,filename);

     const userName='sumit';//used dummy username

     const imageUrl=fileurl;

     const description=req.body.description;

     const like=0; 

    const post=new Posts(null,userName,imageUrl,description,like)

    await post.save()
    res.status(200).json({post:post})
    }
    catch(e){
        res.status(500).json({message:"unable to  post"})  
    }
    
}

// for getting all posts
exports.getAllposts=async (req,res)=>{
    try{
    const posts=await Posts.fetchAll();
    res.status(200).json({posts:posts});
    }
    catch(e){
        res.status(404).json({message:"unable to get posts"})
    }
    
}