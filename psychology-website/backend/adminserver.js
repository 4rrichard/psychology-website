const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const bodyParser = require("body-parser");
const authController = require("./controller/AuthController");
const refreshTokenController = require("./controller/refreshTokenController");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 8081;
const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

const {
  REACT_APP_USERNAME,
  REACT_APP_PASSWORD,
  REACT_APP_ACCESS_TOKEN_SECRET,
  REACT_APP_REFRESH_TOKEN_SECRET,
} = process.env;

// app.use("/auth", require("./routes/auth"));

// app.use(verifyJWT);

// let refreshTokens = [];

// app.post("/refresh", (req, res) => {
//   const refreshToken = req.body.token;

//   if (!refreshToken) return res.status(401).json("You are not authenticated!");
//   if (!refreshTokens.includes(refreshToken)) {
//     return res.status(403).json("Refresh token is not valid");
//   }

//   jwt.verify(refreshToken, REACT_APP_REFRESH_TOKEN_SECRET, (err) => {
//     err && console.log(err);
//     refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

//     const newAccessToken = generateAccessToken();
//     const newRefreshToken = generateRefreshToken();

//     refreshTokens.push(newRefreshToken);

//     res.status(200).json({
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     });
//   });
// });

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

    // refreshTokens.push(refreshToken);

    res.json({
      user: REACT_APP_USERNAME,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json("Username or password incorrect!");
  }
});

// const verify = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, REACT_APP_ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(403).json("Token is not valid!");
//       }
//       req.user = decoded.user;
//       next();
//     });
//   } else {
//     res.status(401).json("You are not authenticated");
//   }
// };

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
