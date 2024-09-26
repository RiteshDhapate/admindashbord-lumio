import mongoose from "mongoose";

// Define the schema
const DataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    rotatingTexts: {
      type: [String], // Array of strings
    },
  },
  {
    timestamps: true
  }
);

// Create the model from the schema
const DataModel = mongoose.model("landing-page", DataSchema);

export default DataModel;
