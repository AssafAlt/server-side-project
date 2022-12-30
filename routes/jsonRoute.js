const router = require("express").Router();
const Expense = require("../models/expenseModel");

router.get("/report/:selectedYear/:selectedMonth", function (req, res) {
  const requestedYear = req.params.selectedYear;
  const requestedMonth = req.params.selectedMonth;
  Expense.aggregate(
    [
      {
        $match: {
          date: {
            $gte: new Date(requestedYear, requestedMonth - 1, 1),
            $lt: new Date(requestedYear, requestedMonth, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            user: "$userId",
          },

          total: {
            $sum: "$price",
          },
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/report/:selectedYear", function (req, res) {
  const requestedYear = req.params.selectedYear;

  Expense.aggregate(
    [
      {
        $match: {
          date: {
            $gte: new Date(requestedYear, 0, 1),
            $lt: new Date(requestedYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },

            user: "$userId",
          },
          total: {
            $sum: "$price",
          },
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/about", (req, res) => {
  res.json({
    developer1: {
      first_name: "Assaf",
      last_name: "Alt",
      id: "207901075",
      email: "asafalt61@gmail.com",
    },
    developer2: {
      first_name: "Daniel Nathan",
      last_name: "Noach",
      id: "319130480",
      email: "danielnoach1412@gmail.com",
    },
  });
});
module.exports = router;
