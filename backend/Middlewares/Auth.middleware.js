const jwt = require("jsonwebtoken")


const authChecker = (req,res,next)=>{
    const token = req.headers.authorization
    jwt.verify(token,"user",(err,decoded)=>{
        if(decoded){
            req.body.userId = decoded.userId
            next()
        }else{
            res.status(400).send({msg:"user is not authorized",err})
        }
    })
}

module.exports = authChecker