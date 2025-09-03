import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
bannerSchema.index({ pageName: 1, status: 1 });

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;
