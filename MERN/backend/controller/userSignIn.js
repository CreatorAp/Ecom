const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function userSignInController(req, res){
    try{
       const {email, password } = req.body;

       const user = await userModel.findOne({email})

       if(!user){
        throw new Error("user not ecists")
       }

       if(!email){
        throw new Error("please provide email")
       }

       if(!password){
        throw new Error("please provide password")
       }
    
       
       const checkPassword = await bcrypt.compare(password, user.password)

       console.log("check password", checkPassword)

       if(checkPassword){
        const tokenData = {
            _id : user._id,
            email : user.email,
        }
        console.log("user id " , user._id)

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
        console.log("tokenData " , tokenData)
        console.log("process.env.TOKEN_SECRET_KEY " , process.env.TOKEN_SECRET_KEY)

        const tokenOption = {
            httpOnly: true,
            secure: true
        }
        
        res.cookie("token", token, tokenOption ).json({
            message: "Login successfully",
            data: token,
            success: true,
            error: false,
        }
        )

       }
       else{
        throw new Error("Please check password")
       }


    }catch(err){
        res.json(
            {
                message: err.message || err,
                error: true,
                success: false
            }
        )
    }

}

module.exports = userSignInController