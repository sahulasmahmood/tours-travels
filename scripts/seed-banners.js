import mongoose from "mongoose";
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '..', '.env') });

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

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

const sampleBanners = [
  {
    pageName: "home",
    image: "/kodaikanal-hill-station.png",
    status: "active"
  },
  {
    pageName: "packages",
    image: "/bryant-park-kodaikanal.png",
    status: "active"
  },
  {
    pageName: "tariff",
    image: "/luxury-taxi-service-in-tamil-nadu.png",
    status: "active"
  },
  {
    pageName: "contact",
    image: "/madurai-meenakshi-temple.png",
    status: "active"
  },
  {
    pageName: "about",
    image: "/modern-taxi-fleet-in-tamil-nadu.png",
    status: "active"
  }
];

async function seedBanners() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Delete existing banners
    await Banner.deleteMany({});
    console.log('Cleared existing banners');

    // Insert sample banners
    const banners = await Banner.create(sampleBanners);
    console.log('Sample banners created:', banners);

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding banners:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedBanners();
