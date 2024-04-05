const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 8000;

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    // Render the homepage view
    return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
    // Handle image upload logic (e.g., save to database, process, etc.)
    // ...

    // Set a flag for successful upload
    const uploadedSuccessfully = true;

    // Render the updated homepage view with success message
    return res.render("homepage", { uploadedSuccessfully });
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
