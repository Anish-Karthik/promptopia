import mongoose from "mongoose";

console.log(process.env.MONGODB_URI)
let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }
  
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log('=> using new database connection');
  }
  catch (err) {
    console.log(err);
  }
}