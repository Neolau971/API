import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // format: "Bearer TOKEN"

  if (!token) return res.status(401).json({ error: "Accès refusé" });

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide" });
    req.user = user; // stocke les infos du token
    next();
  });
}
