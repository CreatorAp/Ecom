const userModel = require("../models/userModel")

async function updateUser(req, res){

    try{ 
        const sessionUser = req.userId

        const { name, email,role, userId} = req.body

        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role })
        }

        const user = userModel.findById(sessionUser)

        console.log("user role", user.role)

        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        res.status(200).json(
            {
                data: updateUser,
                message: "Users update",
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

module.exports = updateUser