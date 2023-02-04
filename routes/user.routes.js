const User = require("../models/User")
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken')

const router = require('express').Router();


router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
        ).toString()
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }

})

//Delete

router.delete("/:id",verifyTokenAndAuthorization, async(req,res)=>{
    try{
    await User.findByIdAndDelete(req.params.id) 
    res.status(200).json("User has been Deleted...")       
    }catch(err){
        res.status(500).json(err)
    }
})


//get 

router.get("/find/:id",verifyTokenAndAdmin, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,...others}= user._doc;
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

//get all users
router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new;
    try{
        const users = query? await User.find().sort({_id: -1}).limit(5): await User.find()       
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
})

//get User Stats

router.get("/stats", verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));
    try{
        const data = await User.aggregate([
            {$match: {createdAt:{$gte: lastYear}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                },
            }, 
            {
                $group:{
                _id:"$month",
                total:{$sum:1},
                } 
            }
        ])
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGU1NzFlMzk5NjUxOTU1NmNmN2Q1NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTUxNTg0MywiZXhwIjoxNjc1Nzc1MDQzfQ.O2k3Rb3SQvoNsDYWjH1NjhgyaI-1OBqWZaHknUUVNxo




module.exports = router