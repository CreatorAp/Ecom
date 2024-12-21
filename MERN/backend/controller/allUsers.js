const userModel = require("../models/userModel")

async function allUsers(req, res){

    try{ 
        const allUser = await userModel.find()

        res.status(200).json(
            {
                data: allUser,
                message: "All Users ",
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

module.exports = allUsers