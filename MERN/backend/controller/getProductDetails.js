const productModel = require("../models/productModel")

async function getProductDetails(req, res){

    try{ 
            const { productId } = req.body

        const product = await productModel.findById(productId)

        res.status(200).json(
            {
                data: product,
                message: "Ok ",
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

module.exports = getProductDetails