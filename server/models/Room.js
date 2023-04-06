const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomNo:{
        type:Number,
        min:1,
        max:100,
        required:true,
    },
    roomType:{
        type:String,
        enum:['single','double','suite'],
        required:true
    },
    lastOccupied:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('Room',RoomSchema);