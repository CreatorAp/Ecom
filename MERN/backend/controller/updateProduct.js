const uploadProductPermission = require("../helpers/permission")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

async function updateProduct(req, res){

    try{ 
        const sessionUserId = req.userId
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const {_id, ...resbody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resbody)

        res.status(201).json(
            {
                data: updateProduct,
                message: "Product update successfully ",
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

module.exports = updateProduct