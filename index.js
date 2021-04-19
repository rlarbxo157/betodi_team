const express = require('express');

const app = express();
const PORT =process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());  //

app.get('/',(req,res)=> {  //localhost:8000 접속시
    res.send('hihi')
  })

app.listen(PORT, () => {  
    console.log(`example app ${PORT} `);
})