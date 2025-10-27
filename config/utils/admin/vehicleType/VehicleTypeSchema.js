import mongoose from "mongoose";

const vehicleTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

const VehicleType =
  mongoose.models.VehicleType ||
  mongoose.model("VehicleType", vehicleTypeSchema, "vehicletypes");

export default VehicleType;
