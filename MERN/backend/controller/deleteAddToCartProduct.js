const addToCartModel = require("../models/cardProduct")
const productModel = require("../models/productModel")

async function deleteAddToCartProduct(req, res){

    try{ 
        
        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id
                
        const updateProduct = await addToCartModel.deleteOne({
            _id : addToCartProductId
        })

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

module.exports = deleteAddToCartProduct