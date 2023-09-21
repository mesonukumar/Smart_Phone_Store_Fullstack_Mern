const express=require('express')
const dotenv=require('dotenv')
const morgan=require('morgan');
const connectdb = require('./config/db');
const authRoute=require('./routes/authRoute')
const categoryRoute=require('./routes/categoryRoute')
const productRoute=require('./routes/productRoute')
const cors=require('cors')
const app=express()

// configuredotenv
dotenv.config();
// databasrconnect  
connectdb()
// rest object 


// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes 
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)
 
  
// Port 
const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})