// const backendDomain = "http://localhost:8080"

// const backendDomain = process.env.BACKEND_URL     
const backendDomain = "https://ecom-two-mu.vercel.app"

const SummaryApi = {
    signUP : {
        url: `${backendDomain}/api/signup`, 
        method : "post"
    },
    signIn : {
        url: `${backendDomain}/api/signin`, 
        method : "post"
    },
    current_user : {
        url: `${backendDomain}/api/user-details`, 
        method : "get"
    },
    logout_user : {
        url: `${backendDomain}/api/logout`, 
        method : "get"
    },
    all_user : {
        url: `${backendDomain}/api/all-user`, 
        method : "get"
    },
    updateUser : {
        url: `${backendDomain}/api/update-user`, 
        method : "post"
    },
    allProduct : {
        url: `${backendDomain}/api/get-product`, 
        method : "get"
    },
    uploadProduct : {
        url: `${backendDomain}/api/upload-product`, 
        method : "post"
    },    
    updateProduct : {
        url: `${backendDomain}/api/update-product`, 
        method : "post"
    },    
    categoryProduct : {
        url: `${backendDomain}/api/get-categoryProduct`, 
        method : "get"
    },
    categoryWiseProduct : {
        url: `${backendDomain}/api/category-product`, 
        method : "post"
    },
    productDetails : {
        url: `${backendDomain}/api/product-details`, 
        method : "post"        
    },
    addToCart : {
        url: `${backendDomain}/api/addtocart`, 
        method : "post"        
    },
    addToCartProductCount : {
        url: `${backendDomain}/api/countAddToCartProduct`, 
        method : "get"        
    },
    addToCartProductView : {
        url: `${backendDomain}/api/view-cart-product`, 
        method : "get"        
    },
    updateCartProduct : {
        url: `${backendDomain}/api/update-cart-product`, 
        method : "post"        
    },
    deleteCartProduct : {
        url: `${backendDomain}/api/delete-cart-product`, 
        method : "post"        
    },
    searchProduct : {
        url: `${backendDomain}/api/search`, 
        method : "get"        
    },
    filterProduct : {
        url: `${backendDomain}/api/filter-product`, 
        method : "post"        
    },      
    payment : {
        url: `${backendDomain}/api/checkout`, 
        method : "post"        
    },      
    getOrder : {
        url: `${backendDomain}/api/order-list`, 
        method : "get"        
    }      
    
    
    
    
    
}


export default SummaryApi 