const uploadProductPermission = require("../helpers/permission")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

async function getCategoryProduct(req, res){

    try{ 
        
        const productCategory = await productModel.distinct("category")

        const productByCategory = []

        for (const category of productCategory){
                        const product = await productModel.findOne({category})
                        if(product){
                            productByCategory.push(product)
                            }
        }

        res.status(201).json(
            {
                data: productByCategory,
                message: "Category Product ",
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

module.exports = getCategoryProduct