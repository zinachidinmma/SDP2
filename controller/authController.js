const { AdminUser, StudentUser } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const asyncHandler = require("express-async-handler");
const createToken = require("../middleware/createJwtToken");

//user
const register = asyncHandler(async (req, res) => {
  try {
    const {
      email,
      password,
      user_id,
      first_name,
      last_name,
      room_number,
      dorm,
      isAdmin,
    } = req.body;

    // Check if any required fields are missing
    if (!email || !password || !user_id || !first_name || !last_name) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    // Validate email format
    if (!validator.isEmail(email) || !email.endsWith("@aun.edu.ng")) {
      res.status(400);
      throw new Error("Please enter a valid aun email!");
    }

    // Check if email already exists based on isAdmin value
    let exists;
    if (isAdmin) {
      exists = await AdminUser.findOne({ email });
    } else {
      exists = await StudentUser.findOne({ email });
    }
    if (exists) {
      res.status(400);
      throw new Error("Email already exists");
    }

    // Check if student ID starts with "A" if isAdmin is false
    if (!isAdmin && !user_id.startsWith("A")) {
      res.status(400);
      throw new Error("Student ID must start with 'A'!");
    }

    // Check if user ID is unique
    const idExists = await (isAdmin ? AdminUser : StudentUser).findOne({
      user_id,
    });
    if (idExists) {
      res.status(400);
      throw new Error("User ID already exists");
    }

    const allowedDorm = ["AA", "BB", "CC"];
    if (!allowedDorm.includes(dorm.toUpperCase())) {
      res.status(400);
      throw new Error("Invalid Dorm! Allowed categories are: AA, BB, CC");
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user based on isAdmin value
    let user;
    if (isAdmin) {
      user = await AdminUser.create({
        email,
        password: hashedPassword,
        user_id,
        first_name,
        last_name,
      });
    } else {
      if (!room_number || !dorm) {
        res.status(400);
        throw new Error("All fields are mandatory for student registration!");
      }
      user = await StudentUser.create({
        email,
        password: hashedPassword,
        user_id,
        first_name,
        last_name,
        room_number,
        dorm: dorm.toUpperCase(),
      });
    }

    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// User login
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    // Check if user exists in the student database
    let user = await StudentUser.findOne({ email });

    // If user not found in student database, check admin database
    if (!user) {
      user = await AdminUser.findOne({ email });
    }

    // If user still not found, return error
    if (!user) {
      res.status(400);
      throw new Error("Email not found!");
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid credentials!");
    }

    // Generate JWT token
    const token = createToken(user);

    if (!token) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    // Send email and token in response
    res.status(200).json({
      email,
      token,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = {
  login,
  register,
};
