const stripe = require("../../config/stripe")
const orderModel = require("../../models/orderProductModel")

const userModel = require("../../models/userModel")

const endPointSecret = "whsec_a025a27d47993785f28f4b197832d22735b93cb63eafbd0ccb39a827a9e26e70"

async function getLineItems(lineItems){

    let ProductItems = []

    if(lineItems?.data?.length){
        for(const item of lineItems?.data){
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            const productData = {
                productId : productId,
                name: product.name,
                price: item.price.unit_amount / 100,
                quantity: item.quantity,
                image: product.image,
            }

            ProductItems.push(productData)
        }
    }
    return ProductItems
}

async function orderController(request, response){

    try{ 
        
        const currentUserId = request.userId

        const orderList = await orderModel.find({userId: currentUserId})

         response.json(
            {                    
                data: orderList,
                message: "Order list ",
                error: false,
                success: true
            }
        )
           
     }catch(err){
        response.status(400).json(
            {
                message: err.message || err,
                error: true,
                success: false
            }
        )
     }

}

module.exports = orderController