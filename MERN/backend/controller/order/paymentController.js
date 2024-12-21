const stripe = require("../../config/stripe")
const addToCartModel = require("../../models/cardProduct")
const productModel = require("../../models/productModel")
const userModel = require("../../models/userModel")

async function paymentController(request, response){

    try{ 
        const { cartItems } = request?.body
        
        console.log("Cart items", cartItems)

        const  user  = await userModel.findOne({_id: request.userId}) 

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                    {
                        shipping_rate: "shr_1QH8fZGPz1fFpNDaQhb59aTp"
                    }
            ]
            ,
            customer_email: user?.email,
            metadata: {
                userId : request.userId
            },
            line_items: cartItems.map((item , index)=>{
                return{
                    price_data: {
                        currency: "usd",
                            product_data:{
                                    name: item.productId.productName,
                                    images: item.productId.productImage,
                                    metadata: {
                                        productId: item._id
                                    }
                            },
                            unit_amount: item.productId.sellingPrice * 100
                    },
                    adjustable_quantity: {
                        enabled : true,
                        minimum: 1
                    },
                    quantity: item.quantity    
                }
            }
        ),
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        }

        const session = await stripe.checkout.sessions.create(params) 

        response.status(303).json(session)

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

module.exports = paymentController