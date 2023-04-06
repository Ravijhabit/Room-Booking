const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    checkIn:{
        type:Date,
        required:true,
        min: ['2023-03-19',"That's babylions age go ahead"],
        max:['2024-03-19',"One eternity Later..."]
    },
    checkOut:{
        type:Date,
        required:true,
        min: ['2023-03-19',"That's babylions age go ahead"],
        max:['2024-03-19',"One eternity Later..."]
    },
    price:{
        type:Number,
        required:true,
        min:[0,"shouldn't be negative"]
    },
    guests:{
        type:Number,
        required:true,
        min:[0,'Negative not possible']
    },
    numberOfRooms:{
        type:Number,
        required:true,
        min:[0,'Negative room not possible']
    },
    room:{
        type:Schema.Types.ObjectId,
        ref:'room',
        required:true
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
