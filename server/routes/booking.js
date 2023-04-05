const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const User = require('../models/User');
const Booking = require('../models/Booking');

const jwtSecret = 'sdaflhsdalkjghwoifkasndc';

const router = express.Router();

function getUserDataFromReq(req){
    return new Promise((resolve, reject)=>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async( err, userData )=>{
            if(err)
                reject(err);
            resolve(userData);
        });
    });
}

//create
router.post('/new', async(req,res)=>{
    try{
        const userData = await getUserDataFromReq(req);
        const {checkIn, checkOut, price, guests, numberOfRooms, roomType} = req.body;
        const booked = await Booking.create({
            checkIn,
            checkOut,
            price,
            guests,
            numberOfRooms,
            roomType,
            user:userData.id
        });
        const user = await User.findById(userData.id);
        user.bookings.push(booked);
        user.save();
        res.json(booked);
    }catch(err){
        res.status(422).json(err);
    }
});

//read
router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        const bookingInfo = await Booking.findById(id);
        if(bookingInfo){
            res.json(bookingInfo);
        }else{
            res.json(null);
        }
    }catch(err){
        res.status(404).json('Not Found');
    }
});

//update
router.put('/:id/edit', async (req,res)=>{
    const {id} = req.params;
    const checkBooking = await Booking.findById(id);
    if(checkBooking){
        const {
                checkIn, 
                checkOut,
                price,
                guests,
                numberOfRooms,
                roomType
        } = req.body;
        const bookingInfo = await Booking.findByIdAndUpdate( id,{
                checkIn, checkOut, price, guests, numberOfRooms, roomType
        });
        
        res.json({bookingInfo});
    }else{
        res.json('No such booking available');
    }
});

//delete
router.delete('/:id/delete', async (req,res)=>{
    const {id} = req.params;
    const {token} = req.cookies;
    const {password} = req.body;
    if(token){
        let userData = '';
        jwt.verify(token, jwtSecret, {}, async(err, user)=>{
            if(err) throw err;
            userData = await User.findById(user.id);
            if(userData){
                const passOk = bcrypt.compareSync(password, userData.password);
                if(passOk){
                    const checkBooking = await Booking.findById(id);
                    if(checkBooking){
                        await Booking.deleteOne({_id:checkBooking._id});
                        //delete from user
                        const user = await User.updateOne({_id:checkBooking.user},{$pull:{bookings:checkBooking._id}});
                        res.json(user);
                    }else{
                        res.json('No such booking available');
                    }
                }else{
                    res.status(401).json('Unauthorised');
                }
            }else{
                res.status(404).json('Not Found');
            }
        });
    }else{
        res.json('No user available at the moment');
    }
});

module.exports = router;