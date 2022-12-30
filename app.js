require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const connectMongo = require("./config/mongoDB");
const User = require("./models/userModel");
const authRoute = require("./routes/authRoute");
const jsonRoute = require("./routes/jsonRoute");
const expenseRoute = require("./routes/expenseRoute");

connectMongo();
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);
passport.use(User.createStrategy());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//Routes
app.use("/", authRoute);
app.use("/", expenseRoute);
app.use("/", jsonRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
