const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js')

//register

router.post('/register', async (req,res)=>{
    const NewUser = new User({
        username: req.body.username,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        name: req.body.name,
        lastName:req.body.lastName,
        age:req.body.age,     
        uploaded_file:req.body.uploaded_file,
        email: req.body.email,
    });
    try{
        const saveUser = await NewUser.save();
        res.status(201).json(saveUser)
        console.log(saveUser)
    }
    catch(err){
    res.status(500).json(err)
    }
})




module.exports = router