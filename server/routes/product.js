const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../Model/Product')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, '../uploads')
    cb(null, 'uploads/')

  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

  //가져온 이미지를 저장을 해주면 된다.
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })
})

router.post('/', (req, res) => {

  // 받아온 정보들을 db에 저장
  const product = new Product(req.body)

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })


})

router.post('/products', (req, res) => {
  // 모든상품가져오기

  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;   // body에 limit정보를 받아와 integer형으로 바꾸기, limit정보없으면 30개
  let term = req.body.searchTerm

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) { //key 값이 cate나 price가 되겠지
      findArgs[key] = req.body.filters[key];
    }
  }

  console.log('findArgs', findArgs);

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
          success: true, productInfo,
          postSize: productInfo.length
        })
      })

  } else {
    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
          success: true, productInfo,
          postSize: productInfo.length
        })
      })

  }


  router.get('/product_by_id', (req, res) => {
    let type = req.query.type
    let productIds = req.query.id


    if (type === "array") {
      //id =12,23,43 이거를
      // productIds = ['12','23','43'] 이렇게 바꿔야함. 상품아이디는 여러개니까
      let ids = req.query.id.split(',')
      productIds = ids.map(item => {
        return item
      })
    }

    Product.find({ _id: { $in: productIds } })
      .populate('writer')
      .exec((err, product) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true, product })
      })


  })

  // skip과 limit 은 몽고db 메서드

})
//populate은 id를 이용해 누가 작성했는지에 대한 정보를 가져오기위해
router.get("/user/:userId", async (req, res) => {
  try {
    const product = await Product.find({
      writer: req.params.userId,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    await product.updateOne({ $set: { isSold: true } });
    res.status(200).json("the post has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;