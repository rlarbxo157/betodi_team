const express = require('express');
const { User } = require("./Model/User");

const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const cors = require('cors')
app.use('/uploads', express.static('uploads'));
const axios = require('axios');
const cheerio = require('cheerio');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
// mongodb+srv://ksh5681:ksh5681@cluster0.a8wub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://rlarbxo157:sjaks7788@cluster0.7xilp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('몽고디비 연결')).catch((err) => console.log(err));
//mongodb+srv://rlarbxo157:sjaks7788@cluster0.7xilp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(cors())

app.use("/images", express.static(path.join(__dirname, "public/images")));
// app.get('/',(req,res)=> res.send('접속됨'))

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

app.use('/api/conversations', require('./routes/conversations'));
app.use('/api/messages', require('./routes/messages'));
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`example app ${PORT} `);
})

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요')
})

const getHtml = async (word) => {
  let wordUrl = word;
  try {
    return await axios.get(`https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=${wordUrl}&x=0&y=0`);
  } catch (error) {
    console.log(error);
  }
}

app.post("/craw", (req, res) => {
  let word = encodeURI(req.body.searchData);
  getHtml(word)
    .then((html) => {
      const $ = cheerio.load(html.data);
      let parentTag = $("div.ss_book_box");
      let resultArr = [];
      parentTag.each(function (i, elem) {
        let itemObj = {
          platform: '알라딘',
          title: $(this).find('a.bo3 b').text(),
          price: $(this).find("b span").text(),
          imgEl: $(this).find("img").attr('src'),
          link: $(this).find("div.ss_book_list a").attr('href')
          // img: $(this).find("img")
        };
        resultArr.push(itemObj);
      });
      return resultArr;
    })
    .then((data) => res.send(data));
});

const yesHtml = async (word) => {

  let wordUrl = word;
  try{
    return await axios.post(`https://search.kyobobook.co.kr/web/search?vPstrKeyWord=${wordUrl}&orderClick=LAG`);
  } catch(error){
      // console.log(error);
  }
}

app.post("/kraw", (req, res) => {
  
  let newWord = req.body.searchData;
  let a = encodeURI(newWord)
  let b = a.replace(/%/gi,"%25")

  yesHtml(b)
    .then((html) => {
      const $ = cheerio.load(html.data);
      // 크롤링할 태그 찾기
      const parentTag = $("tbody").children('tr')
      // console.log(parentTag);
      let resultArr = [];
      parentTag.each(function (i, elem) {   
        let itemObj = {
          platform:'교보문고',
          title:$(this).find('td.detail div.title strong').text(),
          price:$(this).find('div.sell_price strong').text(),
          imgEl : $(this).find("td.image img").attr('src'),
          link :$(this).find('td.image a').attr('href'),
          author:$(this).find('div.author a').text(),
        };
        // console.log(itemObj);
        resultArr.push(itemObj);
        
      });
      return resultArr;
    })
    .then((data) =>res.send(data));
});


app.get('/', (req, res) => {
  res.send('hihi')
})