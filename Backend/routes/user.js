const express =require('express');

const postController=require('../controlllers/post')
//for media uploading as middleware multer is used
const Multer=require('../middleware/multer')

const upload =Multer.multer.single('image')

const router =express.Router();
//for post
router.post('/post',upload,postController.uploadPost)
//for getting 
router.get('/get-posts',postController.getAllposts)

module.exports=router;