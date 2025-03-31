import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/userdb')
        console.log('>>> DB connected')
    } catch (err) {
        console.log(err)
    }
};