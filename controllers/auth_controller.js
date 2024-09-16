import jwt from "jsonwebtoken";
import User from "../models/base_user_model.js"; // Base user model
import { Driver } from "../models/driver_model.js";
import { Individual } from "../models/individual_model.js";
import { Organization } from "../models/organization_model.js";
import { Agency } from "../models/agency_model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const createToken = (id) => {
  return jwt.sign(
    { id: User._id, role: User.role, fullname: User.fullname },
    process.env.JWT_SECRET_KEY
  );
};

//register user
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role, address, ...otherDetails } =
      req.body;

    // Input validations
    if (!fullname) {
      return res
        .status(401)
        .json({ status: "Error", error: "Full Name is required." });
    }
    if (!email) {
      return res.status(401).json({
        status: "Error",
        error: "Email is required. Please enter email.",
      });
    }
    if (!password) {
      return res.status(401).json({
        status: "Error",
        error: "Password is required. Please provide a password.",
      });
    }
    if (
      !role ||
      !["Organization", "Agency", "Individual", "Dealer"].includes(role)
    ) {
      return res.status(401).json({
        status: "Error",
        error:
          "Invalid role provided. Must be one of Driver, Organization, Individual, or Dealer.",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        status: "Error",
        error: "This email already exists. Try logging in with this email.",
      });
    }

    // Hash the password
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user based on role
    let user;
    switch (role) {
      case "Individual":
        // Create a User
        user = await Individual.create({
          fullname,
          email,
          password: hashedPassword,
          role,
          address,
          ...otherDetails,
        });
        break;
      case "Organization":
        // Create a Organization
        user = await Organization.create({
          fullname,
          email,
          password: hashedPassword,
          role,
          address,
          ...otherDetails,
        });
        break;
      case "Driver":
        // Create an Driver
        user = await Driver.create({
          fullname,
          email,
          password: hashedPassword,
          role,
          address,
          ...otherDetails,
        });
        break;
      case "Agency":
        // Create an Dealer
        user = await Agency.create({
          fullname,
          email,
          password: hashedPassword,
          role,
          address,
          ...otherDetails,
        });
        break;
      default:
        return res.status(400).json({ status: "Error", error: "Invalid role" });
    }

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({
      user: {
        fullname: user.fullname,
        email: user.email,
        id: user._id,
        role: user.role,
      },
      token,
      created: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
      created: false,
      message: "Error in Registration",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email regardless of role
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found", status: false });
    }

    // Compare the plain password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Invalid credentials", status: false });
    }

    // Generate a token
    const token = createToken(user._id);

    // Set the JWT in a cookie
    res.cookie("jwt", token, { httpOnly: false });

    // Respond with user information
    res.status(200).json({
      user: {
        fullname: user.fullname,
        email: user.email,
        id: user._id,
        role: user.role,
      },
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Invalid credentials", status: false });
  }
};
