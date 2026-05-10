const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const capsuleRoutes = require("./routes/capsuleRoutes");

const app = express();


// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/capsules", capsuleRoutes);


// TEST
app.get("/", (req, res) => {
    res.send("Backend Working");
});


// SERVER
app.listen(8000, () => {
    console.log("Server running on port 8000");
});