const express = require("express");

const router = express.Router();

const multer = require("multer");

const db = require("../db");


// STORAGE CONFIG
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

const upload = multer({ storage });


// CREATE CAPSULE
router.post(
    "/create",
    upload.single("media"),
    (req, res) => {

        const {
            user_id,
            title,
            message,
            unlock_date,
            visibility
        } = req.body;

        const media = req.file
            ? req.file.filename
            : null;

        const sql = `
            INSERT INTO capsules
            (user_id, title, message, media, unlock_date, visibility)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                user_id,
                title,
                message,
                media,
                unlock_date,
                visibility
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "Capsule Created Successfully"
                });

            }
        );

    }
);

module.exports = router;

router.get("/:user_id", (req, res) => {

    const { user_id } = req.params;

    const sql =
        "SELECT * FROM capsules WHERE user_id = ? ORDER BY created_at DESC";

    db.query(sql, [user_id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});