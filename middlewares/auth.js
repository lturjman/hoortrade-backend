require("dotenv").config({ path: ".env.development" });

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ msg: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(400).json({ msg: "Token manquant ou invalide" });
  }

  req.user = decoded;
  next();
}

module.exports = authMiddleware;
