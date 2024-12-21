const userModel = require('../models/userModel')


async function userLogoutController(req, res){
    try{
        res.clearCookie("token")

        res.json(
            {
                data: [],
                message: "User logged out",
                error: false,
                success: true
            }
        )

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

module.exports = userLogoutController