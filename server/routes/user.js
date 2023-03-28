const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = 'sdaflhsdalkjghwoifkasndc';

const router = express.Router();

//create
router.post('/register', async(req,res)=>{
    try{
        const {username, email, password} = req.body;
        const user = await User.create({
            username, 
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(user);
    } catch(err){
        res.status(422).json(err);
    }
});

//read
router.post('/login', async(req,res)=>{
    const { username,password } = req.body;
    const user = await User.findOne({username});

    if(!user){
        res.status(404).json('not found');
    }else{
        const passOk = bcrypt.compareSync(password, user.password);
        if(passOk){
            jwt.sign({
                email: user.email,
                id:user._id,
                username: user.username},
                jwtSecret, {},
                (err, token) => {
                    if(err)
                        throw err;
                    res.cookie('token',token).json(user);
            });
        }else{
            res.status(422).json('pass not ok');
        }
    }
});

//update

//delete
router.delete('/delete', async(req,res)=>{
    const {token} = req.cookies;
    const {password} =req.body;
    if(token){
        let userData='noValue';
        jwt.verify(token, jwtSecret, {}, async(err, user)=>{
            if(err) throw err;
            userData = await User.findById(user.id);   
            if(userData){
                const passOk = bcrypt.compareSync(password,userData.password);
                if(passOk){
                    const userDeleted = await User.deleteOne({email:userData.email});
                    res.cookie('token','');
                    res.json(userDeleted);
                }else{
                    res.json('Username or password incorrect');
                }
            }else{
                res.json('No such user');
            }
        });
    }else{
        res.json('No user available at the moment');
    }
});

router.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

module.exports = router;