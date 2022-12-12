const express = require("express");
const mongoose = require("mongoose");
// const multipart = require("express-multipart");
const FormData = require("form-data");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");

const bodyParser = require("body-parser");
const refreshTokenController = require("./controller/refreshTokenController");
const connectDB = require("./config/dbConn");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const multer = require("multer");
// const { response } = require("express");

// const mp = multipart.multipart({});
const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
// app.use(mp.text());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

const {
  REACT_APP_GOOGLE_FORM_KEY,
  REACT_APP_GOOGLE_FORM_NAME_ID,
  REACT_APP_GOOGLE_FORM_EMAIL_ID,
  REACT_APP_GOOGLE_FORM_PHONE_NUMBER_ID,
  REACT_APP_GOOGLE_FORM_MESSAGE_ID,
  REACT_APP_USERNAME,
  REACT_APP_PASSWORD,
  REACT_APP_ACCESS_TOKEN_SECRET,
  REACT_APP_REFRESH_TOKEN_SECRET,
  REACT_APP_SECRET_KEY,
} = process.env;

const GOOGLE_FORM_ACTION_URL = `https://docs.google.com/forms/u/0/d/${REACT_APP_GOOGLE_FORM_KEY}/formResponse`;

app.post("/api/sendemail", multer().none(), (req, res) => {
  try {
    const { captcha, fullName, email, phoneNum, message } = req.body;
    const form = new FormData();

    form.append(REACT_APP_GOOGLE_FORM_NAME_ID, fullName);
    form.append(REACT_APP_GOOGLE_FORM_EMAIL_ID, email);
    form.append(REACT_APP_GOOGLE_FORM_PHONE_NUMBER_ID, phoneNum);
    form.append(REACT_APP_GOOGLE_FORM_MESSAGE_ID, message);

    axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${REACT_APP_SECRET_KEY}&response=${captcha}`
      )
      .then(({ data }) => {
        console.log(data);

        if (data.success) {
          axios.post(GOOGLE_FORM_ACTION_URL, form);
          res.send("okay");
        } else {
          return res
            .status(400)
            .json({ message: "Recaptcha verification failed" });
        }
      })
      .catch((error) => {
        res.status(400).json({ message: "Invalid Recapatcha" });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.post("/refresh", refreshTokenController.handleRefreshToken);

const generateAccessToken = (user) => {
  return jwt.sign(
    { admin: REACT_APP_USERNAME },
    REACT_APP_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { admin: REACT_APP_USERNAME },
    REACT_APP_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

app.post("/auth", (req, res, next) => {
  if (
    REACT_APP_USERNAME === req.body.user &&
    REACT_APP_PASSWORD === req.body.pwd
  ) {
    const accessToken = generateAccessToken();
    const refreshToken = generateRefreshToken();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      //secure: true --- https weboldalaknál használatos
    });

    res.json({
      user: REACT_APP_USERNAME,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json("Username or password incorrect!");
  }
});

const verify = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, REACT_APP_REFRESH_TOKEN_SECRET);
    req.user = data.admin;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

app.get("/logout", verify, (req, res) => {
  return res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "Successfully logged out!" });
});

app.get("/protected", verify, (req, res) => {
  return res.json({ admin: req.user });
});

const regSchema = mongoose.Schema({
  fullDate: {},
  name: String,
  email: String,
  phoneNum: Number,
});

const regData = mongoose.model("regData", regSchema);

app.post("/api/addregdata", (req, res) => {
  const addData = new regData({
    fullDate: req.body.fullDate,
    name: req.body.name,
    email: req.body.email,
    phoneNum: req.body.phoneNum,
  });

  console.log(req.body);

  addData.save((err, doc) => {
    if (err) return console.log(err);
    res.status(200).json(doc);
  });
});

app.get("/api/getregdata", (req, res) => {
  regData.find({}, { fullDate: 1, name: 1, _id: 0 }, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc);
  });
});

app.post("/api/removedata", (req, res) => {
  const wholeDate = req.body.fullDate;
  const year = wholeDate.year;
  const month = wholeDate.month;
  const day = wholeDate.date;
  const hour = wholeDate.hour;
  // console.log(date);
  console.log(year, month, day, hour);
  regData.deleteOne(
    {
      "fullDate.year": year,
      "fullDate.month": month,
      "fullDate.date": day,
      "fullDate.hour": hour,
    },
    (err, doc) => {
      if (err) return console.log(err);
      res.json(doc);
    }
  );
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
});
