import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user already exists
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(409).json({ message: "User already registered." }); // Use return to stop further execution
    }

    // Create a new user if not already registered
    const newUser = await User.create(req.body);
    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    // Handle errors
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const encodingData = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "talal",
      { expiresIn: "3h" }
    );

    res.cookie("access_token", encodingData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000 * 3,
    });

    return res.status(200).json({ token: encodingData });
  }

  return res
    .status(401)
    .json({ message: "Email or password may be incorrect." });
};

export const verifyUser = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token found" });
  }

  try {
    const decoded = jwt.verify(token, "talal"); // Verify the token with your secret key
    return res.status(200).json({ message: "Token is valid", user: decoded });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: error.message });
  }
};
