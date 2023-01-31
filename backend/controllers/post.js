const { json } = require("express")
const Post = require("../models/post")

exports.createPost = async(req, res) => {
    try{
        const post = new Post(req.body).save()
        res.json(post)
        
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

exports.getAllPosts = async(req, res) => {
    try{
        const posts = await Post.find().populate("user", "first_name last_name picture username gender").sort({createdAt: -1})
        res.json(posts)
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}