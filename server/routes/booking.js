const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Booking = require('../models/Booking');

const jwtSecret = 'sdaflhsdalkjghwoifkasndc';

const router = express.Router();

function getUserDataFromReq(req){
    return new Promise((resolve, reject)=>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async( err, userData )=>{
            if(err)
                throw err;
            resolve(userData);
        });
    });
}

//create
router.post('/new', async(req,res)=>{
    try{
        const userData = await getUserDataFromReq(req);
        const {checkIn, checkOut, price, guests, numberOfRooms, roomType} = req.body;
        const data = await Booking.create({
            checkIn,
            checkOut,
            price,
            guests,
            numberOfRooms,
            roomType,
            user:userData.id
        });
        res.json(data);
    }catch(err){
        res.status(422).json(err);
    }
});

//read
router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    const bookingInfo = await Booking.findById(id);
    if(bookingInfo){
        res.json(bookingInfo);
    }else{
        res.json(null);
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
    
        const bookingInfo = await Booking.findByIdAndUpdate(
                checkIn, checkOut, price, guests, numberOfRooms, roomType
        );

        res.json({bookingInfo});
    }else{
        res.json('No such booking available');
    }
});

//delete
router.delete('/:id/delete', async (req,res)=>{
    const {id} = req.params;
    const {token} = req.cookies;
    const {password} =req.body;
    if(token){
        let userData = '';
        jwt.verify(token, jwtSecret, {}, async(err, user)=>{
            if(err) throw err;
            userData = await User.findById(user.id);
            if(userData){
                const checkBooking = await Booking.findById(id);
                if(checkBooking){
                    const response = await Booking.deleteOne({_id:checkBooking._id});
                    res.json('Booking Deleted');
                }else{
                    res.json('No such booking available');
                }
            }else{
                res.json('No such user');
            }
        });
    }else{
        res.json('No user available at the moment');
    }
});

module.exports = router;