// Simple test script to check discount data
const mongoose = require('mongoose');
const Discount = require('./server/models/Discount');

async function testDiscounts() {
  try {
    // Connect to MongoDB (you'll need to update the connection string)
    await mongoose.connect('mongodb://localhost:27017/your-database-name');
    
    console.log('Connected to MongoDB');
    
    // Get all discounts
    const allDiscounts = await Discount.find({});
    console.log('Total discounts in database:', allDiscounts.length);
    
    allDiscounts.forEach((discount, index) => {
      console.log(`\nDiscount ${index + 1}:`);
      console.log('- Code:', discount.code);
      console.log('- Status:', discount.status);
      console.log('- Start Date:', discount.startDate, 'Type:', typeof discount.startDate);
      console.log('- End Date:', discount.endDate, 'Type:', typeof discount.endDate);
      console.log('- Description:', discount.description);
    });
    
    // Test the query used in the API
    const now = new Date();
    console.log('\nCurrent time:', now);
    
    const activeDiscounts = await Discount.find({
      status: "active",
      startDate: { $lte: now },
      endDate: { $gte: now }
    });
    
    console.log('Active discounts found:', activeDiscounts.length);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testDiscounts();

