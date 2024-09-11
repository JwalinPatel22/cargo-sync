// middleware/authenticate.js
import jwt from "jsonwebtoken";
import User from "../models/base_user_model.js"; // Base User model

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.jwt; // Extract token from cookies

  if (!token) {
    return res
      .status(401)
      .json({ status: "Error", error: "Access denied. No token provided." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token

    // Find user in the database using the base User model
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(403).json({ status: "Error", error: "User not found" });
    }

    // Attach user object to request
    req.user = user;
    req.userRole = user.role; // Attach user role for role-based access control

    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ status: "Error", error: "Invalid token" });
  }
};

export default authenticateToken;
