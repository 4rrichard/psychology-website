const express = require("express");
const mongoose = require("mongoose");
const FormData = require("form-data");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");

const bodyParser = require("body-parser");
const refreshTokenController = require("./controller/refreshTokenController");
const Post = require("./models/BlogPosts");
const connectDB = require("./config/dbConn");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);
app.use(cookieParser());
app.use(express.json());

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

const generateAccessToken = () => {
    return jwt.sign(
        { admin: REACT_APP_USERNAME },
        REACT_APP_ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m",
        }
    );
};
const generateRefreshToken = () => {
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
        REACT_APP_USERNAME === req.body.admin &&
        REACT_APP_PASSWORD === req.body.pwd
    ) {
        const accessToken = generateAccessToken();
        const refreshToken = generateRefreshToken();

        // TODO: Set secure: true and sameSite: 'none' when using HTTPS in production
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
            admin: REACT_APP_USERNAME,
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

        req.admin = data.admin;
        return next();
    } catch (err) {
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
    return res.json({ admin: req.admin });
});

//----MongoDB-----

const regSchema = mongoose.Schema({
    fullDate: {},
    name: String,
    email: String,
    phoneNum: Number,
});

const regData = mongoose.model("regData", regSchema);

app.post("/api/addregdata", async (req, res) => {
    try {
        const addData = new regData({
            fullDate: req.body.fullDate,
            name: req.body.name,
            email: req.body.email,
            phoneNum: req.body.phoneNum,
        });

        console.log(req.body);

        const savedData = await addData.save();
        res.status(200).json(savedData);
    } catch (error) {
        console.error("Error saving registration data:", error);
        res.status(500).json({ message: "Failed to save registration data" });
    }
});

app.get("/api/getregdata", async (req, res) => {
    try {
        const docs = await regData.find({}, { fullDate: 1, name: 1, _id: 0 });
        res.status(200).json(docs);
    } catch (error) {
        console.error("Error fetching registration data:", error);
        res.status(500).json({ message: "Failed to fetch registration data" });
    }
});

app.post("/api/removedata", async (req, res) => {
    try {
        const { year, month, date, hour } = req.body.fullDate;
        console.log(year, month, date, hour);

        const result = await regData.deleteOne({
            "fullDate.year": year,
            "fullDate.month": month,
            "fullDate.date": date,
            "fullDate.hour": hour,
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        console.error("Error removing registration data:", error);
        res.status(500).json({ message: "Failed to remove registration data" });
    }
});

app.post("/api/addpost", async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        console.error("Error saving post:", error);
        res.status(500).json({ message: "Failed to save post" });
    }
});

app.get("/api/getpost", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
});

//-----Articles-----

app.get("/articles/:pageName", (req, res) => {
    try {
        const { pageName } = req.params;

        if (!pageName) {
            return res.status(400).json({ message: "Page name is required" });
        }

        console.log("Requested article:", pageName);
        res.status(200).json({ pageName });
    } catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).json({ message: "Failed to fetch article" });
    }
});

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("Uploaded file:", req.file.filename);
        res.status(200).json({ filename: req.file.filename });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Failed to upload file" });
    }
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server listening on port http://localhost:${port}`);
    });
});
