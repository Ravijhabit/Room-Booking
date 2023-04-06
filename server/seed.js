const Room = require('./models/Room');
const mongoose  = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Mongoose connected');
    }).catch(err => {
        console.log(err);
    });

const allRooms = [];
async function createRooms(){
    let roomNo,roomType;
    for(let i=1;i<70;i++){
        roomNo = i;
        if(i<40){
            roomType='single';
        }else if(i<60){
            roomType='double';
        }else{
            roomType='suite';
        }
        lastOccupied = new Date();
        allRooms.push({roomNo, roomType, lastOccupied});
    }
    await Room.insertMany(allRooms)
        .then(res => {
            console.log(res);
        })
        .catch(e=>{
            console.log(e);
        });
    await mongoose.connection.close();
}


createRooms();
