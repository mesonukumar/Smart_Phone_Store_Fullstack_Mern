const mongoose=require('mongoose')

const connectdb=async ()=>{
    try {
        const conn= await mongoose.connect('mongodb://127.0.0.1:27017/myapp')
        console.log(`Connected to database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in mongoDb ${error}`);
    }
}
 
module.exports=connectdb