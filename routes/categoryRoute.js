const express=require("express")
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware")
const { createCategoryController, updateCategoryController, allCategoryControlller, singleCategoryController, deleteCategoryCOntroller } = require("../controllers/categoryController")
const router=express.Router()

// routes
// create-category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

// update Category

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

// get All Category 
router.get('/get-category',allCategoryControlller)

// get Single category
router.get('/single-category/:slug',singleCategoryController)

// delete Category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryCOntroller)



module.exports=router