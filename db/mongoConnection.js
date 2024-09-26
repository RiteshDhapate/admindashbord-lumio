import mongoose from "mongoose";

export const DBInit = async () => {
  try {
    const mongoDbUrl = process.env.MONG_URL;
    if (!mongoDbUrl) {
      console.log("mongodb url not specified");
      process.exit(1);
    }
      const connection = await mongoose.connect(mongoDbUrl);
      console.log("db connection established");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
