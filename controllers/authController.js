const { hashPassword, comparePassword } = require('../helpers/authHelper');
const User = require('../models/userModels');
const Order=require('../models/orderModel')
const jwt= require('jsonwebtoken')

exports.registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body;

        if (!name || !email || !password || !phone || !address ||!answer) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Error in Registration: Email already exists'
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const user = await new User({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({
            success: true,
            message: `User ${user.name} created successfully`,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in registration",
            error: error
        });
    }
};


// LOGIN ||POST

exports.loginController=async (req,res)=>{
    try {
        const {email,password}=req.body
        // validation
        if(!email || !password){
            return  res.status(400).json("Invalid Email or Password")
        }
        
        const user= await User.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email not not registered"
            })
        }
        const match= await comparePassword(password,user.password)
        if(!match){
            return   res.status(403).send('Invalid Password')
        }

        // token
        const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.status(200).send({
            success:true,
            message:'login Successfully',
            user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })

    }
}
// Forgot Password
//forgotPasswordController

exports.forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      } 
      //check
      const user = await User.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await User.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
// test controller

exports.testController=(req,res)=>{
   res.send("protected Route")
}

//update profile
exports.updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await User.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};


//orders user
exports.getOrdersController = async (req, res) => {
  try {
    const orders = await Order
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//orders Admin
exports.getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
exports.orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
};

// Get all user
 exports.getAllUsersController = async (req, res) => {
  try {
    
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error while fetching users.', error });
  }
};