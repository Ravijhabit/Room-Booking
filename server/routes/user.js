const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');
const Booking = require('../models/Booking');

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = process.env.SECRET;

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
                    res.cookie('token',token, 
                    {    
                        sameSite: "none",
                        secure: true,
                    }
                    ).json(user);
            });
        }else{
            res.status(422).json('pass not ok');
        }
    }
});

router.get('/allbooking',async(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async(err, user)=>{
            if(err) throw err;
            const noBooking = await User.findOne({_id:user.id}).
            populate({
                path:'bookings',
                populate:{
                    path:'room',
                    select:['roomType', 'roomNo']
                }
        })
            res.json(noBooking.bookings);    
        });
    }else{
        res.status(401).json('No data available');
    }
})


//delete
router.delete('/delete', async(req,res)=>{
    const {token} = req.cookies;
    const {password} =req.body;
    if(token){
        let userData='';
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

//update
//create a middleware which checks if password is correct or not
// router.put('/:id/edit', async(req,res)=>{
//     try{
//         const {username, email, password} = req.body;
//         const user = await User.create({
//             username, 
//             email,
//             password: bcrypt.hashSync(password, bcryptSalt),
//         });
//         res.json(user);
//     } catch(err){
//         res.status(422).json(err);
//     }
// });
router.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

module.exports = router;