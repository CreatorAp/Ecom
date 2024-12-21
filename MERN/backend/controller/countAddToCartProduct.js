const addToCartModel = require("../models/cardProduct")
const productModel = require("../models/productModel")

async function countAddToCartProduct(req, res){

    try{ 
        
        const  userId  = req.userId

        const  count  = await addToCartModel.countDocuments({ userId: userId })

        
        return res.json(
            {                    
                data : {
                    count: count
                },
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

module.exports = countAddToCartProduct