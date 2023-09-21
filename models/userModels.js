const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true
    },
    email:{
        type : String ,
        required:true, 
        unique : true
    },
    password:{
        type:String,  
        required: [true,"password field is required"],  
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})



module.exports=mongoose.model('user',userSchema)
