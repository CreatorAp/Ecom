const addToCartModel = require("../models/cardProduct")
const productModel = require("../models/productModel")

async function updateAddToCartProduct(req, res){

    try{ 
        

        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({
            _id : addToCartProductId
        }, {... (qty && {quantity: qty})})

        res.json({
            message:"Product update",
            data : updateProduct,
            success : true,
            error : false
        })
        
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

module.exports = updateAddToCartProduct