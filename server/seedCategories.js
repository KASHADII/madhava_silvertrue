const mongoose = require("mongoose");
const Category = require("./models/Category");
require("dotenv").config();

const initialCategories = [
  {
    name: "Ring",
    description: "Beautiful rings for all occasions",
  },
  {
    name: "Necklace",
    description: "Elegant necklaces to complement any outfit",
  },
  {
    name: "Earrings",
    description: "Stunning earrings for every style",
  },
  {
    name: "Bracelet",
    description: "Charming bracelets for wrist adornment",
  },
  {
    name: "Pendant",
    description: "Exquisite pendants for necklaces",
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing categories
    await Category.deleteMany({});
    console.log("Cleared existing categories");

    // Insert new categories
    const categories = await Category.insertMany(initialCategories);
    console.log("Seeded categories:", categories.map(c => c.name));

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedCategories(); 