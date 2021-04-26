const { User } = require("../Model/User");

let auth = (req,res,next)=> {
    //인증 처리하기위함.
    // 1.client 쿠키에서 토큰을 가져옴.
    // 2.토큰을 복호화해서 유저를 찾음.
    // 3. 유저가있으면 인증해주고 없으면 인증 안해줌.
    let token = req.cookies.w_auth;

    User.findByToken(token,(err,user)=> {
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error:true})

        req.token = token;
        req.user = user;
        next();
    })



}

module.exports ={auth}