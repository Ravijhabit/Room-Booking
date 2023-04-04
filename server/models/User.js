const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:[true,'email cannot be blank'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password cannot be blank'],
    },
    username:{
        type:String,
        required:[true,'username cannot be blank'],
        unique:true
    },
    bookings:[{
        type:Schema.Types.ObjectId,
        ref:'Booking',
    }],
});

module.exports = mongoose.model("User",UserSchema);