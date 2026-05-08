const express = require("express");
const cors = require("cors");

const db = require("./db");

const authRoutes = require("./routes/authRoutes");

const capsuleRoutes = require("./routes/capsuleRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/capsules", capsuleRoutes);


app.get("/", (req, res) => {
    res.send("Memory Capsule API Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});