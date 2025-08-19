import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPass = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPass });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
