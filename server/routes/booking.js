const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const User = require('../models/User');
const Booking = require('../models/Booking');
const Room = require('../models/Room');

const jwtSecret = process.env.SECRET;

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

async function roomAvailablity({checkIn, checkOut, roomType , userID}){
    let status=false;
    let roomAvailable;
    const rejectRooms = [];
    // console.log(status);
    while(!status){
        // console.log(status);
        roomAvailable = await Room.findOne({$and: [{roomType:roomType.toLowerCase()}, { roomNo: {$nin:rejectRooms} }] });
        // roomAvailable = await Room.findOne({ roomNo: {$nin:rejectRooms} });
        if(roomAvailable.length===0)
            return false;
        status = await roomAvailable.status({checkIn, checkOut , user:userID});
        if(!status){
            rejectRooms.push(roomAvailable.roomNo);
            // console.log('We increased the room number');
        }
    }
    return roomAvailable;
}

//create
router.post('/new', async(req,res)=>{
    try{
        const userData = await getUserDataFromReq(req);
        const {checkIn, checkOut, price, guests, numberOfRooms, roomType} = req.body;
        const roomAvailable = await roomAvailablity({checkIn,checkOut, roomType, userID: userData.id});
        if(!roomAvailable){
            return res.status(204).json();
        }
        const booked = await Booking.create({
            checkIn,
            checkOut,
            price,
            guests,
            numberOfRooms,
            room:roomAvailable._id,
            user:userData.id,
        });
        const user = await User.findById(userData.id);
        user.bookings.push(booked);
        user.save();
        res.json('ok booked');
    }catch(err){
        res.status(422).json(err);
    }
});

//read
router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    let userData='';
    try{    
        userData = await getUserDataFromReq(req);
        const bookingInfo = await Booking.findById(id).populate({path:'room', select:['roomType','roomNo']});
        if(bookingInfo){
            res.json(bookingInfo);
        }else{
            res.json(null);
        }
    }catch(err){
        if(userData)
            return res.status(404).json(err);
        res.status(422).json(err);
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
                roomType,
                oldCheckIn
        } = req.body;
        const deleteRoomBooking = await Room.findOneAndUpdate(checkBooking.room, {$pull: { lastOccupied: {'checkIn':oldCheckIn}}});
        // console.log(deleteRoomBooking);
        const roomAvailable = await roomAvailablity({checkIn, checkOut, roomType, userID: checkBooking.user});
        if(!roomAvailable){
            res.status(204).json();
        }
        // console.log(roomAvailable);
        const bookingInfo = await Booking.findByIdAndUpdate( id,{
                checkIn, checkOut, price, guests, numberOfRooms, room:roomAvailable._id
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
                        await Room.findOneAndUpdate(checkBooking.room,{$pull:{ lastOccupied:{'checkIn':checkBooking.checkIn}}});
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