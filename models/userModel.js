const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const mongoose = require("mongoose");
//create the schema
const userSchema = new mongoose.Schema(
  {
    person_id: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    email: String,
    password: String,
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Export the model
module.exports = new mongoose.model("User", userSchema);
