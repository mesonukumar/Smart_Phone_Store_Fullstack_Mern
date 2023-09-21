const jwt=require('jsonwebtoken')
const User=require('../models/userModels')
// protected Routes token
exports.requireSignIn=async (req,res,next)=>{
    try {
        const decode=jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET 
        )
        req.user=decode;
        next()
    } catch (error) {
        console.log(error);
    }
}

// admin access
exports.isAdmin= async (req, res ,next)=>{
try {
    const user=await User.findById(req.user._id)
    if(user.role !==1){
       return res.status(401).send({
         success:false,
         message:'Unauthorised Access'
       })
    }else{
        return  next();
    }
} catch (error) {
    console.log(error);
    res.status(401).send({
        success : false,
        message:"Error In Admin middleWare",
        error
    })
}
}