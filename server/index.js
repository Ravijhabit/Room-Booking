const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking')


const User = require('./models/User.js');
const Booking = require('./models/Booking.js');

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = process.env.SECRET;
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:5173'
}));
app.get('/',(req,res)=>{
    console.log('Test is working');
})
app.use('/user', userRoutes);
app.use('/booking',bookingRoutes);
// app.use('/profile',(req,res)=>{
//     const {token} = req.cookies;
//     if(token){
//         jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
//             if(err) throw err; 
//             const {name, email,_id} = await User.findById(userData.id);
//             res.json({name,email,_id});
//         });
//     }else{
//         res.status(200).json(null);
//     }
// })

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Mongoose Connected');
    }).catch(err=>{
        console.log(`error is ${err}`);
    });

// function getUserDataFromReq(req){
//     return new Promise((resolve, reject)=>{
//         jwt.verify(req.cookies.token, jwtSecret, {},async(err, userData)=>{
//             if(err)
//                 throw err;
//             resolve(userData);
//         });
//     });
// }

app.get('/profile', async (req,res)=>{
    const {token} = await req.cookies;
    if(token){
        try{
            jwt.verify(token, jwtSecret, {}, async(err, userData)=>{
                if(err) throw err;
                const {username, email, _id} = await User.findById(userData.id);
                res.json({username, email,_id});
            });
        }catch(err){
            res.status(301).json(err);
        }
    }else{
        res.json(null);
    }
});

app.listen(port, function(){
    console.log(`Server listening on ${port}`);
});