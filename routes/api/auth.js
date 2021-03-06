const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
require("dotenv").config();

// @route       GET api/auth
// @description Get user
// @access      Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -access");
        res.json(user);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route       POST api/auth
// @description Authenticate user and get token
// @access      Public
router.post(
    "/",
    [
        check("username", "Email is required or format is incorrect").isEmail(),
        check("password", "Password is required").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        try {
            let user = await User.findOne({ email: username });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
            }
            let updateLastLogin = await User.findOneAndUpdate({ email: username }, { lastlogindate: Date.now() });
            if (!updateLastLogin) {
                return res.status(400).json({ errors: [{ msg: "Server login update error" }] });
            }

            const payload = {
                user: {
                    id: user.id,
                    access: user.access
                }
            };
            jwt.sign(
                payload,
                process.env.jwtSecret,
                { expiresIn: 7200 }, // 1 hour
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
