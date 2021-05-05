const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//스키마 생성
const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    selectedbooks: {
        type: Array,
        authors: {
            type: Array,
            default: [""]
        },
        contents: {
            type: String,
            default: ""
        },
        datetime: {
            type: String,
            default: ""
        },
        isbn: {
            type: String,
            default: ""
        },
        price: {
            type: Number,
            default: ""
        },
        publisher: {
            type: String,
            default: ""
        },
        sale_price: {
            type: Number,
            default: ""
        },
        thumbnail: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        translators: {
            type: Array,
            default: [""]
        },
        url: {
            type: String,
            default: ""
        },
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },

    major: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamp: true })

productSchema.index({   // input 값이 중점으로 걸리는 스키마의 종류를 지정
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description: 1
    }
})



const Product = mongoose.model('Product', productSchema)

module.exports = { Product }

