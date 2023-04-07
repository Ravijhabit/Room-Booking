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
    lastOccupied:[{
        checkIn:{
            type:Date,
            required:true,
        },
        checkOut:{
            type:Date,
            required:true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    }]
});

RoomSchema.methods.status = function({checkIn, checkOut, user}){
    let possible = false;
    const lastOccupied = this.lastOccupied;
    const sz = lastOccupied.length; 
    // console.log(sz);
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    // console.log(this.roomNo);
    for(let i=0; i<=sz;i++){
        if(i<sz){
            const prevCheckOut = lastOccupied[i].checkOut;
            const prevCheckIn = lastOccupied[i].checkIn;
            // console.log(prevCheckOut);
            // console.log(' - '+checkInDate);
            if(prevCheckOut<checkInDate){
                // console.log('first case');
                continue;
            }else if((prevCheckIn<=checkOutDate) || (i+1<sz && lastOccupied[i+1].checkIn<checkOutDate)){
                // }else if(i+1<lastOccupied.length && lastOccupied[i+1].checkIn<checkOut){
                    //update lastOccupied with new room
                    //find in a while loop till we get such a room that this happens
                // console.log('second case');
                // console.log('not possible');
                break;
            }else{
                //pushing this value in such a way that we get the checkIn,checkOut in sorted form
                // console.log('third case');
                // console.log('Inserted at '+i);
                let pos = i;
                if(i===0)
                    pos=1;
                // console.log('Inserted at ',pos);
                this.lastOccupied.splice(pos,0,{checkIn,checkOut,user});
                // if(i!=lastOccupied.length)
                // console.log(checkIn);
                // console.log(checkOut);
                possible = true;
                this.save();
                break;
            }
        }else{
            this.lastOccupied.push({checkIn,checkOut,user});
            this.save();
            possible = true;
        }
    }
    return possible;
};
module.exports = mongoose.model('Room',RoomSchema);