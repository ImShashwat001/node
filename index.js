const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/Posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(console.log("connected to mongoDB"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, "Hello.jpeg");
    }
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});
