import mongoose from "mongoose";
const mongoURI = process.env.DATABASE_URL;

export async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI, {
      authSource: "admin",
      ssl: true,
    });
    console.log("DB Connection Success");
  } catch (error) {
    throw new Error("Connection failed!");
  }
}
