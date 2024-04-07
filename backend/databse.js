import mongoose from "mongoose";

export const connectdb=()=>{
    mongoose.connect("mongodb+srv://ashutoshbtech2002:gQGGRwTCLYzM5uHm@cluster0.uskgvu1.mongodb.net/").then(()=>{
        console.log("Db is connected");
    }).catch((err)=>console.log(err))
}
