import mongoose from "mongoose";

export const mongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DATABASE_URL, {
            dbName: 'rojoiner'
        });
        console.log("Database connected sucessfully");
    } catch (err) {
        console.error(err);
    }
}