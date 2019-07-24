const express = require('express');
const router = express.Router();
const User = require('../models/users')
const bcrypt = require('bcryptjs')

router.get("/new", (req,res)=>{
    res.render("users/new.ejs");
})

router.post("/", async (req, res)=>{
    try{
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const newUser = await User.create(req.body);
        console.log(newUser);
        req.session.userID = newUser._id
        res.redirect('/venues')
    }
    catch(err){
        res.send(err)
    }
})


router.get("/login", (req, res)=>{
    res.render("users/login.ejs");
})

router.post('/login', async (req, res)=>{
    try{
        const userFromDB = await User.findOne({username: req.body.username})
        const passwordIsValid = bcrypt.compareSync(req.body.password, userFromDB.password)
        console.log(passwordIsValid);
        if(passwordIsValid){
            req.session.userID = userFromDB._id;
            res.redirect("/venues")
        }
        else{
            res.session.message = "Invalid credentials, please try again!"
            res.redirect('/users/login')
        }
    }
    catch(err){
        req.session.message = "User does not exist";
        res.redirect('/users/login')
    }
})


module.exports = router;