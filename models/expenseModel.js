const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  description: String,
  date: Date,
  category: String,
  price: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
});

// Export the model
module.exports = new mongoose.model("Expense", expenseSchema);
