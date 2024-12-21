const uploadProductPermission = require("../helpers/permission")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

async function uploadProduct(req, res){

    try{ 
        const sessionUserId = req.userId
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json(
            {
                data: saveProduct,
                message: "Product soccessfully uploaded ",
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

module.exports = uploadProduct