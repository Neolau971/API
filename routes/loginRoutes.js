import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if(!user) return res.status(400).json({ error: "Utilisateur introuvable" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Mot de passe invalide" });

    const token = jwt.sign(
        { id: user._id, login: user.login },
        process.env.JWT_SECRET || "secretkey",
        { expiresIn: "1h"}
    );

    res.json({ token });
});

export default router;