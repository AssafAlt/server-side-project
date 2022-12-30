const router = require("express").Router();
const User = require("../models/userModel");
const passport = require("passport");

router.get("/", function (req, res) {
  res.render("home");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", function (req, res) {
  res.render("login");
});

//logout
router.get("/logout", function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//register new user
router.post("/register", function (req, res) {
  const { person_id, firstName, lastName, birthDate, username, password } =
    req.body;

  User.register(
    { username, person_id, firstName, lastName, birthDate },
    password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/expenses");
        });
      }
    }
  );
});

//user login
router.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/expenses");
      });
    }
  });
});

module.exports = router;
