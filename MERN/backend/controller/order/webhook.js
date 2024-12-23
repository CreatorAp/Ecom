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
                image: product.images,
            }

            ProductItems.push(productData)
        }
    }
    return ProductItems
}




async function webhook(request, response){

    try{ 
            const sig = request.headers['stripe-signature']

        const payloadStroing = JSON.stringify(request.body)

        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadStroing,
            secret: endPointSecret
        })

        let event;

        try{
            event = stripe.webhooks.constructEvent(payloadStroing, header, endPointSecret)
        }
        catch{

        }
        
        switch (event.type) {
            case 'checkout.session.completed':
                
              const session = event.data.object;
              
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
                
                const productDetails = await getLineItems(lineItems)

                
                const  orderDetails = {
                    productDetails: productDetails,
                    email: session.customer_email,
                    userId: session.metadata.userId,
                    paymentDetails: {
                        paymentId: session.payment_intent,
                        payment_method_type: session.payment_method_types,
                        payment_status: session.payment_status
                    },
                    shipping_options: session.shipping_options.map(s=> {
                                    return{
                                        ...s,
                                        shipping_amount: s.shipping_amount / 100
                                    }
                    }
                    ),
                    totalAmount: session.amount_total / 100
                }



                const order = new orderModel(orderDetails)
                const saveOrder = await order.save()
                
              break;
            // case 'payment_method.attached':
            //   const paymentMethod = event.data.object;
              
            //   break;
            
            default:
              console.log(`Unhandled event type ${event.type}`);
          }
        



        response.status(200).send()

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

module.exports = webhook