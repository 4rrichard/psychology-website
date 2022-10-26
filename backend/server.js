const express = require("express");
// const multipart = require("express-multipart");
const FormData = require("form-data");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");

const bodyParser = require("body-parser");
const refreshTokenController = require("./controller/refreshTokenController");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const multer = require("multer");

// const mp = multipart.multipart({});
const app = express();
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://psychology-website.netlify.app/",
    ],
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

app.post("/api/sendemail", multer().none(), async (req, res) => {
  try {
    const { recaptchaValue, fullName, email, phoneNum, message } = req.body;
    await axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${REACT_APP_SECRET_KEY}&response=${recaptchaValue}`
      )
      .then(({ data }) => {
        console.log(data);

        if (data.success) {
          const form = new FormData();
          console.log(form);

          form.append(REACT_APP_GOOGLE_FORM_NAME_ID, fullName);
          form.append(REACT_APP_GOOGLE_FORM_EMAIL_ID, email);
          form.append(REACT_APP_GOOGLE_FORM_PHONE_NUMBER_ID, phoneNum);
          form.append(REACT_APP_GOOGLE_FORM_MESSAGE_ID, message);
          axios.post(GOOGLE_FORM_ACTION_URL, form);
        }
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

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
