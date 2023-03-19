const express = require('express');
const app = express();

app.use('/test',(req, res)=>{
    res.json('ok tested');
});

app.listen(3000, ()=>{
    console.log('Server started at 3000');
});