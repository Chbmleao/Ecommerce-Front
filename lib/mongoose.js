import mongoose from "mongoose";

export async function mongooseConnect() {
  console.log("Connecting to MongoDB...");
  const uri = process.env.MONGODB_URI;
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB connected!");
    return mongoose.connection.asPromise();
  } else {
    console.log("Error connecting to MongoDB");
    return mongoose.connect(uri);
  }
}
