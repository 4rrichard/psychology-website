const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
    REACT_APP_USERNAME,
    REACT_APP_PASSWORD,
    REACT_APP_ACCESS_TOKEN_SECRET,
    REACT_APP_REFRESH_TOKEN_SECRET,
} = process.env;

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res
            .status(400)
            .json({ message: "Username and password are required!" });
    }

    if (REACT_APP_USERNAME === user && REACT_APP_PASSWORD === pwd) {
        const accessToken = jwt.sign(
            { admin: REACT_APP_USERNAME },
            REACT_APP_ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { admin: REACT_APP_USERNAME },
            REACT_APP_REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ user: REACT_APP_USERNAME, accessToken });
    } else {
        res.status(401).json({ message: "Username or password incorrect!" });
    }
};

module.exports = { handleLogin };
