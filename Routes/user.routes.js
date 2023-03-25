const express = require("express")
const bcrypt = require("bcryptjs")
const userAuthModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()



authRouter.get("/",async(req,res)=>{
    try {
        const usersData = await userAuthModel.find()
        res.status(200).send({msg:"Data of all the users",data:usersData})
    } catch (error) {
        res.status(400).send({msg:"error while fetching the data"})
    }
})

authRouter.post("/register",async(req,res)=>{
    const {password} = req.body
    const pass = await bcrypt.hash(password,8)
    const data = {...req.body,password:pass}
    try {
        const postedData = new userAuthModel(data)
        await postedData.save()
        res.status(200).send({msg:"user registerd succesfully",token:jwt.sign({userId:"register"},"user")})
    } catch (error) {
        res.status(400).send({msg:"user registration failed"})
    }
})
authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const checkLogin = await userAuthModel.find({email})
        console.log(checkLogin)
        const compare = bcrypt.compareSync(password,checkLogin[0].password)
        if(compare){
            res.status(200).send({msg:"user logged in succesfully",token:jwt.sign({userId:checkLogin[0]._id},"user")})
        }else{
            res.status(400).send({msg:"No account exist"})
        }
        } catch (error) {
        res.status(400).send({msg:"user registration failed"})
    }
})
 


module.exports = authRouter