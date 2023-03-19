const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
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
    NumberOfRooms:{
        type:Number,
        required:true,
        min:[0,'Negative room not possible']
    },
    roomType:{
        type:String,
        enum:['Single','Double','Sweet'],
        required:true
    }
});

export const BookingModel = mongoose.model('bookings', BookingSchema);
