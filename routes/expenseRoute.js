const router = require("express").Router();
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");
const passport = require("passport");

//expenses route
router.get("/expenses", (req, res) => {
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        Expense.find({ userId: req.user.id })
          .populate("userId")
          .sort({ date: -1 })
          .exec((err, foundExpenses) => {
            if (err) {
              console.log(err);
            }
            res.render("expenses", { expenses: foundExpenses });
          });
      }
    }
  });
});

//addcost route
router.get("/addcost", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("addcost");
  } else {
    res.redirect("/login");
  }
});

//add expense
router.post("/addcost", function (req, res) {
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      res.json(err);
    }
    if (foundUser) {
      const { description, date, category, price } = req.body;
      const expense = new Expense({
        description,
        date,
        category,
        price,
        userId: foundUser._id,
      });
      expense.save((err) => {
        console.log(err);
        res.redirect("/expenses");
      });
    }
  });
});

module.exports = router;
