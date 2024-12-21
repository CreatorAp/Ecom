const addToCartModel = require("../models/cardProduct")
const productModel = require("../models/productModel")

async function addToCart(req, res){

    try{ 
        const { productId } = req?.body
        const  currentUser  = req.userId

        const  isProductAvailable  = await addToCartModel.findOne({productId, userId: currentUser})

        if(isProductAvailable){
            return res.json(
                {                    
                    message: "Already exists in cart ",   
                    error: true,
                    success: false
                }
            )
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }

        const newAddToCart  = new addToCartModel(payload)
        const  saveProduct  = await newAddToCart.save()

        return res.json(
            {                    
                data: saveProduct,
                message: "Product added in cart ",
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

module.exports = addToCart