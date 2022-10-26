const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  REACT_APP_USERNAME,
  REACT_APP_PASSWORD,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = process.env;

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  if (REACT_APP_PASSWORD === pwd) {
    const accesToken = jwt.sign(
      { admin: REACT_APP_USERNAME },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { admin: REACT_APP_USERNAME },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accesToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
