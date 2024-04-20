const { AdminUser, StudentUser } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const asyncHandler = require("express-async-handler");
const createToken = require("../middleware/createJwtToken");
const { dorms, room_types, room_numbers } = require("../constant");

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
      room_type,
    } = req.body;

    // Check if any required fields are missing
    if (
      !email ||
      !password ||
      !user_id ||
      !first_name ||
      !last_name ||
      isAdmin == undefined
    ) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    // Validate email format
    if (!validator.isEmail(email) || !email.endsWith("@aun.edu.ng")) {
      res.status(400);
      throw new Error("Please enter a valid aun email!");
    }

    if (!isAdmin && (!user_id.startsWith("A") || user_id.length !== 9)) {
      res.status(400);
      throw new Error("Please enter a valid student ID ex: A000*****");
    }

    const emailExist = await (isAdmin ? AdminUser : StudentUser).findOne({
      email,
    });
    const idExists = await (isAdmin ? AdminUser : StudentUser).findOne({
      user_id,
    });

    // Check if user ID is unique
    if (idExists) {
      res.status(400);
      throw new Error("User ID already in use");
    }
    if (emailExist) {
      res.status(400);
      throw new Error("User email already in use");
    }

    if (!isAdmin && (!dorm || !room_number || !room_type)) {
      res.status(400);
      throw new Error("Student must enter a dorm and room number");
    }

    const allowedDorm = dorms;
    const allowedRoomType = room_types;
    const alllowedRoomNumber = room_numbers;
    if (
      !isAdmin &&
      (!allowedDorm.includes(dorm.toUpperCase()) ||
        !allowedRoomType.includes(room_type) ||
        !alllowedRoomNumber.includes(room_number))
    ) {
      res.status(400);
      throw new Error("Invalid input ");
    }

    // Check if the combination of room type and room number is valid
    const isValidCombination =
      (["3in1WF", "3in1F"].includes(room_type) &&
        room_number >= "101" &&
        room_number <= "105") ||
      (["2in1WF", "2in1F"].includes(room_type) &&
        room_number >= 106 &&
        room_number <= 107);

    if (!isValidCombination) {
      res.status(400);
      throw new Error(
        `Invalid combination of room type '${room_type}' and room number '${room_number}'`
      );
    }

    let maxOccupants;
    if (room_number >= 101 && room_number <= 105) {
      maxOccupants = 3;
    } else if (room_number >= 106 && room_number <= 107) {
      maxOccupants = 2;
    } else {
      maxOccupants = room_type.startsWith("3") ? 3 : 2;
    }

    // Check current occupancy of the room
    const currentOccupancy = await StudentUser.countDocuments({
      room_number,
      dorm: dorm.toUpperCase(),
    });

    // Check if current occupancy exceeds the maximum
    if (currentOccupancy >= maxOccupants) {
      res.status(400);
      throw new Error(`Room ${room_number} in ${dorm.toUpperCase()} is full`);
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user;
    if (isAdmin) {
      user = await AdminUser.create({
        email: email,
        password: hashedPassword,
        user_id: user_id,
        first_name: first_name,
        last_name: last_name,
      });
    } else {
      user = await StudentUser.create({
        email: email,
        password: hashedPassword,
        user_id: user_id,
        first_name: first_name,
        last_name: last_name,
        room_number: room_number,
        dorm: dorm.toUpperCase(),
        room_type: room_type,
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
