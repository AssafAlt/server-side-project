const mongoose = require("mongoose");

const yearlyReportSchema = new mongoose.Schema({
  year: String,
  total_amount: Number,
  optional_categories: [String],
  expenses_by_category: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  ],
});
