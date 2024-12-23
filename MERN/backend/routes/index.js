const express = require('express')

const router = express.Router()

const userSignUpController = require('../controller/userSignUp')
const userSignInController = require('../controller/userSignIn')
const userDetailsController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const allUsers = require('../controller/allUsers')
const updateUser = require('../controller/updateUser')
const uploadProduct = require('../controller/uploadProduct')
const getProduct = require('../controller/getProduct')
const updateProduct = require('../controller/updateProduct')
const getCategoryProduct = require('../controller/getCategoryProduct')
const getCategoryWiseProduct = require('../controller/getCategoryWiseProduct')
const getProductDetails = require('../controller/getProductDetails')
const addToCart = require('../controller/addToCart')
const countAddToCartProduct = require('../controller/countAddToCartProduct')
const addToCartViewProduct = require('../controller/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/deleteAddToCartProduct')
const SearchProduct = require('../controller/searchProduct')
const filterProduct = require('../controller/filterProduct')
const paymentController = require('../controller/order/paymentController')
const webhook = require('../controller/order/webhook')
const orderController = require('../controller/order/orderController')


router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/logout",  userLogout) 
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)
router.post("/upload-product", authToken, uploadProduct)
router.get("/get-product",  getProduct ) 
router.post("/update-product", authToken, updateProduct)
router.get("/get-categoryProduct",  getCategoryProduct ) 
router.post("/category-product",  getCategoryWiseProduct ) 
router.post("/product-details",  getProductDetails ) 
router.post("/addtocart", authToken,  addToCart ) 
router.get("/countAddToCartProduct", authToken,  countAddToCartProduct ) 
router.get("/view-cart-product", authToken,  addToCartViewProduct ) 
router.post("/update-cart-product", authToken,  updateAddToCartProduct ) 
router.post("/delete-cart-product", authToken,  deleteAddToCartProduct ) 
router.get("/search",  SearchProduct ) 
router.post("/filter-product",  filterProduct ) 
router.post("/checkout", authToken,  paymentController ) 
router.post("/webhook",  webhook ) 
router.get("/order-list", authToken,  orderController ) 


module.exports = router