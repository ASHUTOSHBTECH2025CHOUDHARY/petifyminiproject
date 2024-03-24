import mongoose from "mongoose";
const User_Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Address: {  
    type: String,
    required: true,
  },
  Post: [{
    type: mongoose.Schema.ObjectId,
    ref: "post",
  }],
},{
    timestamps:true
});

const User_model = mongoose.model("user", User_Schema);
export default User_model;
