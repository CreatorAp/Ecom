const userModel = require("../models/userModel")


async function userDetailsController(req, res){

    try{ 
        console.log("id", req.userId)

        const user = await userModel.findById(req.userId)
        console.log("user", user)

        res.status(200).json(
            {
                data: user,
                message: "User details",
                error: false,
                success: true
            }
        )
     }catch(err){
        res.status(400).json(
            {
                message: err.message || err,
                error: true,
                success: false
            }
        )
     }


}

module.exports = userDetailsController