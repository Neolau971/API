import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { login, password } = req.body;

        const hashePassword = await bcrypt.hash(password, 10);

        const newUser = new User({ login, password: hashePassword });
        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé"});
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

export default router;