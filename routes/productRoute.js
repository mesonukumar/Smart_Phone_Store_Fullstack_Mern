const express=require('express')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, realtedProductController, productCategoryController,braintreeTokenController, brainTreePaymentController } = require('../controllers/productController')
const formidable=require('express-formidable')
const router=express.Router()

// routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//get products
router.get("/get-product", getProductController);

// get Single product
router.get("/get-product/:slug",getSingleProductController);

// get photo
router.get("/product-photo/:pid",productPhotoController);
// delete product
router.delete("/delete-product/:pid",deleteProductController);

// update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

// Filter Product
router.post("/product-filters/", productFiltersController );

// product count
router.get( "/product-count" , productCountController)

// product per page
router.get('/product-list/:page',productListController)

// serch product
router.get('/search/:keyword',searchProductController)

// Similar product
router.get('/related-product/:pid/:cid',realtedProductController)

// category wise product
router.get('/product-category/:slug',productCategoryController)

// payment Routes
// token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

module.exports=router