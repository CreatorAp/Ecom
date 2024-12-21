const productModel = require("../models/productModel")

async function getProduct(req, res){

    try{ 
        const allProduct = await productModel.find().sort({ createdAt : -1 } )

        res.status(200).json(
            {
                data: allProduct,
                message: "All products ",
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

module.exports = getProduct