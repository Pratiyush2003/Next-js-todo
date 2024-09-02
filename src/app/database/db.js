import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(`mongodb+srv://
            ${process.env.Username}:${process.env.Password}@cluster0.q0jpx.mongodb.net/crudcomplete`)
        if(connection){
            console.log("connected database")
        }
    } catch (error) {
        console.log("not connected" + error)
    }
}