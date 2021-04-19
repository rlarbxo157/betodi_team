const express = require('express');
const {User} = require("./Model/User");



const app = express();
const PORT =process.env.PORT || 8000;
const mongoose = require('mongoose');
const cookieParser =require('cookie-parser');
const {auth}  =require('./middleware/auth');
const cors = require('cors')  //cors 에러 해결하기위해

mongoose.connect('mongodb+srv://rlarbxo157:""@cluster0.7xilp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('몽고디비 연결')).catch((err)=>console.log(err));



app.use(express.urlencoded({ extended: false }));
app.use(express.json());  //
app.use(cookieParser());
app.use(cors())


app.use('/api/users',require('./routes/users'));

app.get('/',(req,res)=> {  //localhost:8000 접속시
    res.send('hihi')
  })

app.listen(PORT, () => {  
    console.log(`example app ${PORT} `);
})