const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
    const {
        REACT_APP_USERNAME,
        REACT_APP_ACCESS_TOKEN_SECRET,
        REACT_APP_REFRESH_TOKEN_SECRET,
    } = process.env;
    const cookies = req.cookies;
    console.log(cookies);

    if (!cookies.jwt) return res.status(401);

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, REACT_APP_REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || REACT_APP_USERNAME !== decoded.user)
            return res.sendStatus(403);

        const accessToken = jwt.sign(
            {
                user: decoded.user,
            },
            REACT_APP_ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        res.json({ accessToken });
    });
};

module.exports = { handleRefreshToken };
