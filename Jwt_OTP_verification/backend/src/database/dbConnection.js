import mongoose from "mongoose";

export const dbconnection = async () => {
  try {
    let dbconnect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`db successful connect on ${dbconnect.connection.host}`);
  } catch (error) {
    console.log("Something went wrong while making conecitn on db", error);
    process.exit(1);
  }
};
