const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category_name: String,
  total_amount: Number,
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
});

module.exports = new mongoose.model("Category", categorySchema);
