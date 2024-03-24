import express from "express";
import PostModel from "../models/PostSchema.js";
import UserModel from "../models/UserAuth.js";
import Post_Model from "../models/PostSchema.js";
import verifytoken from "../middleware/verifytoken.js";

const router = express.Router();

router.post("/createpost/:userid", async (req, res) => {
  const { userid } = req.params;
  const { name, categories, content } = req.body;
  console.log(req.body);
  console.log(req.params);
  try {
    const newPost = await PostModel.create({
      name,
      categories,
      userid,
      content,
    });
    // newPost.userid.push(userId);
    // await newPost.save()
    const user = await UserModel.findById(userid);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.Post.push(newPost._id);
    await user.save();

    return res.status(201).send({ message: "Post created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get('/getAllPosts',async(req,res)=>{
    let allposts=await PostModel.find();
    res.status(200).json({allposts})
})

router.get('/getMyPosts/:_id',verifytoken,async(req,res)=>{
    let _id=req.params._id
    // console.log(req.params)
    console.log(_id)
    let user=await UserModel.findById(_id)
    let Post=user.Post
    // console.log(Post)
    let posts=[]
    for(let i of Post){
      let post=await PostModel.findById(i);
      posts.push(post)
    }
    console.log(posts)
    res.status(200).json({success:true,posts})
})

export default router;