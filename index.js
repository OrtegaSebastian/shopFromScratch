const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.routes')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/products.routes')



dotenv.config();



mongoose.
connect(
process.env.MONGO_URL
)
.then(()=>console.log("Db Connection Successfull"))
.catch((err)=>{
    console.log(err);
})


app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/products',productRoute);

app.listen(process.env.PORT || 5000,()=>{
    console.log('backend server is running');
});