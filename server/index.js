const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const app = express();

const UserModel = require('./models/User');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);
const db=mongoose.connection;
db.on('error',console.error.bind(console,'Mongoose Connection Error'));
db.once('open', ()=>{
    console.log('Connection established with Mongoose');
});

app.use('/register',async (req, res)=>{
    const {username, email, password} = req.body;
    const modifiedEmail=email.toLowerCase();
    const userEmail = await UserModel.findOne({email:modifiedEmail});
    if(userEmail){
        return res.json('User already exists');
    }
    const userName = await UserModel.findOne({username});
    if(userName){
        return res.json('UserName already exists. Please choose another');
    }
    const hashedPassword = await bcrypt.hash(password,12);
    const User = new UserModel({username,email:modifiedEmail,password:hashedPassword});
    await User.save();
    res.json('Ok Registered');
});

app.use('/login',async (req,res)=>{
    const {username, password} = req.body;
    const user =  await UserModel.findOne({username});
    if(!user){
        return res.json({message:"User doesn't exists"});
    }
    const isValidPassword = await bcrypt.compare(password,user.password);
    
    if(!isValidPassword){
        return res.json({message:'Username or Password Incorrect'});
    }
    return res.json('ok logined')
})

app.listen(3000, ()=>{
    console.log('Server started at 3000');
});