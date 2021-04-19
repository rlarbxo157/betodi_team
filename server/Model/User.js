const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//스키마 생성
const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    
    email : {
        type : String,
        //trim은 문자열 내 공백을 없애준다.
        trim : true,
        //유일한 값
        unique : 1
    },

    password : {
        type : String,
        minlength : 5
    },

    lastname : {
        type : String,
        maxlength : 50
    },

    role : {
        type : Number,
        default : 0
    },

    image : String,

    token : {
        type : String
    }, 
	
    //토큰이 유효한 시간
    tokenExp : {
        type : Number
    }
})

userSchema.pre('save',function(next){
    let user = this;   //schema 안에 정보를 가르킴
    if(user.isModified('password')){   //field 중에 password가 바뀔때만 
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err);

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err)
                
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})
userSchema.methods.comparePassword = function(plainPassword,callback){

    //plainPasswod 1234567   db에 존재하는 암호화된 비밀번호
    //plainPassword 를 암호화해서 db에있는 암호화된 비밀번호랑 매칭시키면됨.
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return callback(err);

        callback(null,isMatch);
    })
    
}
userSchema.methods.generateToken = function(callback) {
    let user =this;
    //jsonwebtoken을 이용해서 token 생성하기
    let token = jwt.sign(user._id.toHexString(),'secretToken')

    user.token = token
    user.save(function(err,user){
        if(err) return callback(err)

        callback(null,user)
    })

}
userSchema.statics.findByToken = function(token,callback){
    let user = this;

    //토큰을 가져와서 decode 한다
    jwt.verify(token,'secretToken',function(err,decoded){   //decoded 된건 유저아이디가 될거임
        //유저 아이디를 이용해서 유저 찾고, 클라이언트에서 가져온 token과 db에 보관된 토큰 일치하는지 확인

        user.findOne({"_id":decoded, "token":token},function(err,user){
            if(err) return callback(err);
            callback(null,user);
        })

    })
}
const User = mongoose.model('User', userSchema)
module.exports  ={User}

