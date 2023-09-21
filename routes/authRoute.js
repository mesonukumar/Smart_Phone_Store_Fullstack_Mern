const express=require('express')
const { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsersController } = require('../controllers/authController')
const {requireSignIn, isAdmin } = require('../middlewares/authMiddleware')

// router object
const router=express.Router()

// Register||POST
router.post('/register',registerController)

// login
router.post('/login',loginController)
// Forgot Password
router.post('/forgot-password',forgotPasswordController)
// test routes
router.get('/test',requireSignIn,isAdmin,testController)

// Protected User route Auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
// Protected Admin route Auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

// update profile
router.put('/profile',requireSignIn,updateProfileController)

// orders
router.get('/orders',requireSignIn,getOrdersController)

// all orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

// status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)



// get all users
router.get('/all-users', requireSignIn, isAdmin,getAllUsersController)
module.exports=router

