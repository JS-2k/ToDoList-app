const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require("mongoose")
const TaskRoute = require('./routes/TaskRoute');
const cors = require('cors');

// middleware
app.use((req,res,next)=>{
    console.log('path' + req.path + 'method' +' '+ req.method);
    next();
});

app.use(cors());

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Welcome');
// })

// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=> {
        console.log("DB connection started on port :" + process.env.PORT);
    });
    })
    .catch((err) => console.log(err));
    

    app.use('/api/tasks',TaskRoute);