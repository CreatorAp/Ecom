const addToCartModel = require("../models/cardProduct")
const productModel = require("../models/productModel")

async function addToCartViewProduct(req, res){

    try{ 
        
        // const  currentUser  = req.userId

        // const  allProduct  = await addToCartModel.find({ userId: userId })
        
        //      res.json(
        //         {      
        //             data:  allProduct,                    
        //             error: false,
        //             success: true
        //         }
        //     )

        const currentUser = req.userId

        const allProduct = await addToCartModel.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            message:"testtiiiiiiiii",
            data : allProduct,
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

module.exports = addToCartViewProduct