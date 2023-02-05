const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
  username: { type: String, required: true, unique:true },
  password:{ type: String, required: true },
  name: { type: String, required: true },    
  lastName: { type: String, required: true },
  age:{ type: Number, required: true },
  uploaded_file:{ type: String, required: true },
  email: { type: String, required: true },
  isAdmin:{
      type:Boolean, default:false
  }
},
{timestamps: true}
)

module.exports = mongoose.model("User", UserSchema);
