const express = require("express");
const multipart = require("express-multipart");
const FormData = require("form-data");
require("dotenv").config();
const axios = require("axios");

const mp = multipart.multipart({});
const app = express();
const port = process.env.PORT || 8080;

const {
  REACT_APP_GOOGLE_FORM_KEY,
  REACT_APP_GOOGLE_FORM_NAME_ID,
  REACT_APP_GOOGLE_FORM_EMAIL_ID,
  REACT_APP_GOOGLE_FORM_PHONE_NUMBER_ID,
  REACT_APP_GOOGLE_FORM_MESSAGE_ID,
} = process.env;
const GOOGLE_FORM_ACTION_URL = `https://docs.google.com/forms/u/0/d/${REACT_APP_GOOGLE_FORM_KEY}/formResponse`;

//middlware beregisztrált, formos üzenetet elérhetővé teszi a formon
app.use(mp.text());

app.post("/api/sendemail", (req, res) => {
  const form = new FormData();
  form.append(REACT_APP_GOOGLE_FORM_NAME_ID, req.body.fullName);
  form.append(REACT_APP_GOOGLE_FORM_EMAIL_ID, req.body.email);
  form.append(REACT_APP_GOOGLE_FORM_PHONE_NUMBER_ID, req.body.phoneNum);
  form.append(REACT_APP_GOOGLE_FORM_MESSAGE_ID, req.body.message);
  axios.post(GOOGLE_FORM_ACTION_URL, form);
  res.send("okay");
});

app.listen(port, (par) => {
  console.log(par);
});
console.log("Server started at http://localhost:" + port);
